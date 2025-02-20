import { AsyncValidatorFn, AbstractControl } from "@angular/forms";
import { CvService } from "../services/cv.service";
import { map, of } from "rxjs";

export const uniqueCinValidator = (cvService: CvService): AsyncValidatorFn => {
  return (control: AbstractControl) => {
    return cvService
      .selectByProperty("cin", control.value)
      .pipe(
        map((cvs) => (cvs.length ? { uniqueCin: "Ce Cin existe déjà" } : null))
      );
  };
};
