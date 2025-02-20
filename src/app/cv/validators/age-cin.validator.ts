import { AbstractControl, ValidationErrors } from "@angular/forms";

export const ageCinValidator = (
  form: AbstractControl
): ValidationErrors | null => {
  const cin = form.get("cin")?.value.substring(0, 2);
  const age = form.get("age")?.value;
  if (!age || !cin) return null;
  if ((age > 60 && cin <= 19) || (age < 60 && cin > 19)) return null;
  return { cinAge: "L'age ne correspond pas à la cin" };
};
