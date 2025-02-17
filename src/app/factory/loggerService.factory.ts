import { LoggerService } from "../services/logger.service";

export const loggerServiceFactory = () => {
  return new LoggerService();
};
