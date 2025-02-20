import { NgModule } from "@angular/core";
import { Route, RouterModule } from "@angular/router";
import { authGuard } from "../auth/guards/auth.guard";
import { APP_ROUTES } from "../config/app-routes.config";
import { AddCvComponent } from "./add-cv/add-cv.component";
import { CvComponent } from "./cv/cv.component";
import { DetailsCvComponent } from "./details-cv/details-cv.component";
import { MasterDetailComponent } from "./master-detail/master-detail.component";
import { getAllCvsResolver } from "./resolvers/get-all-cvs.resolver";

const routes: Route[] = [
  {
    path: "",
    component: CvComponent,
  },
  {
    path: `add`,
    component: AddCvComponent,
    canActivate: [authGuard],
  },
  {
    path: `list`,
    component: MasterDetailComponent,
    resolve: {
      cvs: getAllCvsResolver,
    },
    children: [{ path: ":id", component: DetailsCvComponent }],
  },
  { path: `:id`, component: DetailsCvComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class CvRoutingModule {}
