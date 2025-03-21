import { NextFunction, Request, Response } from "express";
import * as prometheus from "prom-client"

// Create a gauge metric for in-flight requests
const inFlightRequestsGauge = new prometheus.Gauge({
  name: 'http_requests_in_flight',
  help: 'Number of in-flight HTTP requests',
  labelNames: ['route', 'method'],
});

const middleware = async (req: Request, res: Response, next: NextFunction) => {
  if (req.originalUrl !== '/metrics' && req.originalUrl !== '/' && req.originalUrl !== '/favicon.ico'){
    inFlightRequestsGauge.inc({ route: req.originalUrl, method: req.method }); // Increment gauge on new request
    res.on('finish', () => {
      inFlightRequestsGauge.dec({ route: req.originalUrl, method: req.method }); // Decrement gauge when request completes
    });
  }

  next();
}

export default {
  prometheus,
  middleware
}