import { InjectionToken } from "@angular/core";
import { Observable } from "rxjs";
import { Cv } from "../cv/model/cv";

export interface ICvServices {
  getCvs(): Observable<Cv[]>;
}

export const ICvService = new InjectionToken<ICvServices>("ICvService");
