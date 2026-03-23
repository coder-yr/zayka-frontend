"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { featureService } from "@/lib/api";

const FeatureContext = createContext();

export function FeatureProvider({ children }) {
  const [features, setFeatures] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const fetchAllFeatures = async () => {
      try {
        setIsLoading(true);
        // Fetch all active features at once. Sorting by whatever, we'll sort per component.
        const response = await featureService.getFeatures({ isActive: true });
        if (response.success && response.data && isMounted) {
          setFeatures(response.data);
        }
      } catch (err) {
        if (isMounted) setError(err);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    fetchAllFeatures();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <FeatureContext.Provider value={{ features, isLoading, error }}>
      {children}
    </FeatureContext.Provider>
  );
}

export function useFeatures() {
  const context = useContext(FeatureContext);
  if (!context) {
    throw new Error("useFeatures must be used within a FeatureProvider");
  }
  return context;
}
