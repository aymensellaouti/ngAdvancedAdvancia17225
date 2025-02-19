import { Component, inject } from "@angular/core";
import { FormBuilder, AbstractControl } from "@angular/forms";
import {
  debounceTime,
  distinctUntilChanged,
  Observable,
  switchMap,
  tap,
} from "rxjs";
import { CvService } from "../services/cv.service";
import { Cv } from "../model/cv";

@Component({
  selector: "app-autocomplete",
  templateUrl: "./autocomplete.component.html",
  styleUrls: ["./autocomplete.component.css"],
})
export class AutocompleteComponent {
  formBuilder = inject(FormBuilder);
  cvService = inject(CvService);
  get search(): AbstractControl {
    return this.form.get("search")!;
  }
  form = this.formBuilder.group({ search: [""] });
  cvs$: Observable<Cv[]> = this.search.valueChanges.pipe();
}
