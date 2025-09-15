import { env } from '@shared/config/env';

export const Log = {
  DEBUG: 0,
  INFO: 1,
  WARN: 2,
  ERROR: 3,
  FATAL: 4,
  OFF: 5,
} as const;

export type LogLevel = (typeof Log)[keyof typeof Log];

export interface LogEntry {
  timestamp: string;
  level: LogLevel;
  message: string;
  context?: Record<string, unknown>;
  error?: Error;
  correlationId?: string;
  component?: string;
  operation?: string;
}

export interface LoggerConfig {
  level: LogLevel;
  environment: typeof env.NODE_ENV;
  enableConsole: boolean;
  enableFile?: boolean;
  enableStructured?: boolean;
  dateFormat?: string;
  correlationIdGenerator?: () => string;
}

/**
 * Interfaces de soporte
 */
export interface LoggerStats {
  totalLogs: number;
  byLevel: Record<LogLevel, number>;
}
