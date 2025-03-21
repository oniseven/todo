declare module 'express-prometheus-middleware' {
  import { Request, Response, NextFunction } from 'express';

  interface Options {
      metricsPath?: string;
      collectDefaultMetrics?: boolean;
      requestDurationBuckets?: number[];
      customLabels?: Record<string, string>;
      includePath?: boolean;
      includeMethod?: boolean;
      includeStatusCode?: boolean;
      requestSizeBuckets?: number[];
      responseSizeBuckets?: number[];
      normalizePath?: (req: Request) => string;
  }

  function prometheusMiddleware(options?: Options): (req: Request, res: Response, next: NextFunction) => void;

  export = prometheusMiddleware;
}