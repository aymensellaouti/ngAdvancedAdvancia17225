import { Component, inject } from "@angular/core";
import {
  BehaviorSubject,
  Observable,
  concatMap,
  map,
  takeWhile,
  scan,
} from "rxjs";
import { Product } from "./dto/product.dto";
import { ProductService } from "./services/product.service";
import { Settings } from "./dto/product-settings.dto";

@Component({
  selector: "app-products",
  templateUrl: "./products.component.html",
  styleUrls: ["./products.component.css"],
})
export class ProductsComponent {
  setting: Settings = { skip: 0, limit: 12 };
  isDisabled = false;
  settings$ = new BehaviorSubject<Settings>(this.setting);
  productService = inject(ProductService);
  /* Todo : Faire le nécessaire pour créer le flux des produits à afficher */
  /* Tips : vous pouvez voir les différents imports non utilisés et vous en inspirer */
  // settings setiing1 -setting2 ....
  products$: Observable<Product[]> = this.settings$.pipe(
    // productsResponse1  ProductResponse2 ....
    concatMap((setting) => this.productService.getProducts(setting)),
    // products1 products2 ....
    map((prductResponse) => prductResponse.products),
    // kamel haka 7ata lin ma 3ad teb3athli chay
    takeWhile((products) => {
      if (!products.length) {
        this.isDisabled = true;
        return false;
      }
      return true;
    }),
    // concatinihom avec les anciens products
    scan((oldProducts, newProducts) => [...oldProducts, ...newProducts])
  );
  getMore() {
    this.setting = {
      ...this.setting,
      skip: this.setting.skip + this.setting.limit,
    };
    this.settings$.next(this.setting);
  }
}
