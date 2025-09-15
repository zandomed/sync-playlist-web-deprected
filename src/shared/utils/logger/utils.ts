/**
 * Utilidades de logging
 */
export class LoggerUtils {
  /**
   * Genera correlation ID único
   */
  static generateCorrelationId(): string {
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }

  /**
   * Sanitiza datos sensibles para logging
   */
  static sanitizeContext(
    context: Record<string, unknown>,
  ): Record<string, unknown> {
    const sensitiveKeys = [
      'password',
      'token',
      'apiKey',
      'secret',
      'auth',
      'authorization',
      'credential',
      'key',
    ];

    const sanitized: Record<string, unknown> = {};

    for (const [key, value] of Object.entries(context)) {
      const lowerKey = key.toLowerCase();
      const isSensitive = sensitiveKeys.some((sensitive) =>
        lowerKey.includes(sensitive),
      );

      if (isSensitive) {
        sanitized[key] = '[REDACTED]';
      } else if (typeof value === 'object' && value !== null) {
        sanitized[key] = this.sanitizeContext(value as Record<string, unknown>);
      } else {
        sanitized[key] = value;
      }
    }

    return sanitized;
  }

  /**
   * Formatea duración en formato legible
   */
  static formatDuration(startTime: number): string {
    const duration = Date.now() - startTime;

    if (duration < 1000) {
      return `${duration}ms`;
    } else if (duration < 60000) {
      return `${(duration / 1000).toFixed(2)}s`;
    } else {
      return `${(duration / 60000).toFixed(2)}m`;
    }
  }

  /**
   * Crea un contexto de operación con timing
   */
  static createOperationContext(
    operation: string,
    startTime?: number,
  ): Record<string, unknown> {
    const context: Record<string, unknown> = { operation };

    if (startTime) {
      context.duration = this.formatDuration(startTime);
    }

    return context;
  }

  /**
   * Trunca strings largos para logging
   */
  static truncateString(str: string, maxLength: number = 1000): string {
    if (str.length <= maxLength) {
      return str;
    }

    return `${str.substring(0, maxLength)}... [truncated ${str.length - maxLength} chars]`;
  }
}
