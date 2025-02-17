import { InjectionToken } from "@angular/core";
import { LoggerService } from "../services/logger.service";

export const LOGGER_SERVICE_TOKEN = new InjectionToken<LoggerService>(
  "LOGGER_SERVICE_TOKEN"
);
