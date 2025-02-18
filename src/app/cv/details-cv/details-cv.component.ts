import { Component, OnInit, inject } from "@angular/core";
import { Cv } from "../model/cv";
import { CvService } from "../services/cv.service";
import { ActivatedRoute, Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";

import { AuthService } from "../../auth/services/auth.service";
import { APP_ROUTES } from "../../config/app-routes.config";
import { catchError, EMPTY, Observable, switchMap } from "rxjs";

@Component({
  selector: "app-details-cv",
  templateUrl: "./details-cv.component.html",
  styleUrls: ["./details-cv.component.css"],
})
export class DetailsCvComponent implements OnInit {
  private cvService = inject(CvService);
  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);
  private toastr = inject(ToastrService);
  public authService = inject(AuthService);
  cv$: Observable<Cv> = this.activatedRoute.params.pipe(
    switchMap((params) => this.cvService.getCvById(+params["id"])),
    catchError((e) => {
      this.router.navigate([APP_ROUTES.cv]);
      return EMPTY;
    })
  );

  /* this.cvService.getCvById(
    this.activatedRoute.snapshot.params["id"]
  ); */

  constructor() {}

  ngOnInit() {
    /* this.activatedRoute.params.subscribe({
      next: (params) => {
        this.cvService.getCvById(+params["id"]).subscribe({
          next: (cv) => {
            this.cv = cv;
          },
          error: (e) => {
            this.router.navigate(
              [APP_ROUTES.cv]

            );
          },
        });
      },
      error: (e) => {},
      complete: () => {},
    }); */
  }
  deleteCv(cv: Cv) {
    this.cvService.deleteCvById(cv.id).subscribe({
      next: () => {
        this.toastr.success(`${cv.name} supprimé avec succès`);
        this.router.navigate([APP_ROUTES.cv]);
      },
      error: () => {
        this.toastr.error(
          `Problème avec le serveur veuillez contacter l'admin`
        );
      },
    });
  }
}
