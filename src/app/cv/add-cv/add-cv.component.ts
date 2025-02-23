import { Component, inject, OnDestroy } from "@angular/core";
import {
  FormBuilder,
  Validators,
  AbstractControl,
  FormGroup,
} from "@angular/forms";
import { CvService } from "../services/cv.service";
import { Cv } from "../model/cv";
import { ToastrService } from "ngx-toastr";
import { Router } from "@angular/router";
import { APP_CONSTANTES } from "../../config/app_const.config";
import { APP_ROUTES } from "../../config/app-routes.config";
import { uniqueCinValidator } from "../validators/unique-cin.validator";
import { ageCinValidator } from "../validators/age-cin.validator";

@Component({
  selector: "app-add-cv",
  templateUrl: "./add-cv.component.html",
  styleUrls: ["./add-cv.component.css"],
})
export class AddCvComponent implements OnDestroy {
  formBuilder = inject(FormBuilder);
  cvService = inject(CvService);
  toastr = inject(ToastrService);
  router = inject(Router);

  form: FormGroup = this.formBuilder.group(
    {
      name: ["", [Validators.required], []],
      firstname: ["", Validators.required],
      path: [""],
      job: ["", Validators.required],
      cin: [
        "",
        {
          validators: [Validators.required, Validators.pattern("[0-9]{8}")],
          asyncValidators: [uniqueCinValidator(this.cvService)],
        },
      ],
      age: [
        0,
        {
          validators: [Validators.required],
          updateOn: "blur",
        },
      ],
    },
    {
      validators: [ageCinValidator],
      asyncValidators: [],
      updateOn: "blur",
    }
  );
  constructor() {
    this.age.valueChanges.subscribe({
      next: (age) => {
        age < 18 ? this.path?.disable() : this.path?.enable();
      },
    });
    const savedForm = localStorage.getItem(APP_CONSTANTES.addCvForm);
    if (savedForm) {
      this.form.patchValue(JSON.parse(savedForm));
    }
  }
  ngOnDestroy(): void {
    if (this.form.valid) {
      localStorage.setItem(
        APP_CONSTANTES.addCvForm,
        JSON.stringify(this.form.value)
      );
    }
  }

  addCv() {
    if (!this.path?.value) {
      this.form.value["path"] = "";
    }
    this.cvService.addCv(this.form.value as Cv).subscribe({
      next: (cv) => {
        this.toastr.success(
          `${cv.firstname} ${cv.name} was added successfully`
        );
        localStorage.removeItem(APP_CONSTANTES.addCvForm);
        this.form.reset();
        this.router.navigate([APP_ROUTES.cv]);
      },
      error: (err) => {
        this.toastr.error(
          `Un problème au niveau du serveur merci de contacter l'admin`
        );
      },
    });
  }

  get name(): AbstractControl {
    return this.form.get("name")!;
  }
  get firstname() {
    return this.form.get("firstname");
  }
  get age(): AbstractControl {
    return this.form.get("age")!;
  }
  get job() {
    return this.form.get("job");
  }
  get path() {
    return this.form.get("path");
  }
  get cin(): AbstractControl {
    return this.form.get("cin")!;
  }
}
