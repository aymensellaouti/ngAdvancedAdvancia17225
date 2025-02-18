import { Component, OnDestroy } from "@angular/core";
import { Observable, Subscription, filter, map } from "rxjs";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-test-observable",
  templateUrl: "./test-observable.component.html",
  styleUrls: ["./test-observable.component.css"],
})
export class TestObservableComponent {
  firstObservable$: Observable<number>;
  /*  countdown = 5; */
  constructor(private toaster: ToastrService) {
    this.firstObservable$ = new Observable((observer) => {
      let i = 5;
      setInterval(() => {
        if (!i) {
          observer.complete();
        }
        observer.next(i--);
      }, 1000);
    });

    // Subscriber 1
    this.firstObservable$.subscribe({
      next: (value) => console.log(value),
    });

    /*     setTimeout(() => { */
    //Subscriber 2
    this.firstObservable$
      // 5 4 3 2 1
      .pipe(
        map((valeur) => valeur * 3)
        // 15 12 9 6 3
      )
      .subscribe({
        next: (value) => toaster.info("" + value),
        complete: () => toaster.error("BOOOOM"),
      });
    /*     }, 3000);
     */

    // Subscriber 3
    /* this.firstObservable$.subscribe({
      next: (value) => (this.countdown = value),
    }); */
  }
}
