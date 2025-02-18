import { NgModule } from "@angular/core";
import { RouterModule, Route } from "@angular/router";
import { TodoComponent } from "./todo/todo/todo.component";
import { MiniWordComponent } from "./directives/mini-word/mini-word.component";
import { ColorComponent } from "./components/color/color.component";
import { FrontComponent } from "./templates/front/front.component";
import { AdminComponent } from "./templates/admin/admin.component";
import { LoginComponent } from "./auth/login/login.component";
import { NF404Component } from "./components/nf404/nf404.component";
import { authGuard } from "./auth/guards/auth.guard";
import { AddCvComponent } from "./cv/add-cv/add-cv.component";
import { CvComponent } from "./cv/cv/cv.component";
import { DetailsCvComponent } from "./cv/details-cv/details-cv.component";
import { RhComponent } from "./optimizationPattern/rh/rh.component";
import { MasterDetailComponent } from "./cv/master-detail/master-detail.component";
import { getAllCvsResolver } from "./cv/resolvers/get-all-cvs.resolver";
import { canLeaveGuard } from "./guards/can-leave.guard";
import { APP_ROUTES } from "./config/app-routes.config";
import { TestObservableComponent } from "./rxjs/test-observable/test-observable.component";

// cv/add
const routes: Route[] = [
  { path: "login", component: LoginComponent },
  { path: "rh", component: RhComponent },
  {
    path: APP_ROUTES.cv,
    component: CvComponent,
  },
  {
    path: `${APP_ROUTES.cv}/add`,
    component: AddCvComponent,
    canActivate: [authGuard],
  },
  {
    path: `${APP_ROUTES.cv}/list`,
    component: MasterDetailComponent,
    resolve: {
      cvs: getAllCvsResolver,
    },
    children: [{ path: ":id", component: DetailsCvComponent }],
  },
  { path: "cv/:id", component: DetailsCvComponent },
  {
    path: "",
    component: FrontComponent,
    children: [
      {
        path: "todo",
        component: TodoComponent,
        canDeactivate: [canLeaveGuard],
      },
      { path: "word", component: MiniWordComponent },
      { path: APP_ROUTES.rxjs, component: TestObservableComponent },
      /* { path: "color", component: ColorComponent }, */
    ],
  },
  {
    path: "admin",
    component: AdminComponent,
    children: [{ path: "color", component: ColorComponent }],
  },
  { path: "**", component: NF404Component },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
