import { Application } from "express";
import prometheusMiddleware from "express-prometheus-middleware";
import BasicAuthHandler from "./BasicAuthHandler";
import PrometheusHandler from "./PrometheusHandler";

export default function setupMetrics(app: Application): void {
  // Basic authentication for metrics
  app.use('/metrics', BasicAuthHandler);

  // Use express-prometheus-middleware
  app.use(
    prometheusMiddleware({
      metricsPath: "/metrics",
      collectDefaultMetrics: true,
      requestDurationBuckets: [0.1, 0.5, 1, 1.5, 2],
      includePath: true,
      includeMethod: true,
    })
  );

  // Use prop-client
  app.use(PrometheusHandler.middleware);
}