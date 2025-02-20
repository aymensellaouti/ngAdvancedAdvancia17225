import { NgModule } from "@angular/core";
import { TodoComponent } from "./todo/todo.component";
import { WeekTodoComponent } from "./week-todo/week-todo.component";
import { TodoRoutingModule } from "./todo-routing.module";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";

@NgModule({
  declarations: [TodoComponent, WeekTodoComponent],
  imports: [TodoRoutingModule, FormsModule, CommonModule],
  exports: [],
  providers: [],
})
export class TodoModule {}
