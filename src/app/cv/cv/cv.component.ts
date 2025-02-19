import { Component, inject } from "@angular/core";
import { Cv } from "../model/cv";
import { LoggerService } from "../../services/logger.service";
import { ToastrService } from "ngx-toastr";
import { CvService } from "../services/cv.service";
import { EMPTY, Observable, catchError, of, retry } from "rxjs";
import { ILoggerToken } from "../../injectionTokens/ILogger.token";
import { TodoService } from "../../todo/service/todo.service";
@Component({
  selector: "app-cv",
  templateUrl: "./cv.component.html",
  styleUrls: ["./cv.component.css"],
  providers: [],
})
export class CvComponent {
  private cvService = inject(CvService);
  cvs$: Observable<Cv[]> = this.cvService.getCvs().pipe(
    retry({
      delay: 2500,
      count: 3,
    }),
    catchError(() => {
      this.toastr.error(`
      Attention!! Les données sont fictives, problème avec le serveur.
      Veuillez contacter l'admin.`);
      return of(this.cvService.getFakeCvs());
    })
  );
  selectedCv$: Observable<Cv> = this.cvService.selectedCv$;
  /*   selectedCv: Cv | null = null; */
  date = new Date();
  loggers = inject(ILoggerToken);
  todoService = inject(TodoService);
  constructor(private logger: LoggerService, private toastr: ToastrService) {
    this.loggers.forEach((logger) => logger.logger("je suis le cvComponent"));
    /* this.cvService.getCvs().subscribe({
      next: (cvs) => {
        this.cvs = cvs;
      },
      error: () => {
        this.cvs = this.cvService.getFakeCvs();
        this.toastr.error(`
          Attention!! Les données sont fictives, problème avec le serveur.
          Veuillez contacter l'admin.`);
      },
    }); */
    this.logger.logger("je suis le cvComponent");
    this.toastr.info("Bienvenu dans notre CvTech");
  }
  /*   onForwardCv(cv: Cv) {
    this.selectedCv = cv;
  } */
}
