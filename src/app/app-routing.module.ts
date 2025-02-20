import { NgModule } from "@angular/core";
import { RouterModule, Route } from "@angular/router";
import { MiniWordComponent } from "./directives/mini-word/mini-word.component";
import { ColorComponent } from "./components/color/color.component";
import { FrontComponent } from "./templates/front/front.component";
import { AdminComponent } from "./templates/admin/admin.component";
import { LoginComponent } from "./auth/login/login.component";
import { NF404Component } from "./components/nf404/nf404.component";
import { RhComponent } from "./optimizationPattern/rh/rh.component";
import { APP_ROUTES } from "./config/app-routes.config";
import { TestObservableComponent } from "./rxjs/test-observable/test-observable.component";
import { ProductsComponent } from "./products/products.component";

// cv/add
const routes: Route[] = [
  { path: "login", component: LoginComponent },
  { path: "rh", component: RhComponent },
  {
    path: "",
    component: FrontComponent,
    children: [
      { path: "word", component: MiniWordComponent },
      { path: APP_ROUTES.rxjs, component: TestObservableComponent },
    ],
  },
  {
    path: "admin",
    component: AdminComponent,
    children: [{ path: "color", component: ColorComponent }],
  },
  { path: APP_ROUTES.products, component: ProductsComponent },
  {
    path: APP_ROUTES.cv,
    loadChildren: () => import("./cv/cv.module").then((m) => m.CvModule),
  },
  {
    path: "todo",
    loadChildren: () => import("./todo/todo.module").then((m) => m.TodoModule),
  },
  { path: "**", component: NF404Component },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
