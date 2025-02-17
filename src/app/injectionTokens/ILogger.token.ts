import { InjectionToken } from "@angular/core";
import { Observable } from "rxjs";
import { Cv } from "../cv/model/cv";

export interface ILoggerServices {
  logger(message: any): void;
}

export const ILoggerToken = new InjectionToken<ILoggerServices[]>(
  "ILoggerToken"
);
