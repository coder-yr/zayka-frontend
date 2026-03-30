"use client";

import React, { useEffect, useMemo, useState } from "react";
import { Check, X } from "lucide-react";
import { pricingService } from "@/lib/api";

const DEFAULT_PRICING_CONTENT = {
  countryFallbackName: "India",
  defaultCurrency: "INR",
  baseCurrency: "USD",
  fxRates: {
    USD: 1,
    INR: 83,
    EUR: 0.92,
    JPY: 150,
  },
  isYearlyDefault: true,
  yearlySavingsText: "Save 20%",
  headerBadgeText: "PRICING PLANS",
  headingPrefix: "Simple, transparent",
  headingHighlightTemplate: "pricing for {country}.",
  subtitle:
    "Choose the perfect plan for your retail business. From rapid startups to global enterprise operations.",
  trustBadges: ["No credit card required", "Cancel anytime"],
  currencies: [
    { code: "INR", label: "India (INR)", symbol: "₹" },
    { code: "USD", label: "United States (USD)", symbol: "$" },
    { code: "EUR", label: "Europe (EUR)", symbol: "€" },
  ],
  countryCurrencyMap: {
    IN: "INR",
    US: "USD",
    CA: "USD",
    AU: "USD",
    GB: "EUR",
    FR: "EUR",
    DE: "EUR",
    ES: "EUR",
    IT: "EUR",
    NL: "EUR",
  },
  plans: [],
  comparisonSections: [],
};

const normalizeCurrencyCode = (code) => {
  const normalized = String(code || "").trim().toUpperCase();
  const aliasMap = {
    JP: "JPY",
    IN: "INR",
    US: "USD",
    GB: "GBP",
    UK: "GBP",
    EU: "EUR",
    AU: "AUD",
    CA: "CAD",
    SG: "SGD",
    AE: "AED",
  };
  return aliasMap[normalized] || normalized;
};

const normalizeContent = (data) => {
  if (!data) return DEFAULT_PRICING_CONTENT;

  const normalizeArrayLike = (value) => {
    if (Array.isArray(value)) return value;
    if (!value || typeof value !== "object") return [];
    return Object.keys(value)
      .sort((a, b) => Number(a) - Number(b))
      .map((key) => value[key]);
  };

  const normalizeStringList = (value, fallback = []) => {
    if (Array.isArray(value)) {
      return value.map((item) => String(item)).filter(Boolean);
    }
    if (typeof value === "string") {
      return value
        .split("\n")
        .map((item) => item.trim())
        .filter(Boolean);
    }
    const arrayLike = normalizeArrayLike(value);
    return arrayLike.length > 0 ? arrayLike.map((item) => String(item)).filter(Boolean) : fallback;
  };

  const normalizedPlans = normalizeArrayLike(data.plans).map((plan) => ({
    ...plan,
    features: normalizeStringList(plan?.features, []),
  }));

  const normalizedComparisonSections = normalizeArrayLike(data.comparisonSections).map((section) => ({
    ...section,
    items: normalizeArrayLike(section?.items),
  }));

  return {
    ...DEFAULT_PRICING_CONTENT,
    ...data,
    trustBadges: normalizeStringList(data.trustBadges, DEFAULT_PRICING_CONTENT.trustBadges),
    currencies: Array.isArray(data.currencies) && data.currencies.length > 0
      ? data.currencies
          .map((item) => ({
            ...item,
            code: normalizeCurrencyCode(item?.code),
          }))
          .filter((item) => item.code)
      : DEFAULT_PRICING_CONTENT.currencies,
    countryCurrencyMap: data.countryCurrencyMap && typeof data.countryCurrencyMap === "object"
      ? Object.entries(data.countryCurrencyMap).reduce((acc, [countryCode, currencyCode]) => {
          const normalizedCountry = String(countryCode || "").trim().toUpperCase();
          const normalizedCurrency = normalizeCurrencyCode(currencyCode);
          if (normalizedCountry && normalizedCurrency) acc[normalizedCountry] = normalizedCurrency;
          return acc;
        }, {})
      : DEFAULT_PRICING_CONTENT.countryCurrencyMap,
    defaultCurrency: typeof data.defaultCurrency === "string" && data.defaultCurrency.trim() !== ""
      ? normalizeCurrencyCode(data.defaultCurrency)
      : DEFAULT_PRICING_CONTENT.defaultCurrency,
    baseCurrency: typeof data.baseCurrency === "string" && data.baseCurrency.trim() !== ""
      ? normalizeCurrencyCode(data.baseCurrency)
      : DEFAULT_PRICING_CONTENT.baseCurrency,
    fxRates: data.fxRates && typeof data.fxRates === "object"
      ? Object.entries(data.fxRates).reduce((acc, [currencyCode, rate]) => {
          const normalizedCode = normalizeCurrencyCode(currencyCode);
          const parsed = Number(rate);
          if (normalizedCode && Number.isFinite(parsed) && parsed > 0) {
            acc[normalizedCode] = parsed;
          }
          return acc;
        }, {})
      : DEFAULT_PRICING_CONTENT.fxRates,
    plans: normalizedPlans,
    comparisonSections: normalizedComparisonSections,
  };
};

const localeRegionFallback = () => {
  if (typeof navigator === "undefined") return "";
  const locale = Array.isArray(navigator.languages) && navigator.languages.length > 0
    ? navigator.languages[0]
    : navigator.language || "";
  const parts = locale.split("-");
  return parts.length > 1 ? parts[1].toUpperCase() : "";
};

const resolveAutoCurrency = ({ geoData, supportedCurrencies, countryCurrencyMap, defaultCurrency }) => {
  const countryCode = (geoData?.country_code || geoData?.country || localeRegionFallback() || "").toUpperCase();
  const currencyFromMap = countryCode ? normalizeCurrencyCode(countryCurrencyMap[countryCode]) : "";
  if (currencyFromMap && supportedCurrencies.has(currencyFromMap)) {
    return currencyFromMap;
  }

  const detectedCurrency = normalizeCurrencyCode(geoData?.currency || "");
  if (detectedCurrency && supportedCurrencies.has(detectedCurrency)) {
    return detectedCurrency;
  }

  const normalizedDefault = normalizeCurrencyCode(defaultCurrency);
  if (supportedCurrencies.has(normalizedDefault)) {
    return normalizedDefault;
  }

  const [firstSupported] = Array.from(supportedCurrencies);
  return firstSupported || defaultCurrency || "INR";
};

const getCurrencySymbol = (currencies, code) => {
  const normalizedCode = normalizeCurrencyCode(code);
  const selected = currencies.find((item) => normalizeCurrencyCode(item.code) === normalizedCode);
  return selected?.symbol || "";
};

const formatPrice = (value) => {
  if (typeof value === "number") return value;
  if (typeof value === "string" && value.trim() !== "") return value;
  return null;
};

const formatConvertedAmount = (amount, currencyCode) => {
  if (!Number.isFinite(amount)) return null;
  const noDecimalCurrencies = new Set(["JPY", "KRW", "VND", "IDR"]);
  if (noDecimalCurrencies.has((currencyCode || "").toUpperCase())) {
    return Math.round(amount);
  }
  return Number(amount.toFixed(2));
};

const resolveFxCurrencyCode = (currencyCode, fxRates) => {
  const code = normalizeCurrencyCode(currencyCode);
  if (!code) return "";
  if (fxRates[code]) return code;

  // Common admin input aliases where country-like codes are entered as currency codes.
  const aliasMap = {
    JP: "JPY",
    IN: "INR",
    US: "USD",
    GB: "GBP",
    UK: "GBP",
    EU: "EUR",
    AU: "AUD",
    CA: "CAD",
    SG: "SGD",
    AE: "AED",
  };

  const aliased = aliasMap[code];
  if (aliased && fxRates[aliased]) return aliased;
  return "";
};

export default function PricingPage() {
  const [isYearly, setIsYearly] = useState(true);
  const [currency, setCurrency] = useState("INR");
  const [countryName, setCountryName] = useState("India");
  const [pricingContent, setPricingContent] = useState(DEFAULT_PRICING_CONTENT);

  useEffect(() => {
    const fetchPricingContent = async () => {
      try {
        const response = await pricingService.getPricingContent();
        const normalized = normalizeContent(response?.data);

        setPricingContent(normalized);
        setCurrency(normalized.defaultCurrency || "INR");
        setIsYearly(Boolean(normalized.isYearlyDefault));
        setCountryName(normalized.countryFallbackName || "India");
      } catch (error) {
        console.error("Failed to fetch pricing content", error);
      }
    };

    fetchPricingContent();
  }, []);

  useEffect(() => {
    const fetchGeoData = async () => {
      const supportedCurrencies = new Set(pricingContent.currencies.map((item) => item.code));

      try {
        const data = await pricingService.getGeoData();
        const autoCurrency = resolveAutoCurrency({
          geoData: data || {},
          supportedCurrencies,
          countryCurrencyMap: pricingContent.countryCurrencyMap || {},
          defaultCurrency: pricingContent.defaultCurrency || "INR",
        });

        setCurrency(autoCurrency);

        if (data?.country_name) {
          setCountryName(data.country_name);
        }
      } catch (error) {
        const fallbackCurrency = resolveAutoCurrency({
          geoData: {},
          supportedCurrencies,
          countryCurrencyMap: pricingContent.countryCurrencyMap || {},
          defaultCurrency: pricingContent.defaultCurrency || "INR",
        });

        setCurrency(fallbackCurrency);
      }
    };

    fetchGeoData();
  }, [pricingContent.currencies, pricingContent.countryCurrencyMap, pricingContent.defaultCurrency]);

  const plans = useMemo(() => {
    return [...pricingContent.plans]
      .filter((plan) => plan?.isActive !== false)
      .sort((a, b) => (a.displayOrder || 0) - (b.displayOrder || 0));
  }, [pricingContent.plans]);

  const comparisonSections = useMemo(() => {
    return [...pricingContent.comparisonSections]
      .filter((section) => section?.isActive !== false)
      .sort((a, b) => (a.displayOrder || 0) - (b.displayOrder || 0))
      .map((section) => ({
        ...section,
        items: Array.isArray(section.items)
          ? [...section.items].sort((a, b) => (a.displayOrder || 0) - (b.displayOrder || 0))
          : [],
      }));
  }, [pricingContent.comparisonSections]);

  const headingHighlight = (pricingContent.headingHighlightTemplate || "pricing for {country}.").replace(
    "{country}",
    countryName
  );

  const getPlanPrice = (plan) => {
    if (plan.isCustomPricing) {
      return { isCustom: true, value: plan.customPriceLabel || "Custom", currencyCode: null };
    }

    const baseRawValue = isYearly ? Number(plan.baseYearly) : Number(plan.baseMonthly);
    if (Number.isFinite(baseRawValue)) {
      const baseCurrency = normalizeCurrencyCode(pricingContent.baseCurrency || "USD");
      const selectedCurrency = normalizeCurrencyCode(currency || pricingContent.defaultCurrency || baseCurrency);
      const fxRates = pricingContent.fxRates || {};

      const resolvedSelectedCode = resolveFxCurrencyCode(selectedCurrency, fxRates);
      const resolvedDefaultCode = resolveFxCurrencyCode(pricingContent.defaultCurrency, fxRates);
      const selectedRate = Number(fxRates[resolvedSelectedCode]);
      const defaultRate = Number(fxRates[resolvedDefaultCode]);

      let effectiveRate = 1;
      let displayCurrencyCode = selectedCurrency;

      if (Number.isFinite(selectedRate) && selectedRate > 0) {
        effectiveRate = selectedRate;
        displayCurrencyCode = resolvedSelectedCode || selectedCurrency;
      } else if (selectedCurrency === baseCurrency) {
        effectiveRate = 1;
        displayCurrencyCode = baseCurrency;
      } else if (Number.isFinite(defaultRate) && defaultRate > 0) {
        effectiveRate = defaultRate;
        displayCurrencyCode = resolvedDefaultCode || pricingContent.defaultCurrency || baseCurrency;
      } else {
        effectiveRate = 1;
        displayCurrencyCode = baseCurrency;
      }

      const convertedValue = formatConvertedAmount(baseRawValue * effectiveRate, displayCurrencyCode);
      if (convertedValue !== null) {
        return { isCustom: false, value: convertedValue, currencyCode: displayCurrencyCode };
      }
    }

    const prices = plan.prices || {};
    const selectedCurrencyPricing =
      prices[currency] || prices[pricingContent.defaultCurrency] || Object.values(prices)[0];

    if (!selectedCurrencyPricing) {
      return { isCustom: true, value: plan.customPriceLabel || "Custom", currencyCode: null };
    }

    const rawValue = isYearly ? selectedCurrencyPricing.yearly : selectedCurrencyPricing.monthly;
    const value = formatPrice(rawValue);

    if (value === null) {
      return { isCustom: true, value: plan.customPriceLabel || "Custom", currencyCode: null };
    }

    return { isCustom: false, value, currencyCode: currency };
  };

  return (
    <div className="min-h-screen bg-[#FAF9F6] dark:bg-black font-sans selection:bg-[#E80F88] selection:text-white pt-24 pb-32">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-block px-4 py-1.5 bg-pink-100 dark:bg-[#E80F88]/10 text-[#E80F88] text-xs font-black tracking-widest uppercase rounded-full mb-6">
            {pricingContent.headerBadgeText}
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 dark:text-white leading-tight mb-6 tracking-tight">
            {pricingContent.headingPrefix} <br />
            <span className="text-[#E80F88]">{headingHighlight}</span>
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 max-w-xl mx-auto">{pricingContent.subtitle}</p>

          <div className="flex items-center justify-center gap-4 mb-6">
            <span className={`text-sm font-semibold ${!isYearly ? "text-gray-900 dark:text-white" : "text-gray-500"}`}>
              Monthly
            </span>
            <button
              onClick={() => setIsYearly(!isYearly)}
              className="relative inline-flex h-7 w-14 items-center rounded-full bg-gray-200 dark:bg-gray-800 transition-colors focus:outline-none"
            >
              <span
                className={`inline-block h-5 w-5 transform rounded-full bg-white dark:bg-gray-400 shadow transition-transform ${
                  isYearly ? "translate-x-8" : "translate-x-1"
                }`}
              />
            </button>
            <div className="flex items-center gap-2">
              <span className={`text-sm font-semibold ${isYearly ? "text-gray-900 dark:text-white" : "text-gray-500"}`}>
                Yearly
              </span>
              <span className="text-[10px] font-bold bg-pink-100 text-[#E80F88] px-2 py-0.5 rounded-full uppercase tracking-wider">
                {pricingContent.yearlySavingsText}
              </span>
            </div>
          </div>

          <div className="flex items-center justify-center mb-6">
            <select
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              className="bg-white dark:bg-[#111827] border border-gray-200 dark:border-gray-800 text-gray-900 dark:text-white text-sm rounded-lg focus:ring-[#E80F88] focus:border-[#E80F88] px-3 py-2 cursor-pointer font-medium shadow-sm transition-all outline-none"
            >
              {pricingContent.currencies.map((currencyItem) => (
                <option key={currencyItem.code} value={currencyItem.code}>
                  {currencyItem.label}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center justify-center gap-6 text-sm text-gray-500 dark:text-gray-400 font-medium">
            {pricingContent.trustBadges.map((badge) => (
              <div key={badge} className="flex items-center gap-2">
                <Check size={14} className="text-[#E80F88]" /> {badge}
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-32">
          {plans.map((plan) => {
            const pricing = getPlanPrice(plan);
            const symbol = getCurrencySymbol(pricingContent.currencies, pricing.currencyCode || currency);

            return (
              <div
                key={plan.name}
                className={`relative bg-white dark:bg-[#111827] rounded-3xl p-8 flex flex-col shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-none border transition-all duration-300
                  ${
                    plan.popular
                      ? "border-[#E80F88] ring-1 ring-[#E80F88] md:-mt-4 md:mb-4 shadow-[0_20px_40px_-15px_rgba(232,15,136,0.2)]"
                      : "border-gray-200 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700"
                  }
                `}
              >
                {plan.popular && (
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#E80F88] text-white px-4 py-1 text-xs font-bold uppercase tracking-wider rounded-full shadow-lg">
                    Most Popular
                  </div>
                )}

                <div className="mb-6">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{plan.name}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{plan.description}</p>
                </div>

                <div className="mb-8">
                  <div className="flex items-baseline text-gray-900 dark:text-white">
                    <span className="text-4xl md:text-5xl font-black tracking-tight">
                      {pricing.isCustom ? pricing.value : `${symbol}${pricing.value}`}
                    </span>
                    {!pricing.isCustom && <span className="text-sm font-medium text-gray-500 ml-2">/mo</span>}
                  </div>
                </div>

                <ul className="flex-1 space-y-4 mb-8">
                  {(plan.features || []).map((feature) => (
                    <li key={feature} className="flex items-start text-sm font-medium text-gray-700 dark:text-gray-300">
                      <Check size={18} className="text-[#E80F88] mr-3 shrink-0" strokeWidth={3} />
                      {feature}
                    </li>
                  ))}
                </ul>

                <button
                  className={`w-full py-3.5 px-4 rounded-xl font-bold text-sm transition-all duration-300
                    ${
                      plan.buttonVariant === "solid"
                        ? "bg-[#E80F88] text-white hover:bg-pink-600 shadow-md hover:shadow-xl hover:-translate-y-1"
                        : "bg-transparent text-gray-900 dark:text-white border-2 border-gray-200 dark:border-gray-800 hover:border-[#E80F88] dark:hover:border-[#E80F88] hover:text-[#E80F88]"
                    }
                  `}
                >
                  {plan.buttonText}
                </button>
              </div>
            );
          })}
        </div>

        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-black text-center text-gray-900 dark:text-white mb-12">Compare every feature</h2>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[600px]">
              <thead>
                <tr>
                  <th className="w-1/3 py-4 pr-4 border-b border-gray-200 dark:border-gray-800 text-xs font-black tracking-wider text-gray-500 uppercase">
                    Feature
                  </th>
                  <th className="w-1/5 py-4 px-4 border-b border-gray-200 dark:border-gray-800 text-xs font-black tracking-wider text-gray-500 text-center uppercase">
                    Basic
                  </th>
                  <th className="w-1/5 py-4 px-4 border-b border-gray-200 dark:border-gray-800 text-xs font-black tracking-wider text-gray-900 dark:text-white text-center uppercase bg-gray-50 dark:bg-gray-800/50 rounded-t-xl">
                    Pro
                  </th>
                  <th className="w-1/5 py-4 px-4 border-b border-gray-200 dark:border-gray-800 text-xs font-black tracking-wider text-gray-500 text-center uppercase">
                    Enterprise
                  </th>
                </tr>
              </thead>
              <tbody>
                {comparisonSections.map((section) => (
                  <React.Fragment key={section.category}>
                    <tr>
                      <td colSpan="4" className="py-6 pt-10 text-xs font-black tracking-widest text-[#E80F88] uppercase">
                        {section.category}
                      </td>
                    </tr>
                    {section.items.map((item) => (
                      <tr
                        key={`${section.category}-${item.name}`}
                        className="group border-b border-gray-100 dark:border-gray-800/50 hover:bg-gray-50 dark:hover:bg-gray-900/50 transition-colors"
                      >
                        <td className="py-4 pr-4 text-sm font-medium text-gray-700 dark:text-gray-300">{item.name}</td>
                        <td className="py-4 px-4 text-sm text-center text-gray-500">
                          {typeof item.basic === "boolean" ? (
                            item.basic ? (
                              <Check size={18} className="mx-auto text-gray-900 dark:text-white" />
                            ) : (
                              <X size={18} className="mx-auto text-gray-300 dark:text-gray-700" />
                            )
                          ) : (
                            item.basic
                          )}
                        </td>
                        <td className="py-4 px-4 text-sm font-bold text-center text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-800/50 group-hover:bg-gray-100 dark:group-hover:bg-gray-800 transition-colors">
                          {typeof item.pro === "boolean" ? (
                            item.pro ? (
                              <Check size={18} className="mx-auto text-[#E80F88] stroke-[3px]" />
                            ) : (
                              <X size={18} className="mx-auto text-gray-300 dark:text-gray-700" />
                            )
                          ) : (
                            item.pro
                          )}
                        </td>
                        <td className="py-4 px-4 text-sm text-center text-gray-500">
                          {typeof item.enterprise === "boolean" ? (
                            item.enterprise ? (
                              <Check size={18} className="mx-auto text-[#e93297] stroke-[3px]" />
                            ) : (
                              <X size={18} className="mx-auto text-gray-300 dark:text-gray-700" />
                            )
                          ) : (
                            item.enterprise
                          )}
                        </td>
                      </tr>
                    ))}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
