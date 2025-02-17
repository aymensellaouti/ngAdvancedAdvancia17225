import { Component, inject } from "@angular/core";
import { ToastrService } from "ngx-toastr";
import { Cv } from "../model/cv";
import { CvService } from "../services/cv.service";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "app-master-detail",
  templateUrl: "./master-detail.component.html",
  styleUrls: ["./master-detail.component.css"],
})
export class MasterDetailComponent {
  cvs: Cv[] = [];
  router = inject(Router);
  toastr = inject(ToastrService);
  cvService = inject(CvService);
  acr = inject(ActivatedRoute);
  constructor() {
    this.cvService.getCvs().subscribe({
      next: (cvs) => {
        this.cvs = cvs;
      },
      error: () => {
        this.cvs = this.cvService.getFakeCvs();
        this.toastr.error(`
        Attention!! Les données sont fictives, problème avec le serveur.
        Veuillez contacter l'admin.`);
      },
    });
  }

  getSelectedCv(cv: Cv) {
    this.router.navigate([cv.id], { relativeTo: this.acr });
  }
}
