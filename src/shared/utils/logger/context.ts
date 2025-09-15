import { Logger } from './logger';

/**
 * Logger con contexto inmutable
 */
export class ContextLogger {
  constructor(
    private logger: Logger,
    private context: Record<string, unknown> = {},
    private correlationId?: string,
  ) {}

  debug(message: string, additionalContext?: Record<string, unknown>): void {
    this.logger.debug(message, this.mergeContext(additionalContext));
  }

  info(message: string, additionalContext?: Record<string, unknown>): void {
    this.logger.info(message, this.mergeContext(additionalContext));
  }

  warn(message: string, additionalContext?: Record<string, unknown>): void {
    this.logger.warn(message, this.mergeContext(additionalContext));
  }

  error(
    message: string,
    error?: Error,
    additionalContext?: Record<string, unknown>,
  ): void {
    this.logger.error(message, error, this.mergeContext(additionalContext));
  }

  fatal(
    message: string,
    error?: Error,
    additionalContext?: Record<string, unknown>,
  ): void {
    this.logger.fatal(message, error, this.mergeContext(additionalContext));
  }

  /**
   * Crea un nuevo logger con contexto adicional
   */
  withContext(additionalContext: Record<string, unknown>): ContextLogger {
    return new ContextLogger(
      this.logger,
      this.mergeContext(additionalContext),
      this.correlationId,
    );
  }

  /**
   * Crea un nuevo logger con correlation ID
   */
  withCorrelationId(correlationId: string): ContextLogger {
    return new ContextLogger(this.logger, this.context, correlationId);
  }

  /**
   * Merge contextos de forma inmutable
   */
  private mergeContext(
    additionalContext?: Record<string, unknown>,
  ): Record<string, unknown> {
    if (!additionalContext) {
      return this.context;
    }

    return {
      ...this.context,
      ...additionalContext,
      ...(this.correlationId && { correlationId: this.correlationId }),
    };
  }
}
