import { env } from '@shared/config/env';

import { ContextLogger } from './context';
import { Log, LogEntry, LoggerConfig, LogLevel } from './model';

/**
 * Logger puro sin dependencias externas
 * Principios respetados:
 * - Sin dependencias de frameworks
 * - Inmutable una vez configurado
 * - Funciones puras para formateo
 * - Singleton pattern para configuración global
 */
export class Logger {
  private static instance: Logger;
  private config: LoggerConfig;
  private correlationId?: string;

  private constructor(config: LoggerConfig) {
    this.config = { ...config };
  }

  /**
   * Inicializa el logger global con configuración
   */
  static initialize(config: LoggerConfig): Logger {
    Logger.instance = new Logger(config);
    return Logger.instance;
  }

  /**
   * Obtiene la instancia del logger
   */
  static getInstance(): Logger {
    if (!Logger.instance) {
      // Configuración por defecto si no se ha inicializado
      Logger.instance = new Logger({
        level: env.NODE_ENV === 'production' ? Log.INFO : Log.DEBUG,
        environment: env.NODE_ENV || 'development',
        enableConsole: true,
        enableStructured: env.NODE_ENV === 'production',
        dateFormat: 'ISO',
      });
    }
    return Logger.instance;
  }

  /**
   * Crea un logger con contexto específico (inmutable)
   */
  withContext(context: Record<string, unknown>): ContextLogger {
    return new ContextLogger(this, context);
  }

  /**
   * Crea un logger con correlation ID
   */
  withCorrelationId(correlationId: string): ContextLogger {
    return new ContextLogger(this, {}, correlationId);
  }

  /**
   * Crea un logger para un componente específico
   */
  forComponent(component: string): ContextLogger {
    return new ContextLogger(this, { component });
  }

  /**
   * Logging methods
   */
  debug(message: string, context?: Record<string, unknown>): void {
    this.log(Log.DEBUG, message, context);
  }

  info(message: string, context?: Record<string, unknown>): void {
    this.log(Log.INFO, message, context);
  }

  warn(message: string, context?: Record<string, unknown>): void {
    this.log(Log.WARN, message, context);
  }

  error(
    message: string,
    error?: Error,
    context?: Record<string, unknown>,
  ): void {
    this.log(Log.ERROR, message, context, error);
  }

  fatal(
    message: string,
    error?: Error,
    context?: Record<string, unknown>,
  ): void {
    this.log(Log.FATAL, message, context, error);
  }

  /**
   * Método principal de logging
   */
  private log(
    level: LogLevel,
    message: string,
    context?: Record<string, unknown>,
    error?: Error,
  ): void {
    if (!this.shouldLog(level)) {
      return;
    }

    const logEntry: LogEntry = {
      timestamp: this.formatTimestamp(),
      level,
      message,
      context,
      error,
      correlationId: this.correlationId,
    };

    this.write(logEntry);
  }

  /**
   * Determina si debe loggear basado en el nivel
   */
  private shouldLog(level: LogLevel): boolean {
    return level >= this.config.level;
  }

  /**
   * Formatea timestamp según configuración
   */
  private formatTimestamp(): string {
    const now = new Date();

    switch (this.config.dateFormat) {
      case 'ISO':
        return now.toISOString();
      case 'UTC':
        return now.toUTCString();
      case 'LOCAL':
        return now.toLocaleString();
      default:
        return now.toISOString();
    }
  }

  /**
   * Escribe el log entry usando los writers configurados
   */
  private write(entry: LogEntry): void {
    if (this.config.enableConsole) {
      this.writeToConsole(entry);
    }

    // Aquí se pueden agregar otros writers (file, external service)
    // sin violar arquitectura limpia - serían adapters en infrastructure
  }

  /**
   * Writer para console
   */
  private writeToConsole(entry: LogEntry): void {
    const formattedMessage = this.config.enableStructured
      ? this.formatStructured(entry)
      : this.formatHuman(entry);

    switch (entry.level) {
      case Log.DEBUG:
        console.debug(formattedMessage);
        break;
      case Log.INFO:
        console.info(formattedMessage);
        break;
      case Log.WARN:
        console.warn(formattedMessage);
        break;
      case Log.ERROR:
      case Log.FATAL:
        console.error(formattedMessage);
        if (entry.error) {
          console.error(entry.error.stack);
        }
        break;
    }
  }

  private reverseLogLevel(level: LogLevel): string {
    return (
      Object.keys(Log).find((key) => Log[key as keyof typeof Log] === level) ||
      'UNKNOWN'
    );
  }

  /**
   * Formato estructurado (JSON) para producción
   */
  private formatStructured(entry: LogEntry): string {
    const structured = {
      timestamp: entry.timestamp,
      level: this.reverseLogLevel(entry.level),
      message: entry.message,
      correlationId: entry.correlationId,
      context: entry.context,
      error: entry.error
        ? {
            name: entry.error.name,
            message: entry.error.message,
            stack: entry.error.stack,
          }
        : undefined,
    };

    return JSON.stringify(structured);
  }

  /**
   * Formato legible para desarrollo
   */
  private formatHuman(entry: LogEntry): string {
    const levelName = this.reverseLogLevel(entry.level).padEnd(5);
    const timestamp = entry.timestamp;
    const correlationPart = entry.correlationId
      ? ` [${entry.correlationId}]`
      : '';
    const contextPart = entry.context
      ? ` ${JSON.stringify(entry.context)}`
      : '';

    return `${timestamp} ${levelName}${correlationPart}: ${entry.message}${contextPart}`;
  }

  /**
   * Obtiene configuración actual (readonly)
   */
  getConfig(): Readonly<LoggerConfig> {
    return { ...this.config };
  }
}
