import React, { createContext, useState, useEffect } from "react";

export const GraphContext = createContext();

export const GraphProvider = ({ children }) => {
  const [chartOptions, setChartOptions] = useState({
    labels: [],
  });

  useEffect(() => {
    const CACHE_NAME = 'my-cache';
    const cacheUrl = '/chart-options';

    // Almacenar datos en caché cuando se actualiza el estado del contexto
    caches.open(CACHE_NAME).then(cache => {
      const response = new Response(JSON.stringify(chartOptions), { headers: { 'Content-Type': 'application/json' } });
      cache.put(cacheUrl, response);
    });
  }, [chartOptions]);

  useEffect(() => {
    const CACHE_NAME = 'my-cache';
    const cacheUrl = '/chart-options';

    // Recuperar datos de la caché al cargar la página
    caches.open(CACHE_NAME).then(cache => {
      cache.match(cacheUrl).then(response => {
        if (response) {
          response.json().then(chartOptions => {
            setChartOptions(chartOptions);
          });
        }
      });
    });
  }, []);

  return (
    <GraphContext.Provider value={{ chartOptions, setChartOptions }}>
      {children}
    </GraphContext.Provider>
  );
};
