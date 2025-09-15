import { Logger } from './logger';
import { LoggerUtils } from './utils';

/**
 * Decorator para logging automático de métodos
 */
export function LogOperation(operationName?: string) {
  return function (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor,
  ) {
    const originalMethod = descriptor.value;
    const operation =
      operationName || `${target.constructor.name}.${propertyKey}`;

    descriptor.value = async function (...args: unknown[]) {
      const logger = Logger.getInstance().forComponent(target.constructor.name);
      const correlationId = LoggerUtils.generateCorrelationId();
      const startTime = Date.now();

      const operationLogger = logger.withCorrelationId(correlationId);

      operationLogger.debug(`Starting operation: ${operation}`, {
        operation,
        args: LoggerUtils.sanitizeContext({ args }),
      });

      try {
        const result = await originalMethod.apply(this, args);

        operationLogger.info(`Operation completed: ${operation}`, {
          operation,
          duration: LoggerUtils.formatDuration(startTime),
          success: true,
        });

        return result;
      } catch (error) {
        operationLogger.error(
          `Operation failed: ${operation}`,
          error as Error,
          {
            operation,
            duration: LoggerUtils.formatDuration(startTime),
            success: false,
          },
        );

        throw error;
      }
    };

    return descriptor;
  };
}
