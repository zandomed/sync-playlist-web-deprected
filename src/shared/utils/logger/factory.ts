import { Logger } from './logger';
import { Log } from './model';

/**
 * Factory para crear loggers con configuraciones predefinidas
 */
export class LoggerFactory {
  /**
   * Logger para desarrollo
   */
  static createDevelopmentLogger(): Logger {
    return Logger.initialize({
      level: Log.DEBUG,
      environment: 'development',
      enableConsole: true,
      enableStructured: false,
      dateFormat: 'LOCAL',
    });
  }

  /**
   * Logger para producción
   */
  static createProductionLogger(): Logger {
    return Logger.initialize({
      level: Log.INFO,
      environment: 'production',
      enableConsole: true,
      enableStructured: true,
      dateFormat: 'ISO',
    });
  }

  /**
   * Logger para testing
   */
  static createTestLogger(): Logger {
    return Logger.initialize({
      level: Log.ERROR,
      environment: 'test',
      enableConsole: false,
      enableStructured: false,
    });
  }

  /**
   * Logger basado en variables de entorno
   */
  static createFromEnvironment(): Logger {
    // TODO: Is needed fix this
    const environment = 'development';

    switch (environment) {
      // case 'production':
      //   return this.createProductionLogger();
      // case 'test':
      //   return this.createTestLogger();
      default:
        return this.createDevelopmentLogger();
    }
  }
}
