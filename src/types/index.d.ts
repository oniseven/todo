export interface JwtPayload {
  id: string,
  name: string,
  norm: string,
}

export interface ResponseMetadata {
  metadata: {
    status: boolean;
    message: string;
    errCode?: number | string | null;
  },
  response?: string | Record<string, any>;
  info?: string | Record<string, any>;
}

export type SequelizeLogging = false | ((sql: string, timing?: number) => void);