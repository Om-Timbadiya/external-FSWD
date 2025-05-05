const performanceMetrics = (callback) => {
  if (typeof callback === 'function') {
    const loadMetrics = async () => {
      const { getCLS, getFID, getFCP, getLCP, getTTFB } = await import('web-vitals');
      const metrics = [getCLS, getFID, getFCP, getLCP, getTTFB];
      metrics.forEach(metric => metric(callback));
    };
    loadMetrics();
  }
};

export default performanceMetrics; 