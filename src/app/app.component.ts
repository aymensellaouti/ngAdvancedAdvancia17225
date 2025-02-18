import { Component, inject } from "@angular/core";
import {
  NavigationCancel,
  NavigationEnd,
  NavigationError,
  NavigationStart,
  Router,
} from "@angular/router";
import { NgxUiLoaderService } from "ngx-ui-loader";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent {
  title = "Starting Advanced Topics";
  router = inject(Router);
  ngxService = inject(NgxUiLoaderService);

  constructor() {
    /* this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        this.ngxService.start();
      } else if (
        event instanceof NavigationEnd ||
        event instanceof NavigationCancel ||
        event instanceof NavigationError
      ) {
        this.ngxService.stop();
      }
    }); */
  }
}
