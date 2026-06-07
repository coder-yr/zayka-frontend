import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";
const SESSION_EXPIRED_EVENT = "zayka:session-expired";

export class ApiError extends Error {
  constructor(message, options = {}) {
    super(message);
    this.name = "ApiError";
    this.status = options.status ?? null;
    this.code = options.code ?? null;
    this.data = options.data ?? null;
    this.isNetworkError = Boolean(options.isNetworkError);
    this.isAuthError = Boolean(options.isAuthError);
    this.request = options.request ?? null;
    this.cause = options.cause;
  }
}

const api = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
  timeout: 30000,
});

const refreshApi = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
  timeout: 30000,
});

let isRefreshing = false;
let refreshWaiters = [];

const emitSessionExpired = (detail) => {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent(SESSION_EXPIRED_EVENT, { detail }));
};

const queueRefreshResult = (error, payload = null) => {
  refreshWaiters.forEach(({ resolve, reject }) => {
    if (error) {
      reject(error);
    } else {
      resolve(payload);
    }
  });
  refreshWaiters = [];
};

const isAuthEndpoint = (url = "") =>
  ["/auth/login", "/auth/register", "/auth/refresh", "/auth/logout", "/auth/logout-all", "/auth/session"].some((path) =>
    url.includes(path)
  );

const normalizeError = (error) => {
  if (axios.isAxiosError(error)) {
    const status = error.response?.status ?? null;
    const data = error.response?.data ?? null;
    const message =
      data?.message ||
      data?.error ||
      (status === 401
        ? "Your session expired. Please sign in again."
        : status === 403
          ? "You do not have permission to access this resource."
          : error.message || "Request failed");

    return new ApiError(message, {
      status,
      code: data?.code ?? data?.errorCode ?? null,
      data,
      isNetworkError: !error.response,
      isAuthError: status === 401 || status === 403,
      request: error.config,
      cause: error,
    });
  }

  if (error instanceof ApiError) {
    return error;
  }

  return new ApiError(error?.message || "Unexpected API error", {
    cause: error,
  });
};

const refreshSession = async () => {
  if (isRefreshing) {
    return new Promise((resolve, reject) => {
      refreshWaiters.push({ resolve, reject });
    });
  }

  isRefreshing = true;

  try {
    const response = await refreshApi.post("/auth/refresh");
    const payload = response?.data?.data || response?.data || null;
    queueRefreshResult(null, payload);
    return payload;
  } catch (error) {
    const normalizedError = normalizeError(error);
    queueRefreshResult(normalizedError, null);
    emitSessionExpired(normalizedError);
    throw normalizedError;
  } finally {
    isRefreshing = false;
  }
};

api.interceptors.request.use(
  (config) => {
    config.headers = config.headers || {};
    config.headers["X-Requested-With"] = "XMLHttpRequest";
    return config;
  },
  (error) => Promise.reject(normalizeError(error))
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error?.config;
    const normalizedError = normalizeError(error);

    if (!originalRequest || originalRequest._retry || !normalizedError.isAuthError || isAuthEndpoint(originalRequest.url || "")) {
      return Promise.reject(normalizedError);
    }

    originalRequest._retry = true;

    try {
      await refreshSession();
      return api(originalRequest);
    } catch (refreshError) {
      return Promise.reject(refreshError);
    }
  }
);

export const getApiErrorMessage = (error) => normalizeError(error).message;

export const isSessionExpiredError = (error) => normalizeError(error).isAuthError;

export const handleApiError = (error, fallbackMessage = "An unexpected error occurred") => {
  const normalizedError = normalizeError(error);
  return {
    message: normalizedError.message || fallbackMessage,
    status: normalizedError.status,
    code: normalizedError.code,
    data: normalizedError.data,
    isAuthError: normalizedError.isAuthError,
    isNetworkError: normalizedError.isNetworkError,
    error: normalizedError,
  };
};

export const requestWithSession = async (promiseFactory) => {
  try {
    const response = await promiseFactory(api);
    return response?.data ?? response;
  } catch (error) {
    throw normalizeError(error);
  }
};

export default api;

export const authService = {
  login: async (email, password) => requestWithSession((client) => client.post("/auth/login", { email, password })),
  register: async (userData) => requestWithSession((client) => client.post("/auth/register", userData)),
  getProfile: async () => requestWithSession((client) => client.get("/auth/profile")),
  getSession: async () => requestWithSession((client) => client.get("/auth/session")),
  refresh: async () => requestWithSession((client) => refreshApi.post("/auth/refresh")),
  logout: async () => requestWithSession((client) => client.post("/auth/logout")),
  logoutAll: async () => requestWithSession((client) => client.post("/auth/logout-all")),
  refreshSession,
};

export const productService = {
  getProducts: async () => requestWithSession((client) => client.get("/products")),
  getProductById: async (id) => requestWithSession((client) => client.get(`/products/${id}`)),
};

export const featureService = {
  getFeatures: async (params = {}) => {
    const queryStr = new URLSearchParams(params).toString();
    const endpoint = queryStr ? `/features?${queryStr}` : "/features";
    return requestWithSession((client) => client.get(endpoint));
  },
  getFeatureBySlug: async (slug) => requestWithSession((client) => client.get(`/features/${slug}`)),
};

export const pricingService = {
  getPricingContent: async () => requestWithSession((client) => client.get("/pricing")),
  getGeoData: async () => {
    const params = {};
    if (typeof window !== "undefined") {
      const searchParams = new URLSearchParams(window.location.search);
      const country = searchParams.get("country");
      const currency = searchParams.get("currency");
      if (country) params.country = country;
      if (currency) params.currency = currency;
    }

    try {
      const response = await api.get("/geo", { params });
      return response.data?.data || response.data || null;
    } catch {
      // Continue to public fallbacks.
    }

    try {
      const response = await axios.get("https://ipapi.co/json/");
      return response.data || null;
    } catch {
      // Continue to the next provider.
    }

    try {
      const response = await axios.get("https://ipwho.is/");
      if (response.data && response.data.success !== false) {
        return {
          country_code: response.data.country_code,
          country_name: response.data.country,
          currency: response.data.currency_code,
        };
      }
      return null;
    } catch {
      return null;
    }
  },
};

export const homeContentService = {
  getHomeContent: async () => requestWithSession((client) => client.get("/home-content")),
};
