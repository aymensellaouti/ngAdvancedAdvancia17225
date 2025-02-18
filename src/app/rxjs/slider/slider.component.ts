import { HttpClient } from "@angular/common/http";
import { Component, inject, Input, OnInit } from "@angular/core";
import { Observable, combineLatest, map, startWith, timer } from "rxjs";

export interface ImageApi {
  albumId: number;
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
}

@Component({
  selector: "app-slider",
  templateUrl: "./slider.component.html",
  styleUrls: ["./slider.component.css"],
})
export class SliderComponent implements OnInit {
  @Input() timer = 1500;
  http = inject(HttpClient);
  images$ = this.http.get<ImageApi[]>(
    "https://jsonplaceholder.typicode.com/photos"
  );
  @Input() imagePaths = [
    "as.jpg",
    "cv.png",
    "rotating_card_profile.png",
    "rotating_card_profile2.png",
    "rotating_card_profile3.png",
  ];

  /* Todo : Créer le flux permettant de générer les images à afficher dans le slider */
  paths$!: Observable<string>;
  ngOnInit(): void {
    // V1
    /* this.paths$ = timer(0, this.timer).pipe(
      // 0      1       2 3 4 5 6 7 8 9
      map((index) => this.imagePaths[index % this.imagePaths.length]),
      startWith(this.imagePaths[this.imagePaths.length - 1])
      // img1   img2   img3
    ); */

    //V2
    this.paths$ = combineLatest([this.images$, timer(0, this.timer)]).pipe(
      // [images, 0], [images, 1]
      map(([images, index]) => images[index % images.length].url)
    );
  }
}
