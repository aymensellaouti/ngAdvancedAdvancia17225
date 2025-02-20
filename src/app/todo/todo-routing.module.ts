import { NgModule } from "@angular/core";
import { RouterModule, Route } from "@angular/router";
import { canLeaveGuard } from "../guards/can-leave.guard";
import { TodoComponent } from "./todo/todo.component";

const routes: Route[] = [
  {
    path: "todo",
    component: TodoComponent,
    canDeactivate: [canLeaveGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class TodoRoutingModule {}
