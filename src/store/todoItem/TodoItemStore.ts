import { TodoItem } from "../../domain/entity/TodoItem";
import { TodoStatus } from "../../domain/enum/TodoStatus";

export abstract class TodoItemStore {
  abstract find(): TodoItem[];
  abstract create(title: string): void;
  abstract toggleSelected(id: string): void;
  abstract deleteSelectedItems(): void;
  abstract setStatusToSelectedItems(status: TodoStatus): void;
  abstract clearSelected(): void;
}
