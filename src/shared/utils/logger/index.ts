import { LoggerFactory } from './factory';

export * from './model';
export const logger = LoggerFactory.createFromEnvironment();
