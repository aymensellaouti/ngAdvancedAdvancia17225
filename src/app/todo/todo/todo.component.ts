import { Component, inject, Inject } from "@angular/core";
import { Todo } from "../model/todo";
import { TodoService } from "../service/todo.service";
import { LOGGER_SERVICE_TOKEN } from "../../injectionTokens/loggerService.injection-token";
import { LoggerService } from "../../services/logger.service";
import { CanLeave } from "../../guards/can-leave.interface";
import { Observable } from "rxjs";

@Component({
  selector: "app-todo",
  templateUrl: "./todo.component.html",
  styleUrls: ["./todo.component.css"],
  /*   providers: [TodoService], */
})
export class TodoComponent implements CanLeave {
  todos: Todo[] = [];
  todo = new Todo();
  /* loggerService: LoggerService = inject(LOGGER_SERVICE_TOKEN); */
  constructor(
    private loggerService: LoggerService,
    private todoService: TodoService
  ) {
    this.loggerService.logger("je suis le todoComponent");
    this.todos = this.todoService.getTodos();
  }
  canLeave(): boolean | Promise<boolean> | Observable<boolean> {
    return this.todo.name.trim() || this.todo.content.trim()
      ? confirm("Are you sure you want to leave this")
      : true;
  }
  addTodo() {
    this.todoService.addTodo(this.todo);
    this.todo = new Todo();
  }

  deleteTodo(todo: Todo) {
    this.todoService.deleteTodo(todo);
  }
}
