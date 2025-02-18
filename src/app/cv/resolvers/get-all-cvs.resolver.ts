import { ResolveFn } from "@angular/router";
import { Cv } from "../model/cv";
import { inject } from "@angular/core";
import { CvService } from "../services/cv.service";

export const getAllCvsResolver: ResolveFn<Cv[]> = (route, state) => {
  const cvService = inject(CvService);
  return cvService.getCvs();
};
