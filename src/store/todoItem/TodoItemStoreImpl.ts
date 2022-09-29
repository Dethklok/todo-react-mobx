import { injectable } from "inversify";
import { makeAutoObservable } from "mobx";
import { Uuid } from "../../kernel/Uuid";
import { TodoItem } from "../../domain/entity/TodoItem";
import { TodoStatus } from "../../domain/enum/TodoStatus";
import { TodoItemsFilter } from "../../domain/valueObject/TodoItemsFilter";
import { TodoItemStore } from "./TodoItemStore";

@injectable()
export class TodoItemStoreImpl implements TodoItemStore {
  private todoItemsById: Map<string, TodoItem> = new Map();
  private filter: TodoItemsFilter = { title: '' };
  private selectedTodoItemIds: Set<string> = new Set();

  constructor() {
    makeAutoObservable(this);
  }

  find(): TodoItem[] {
    return Array.from(this.todoItemsById.values())
      .filter(this.hasTodoItemSelectedStatus)
      .filter(this.hasTodoItemSelectedTitle);
  }

  create(title: string) {
    const todoItem = new TodoItem(Uuid.generate(), title);
    this.todoItemsById.set(todoItem.id, todoItem);
  }

  toggleSelected(id: string) {
    if (this.selectedTodoItemIds.has(id)) {
      this.selectedTodoItemIds.delete(id);
    } else {
      this.selectedTodoItemIds.add(id);
    }
  }

  deleteSelectedItems() {
    this.selectedTodoItemIds.forEach((id) => this.todoItemsById.delete(id));
    this.clearSelected();
  }

  setStatusToSelectedItems(status: TodoStatus) {
    this.selectedTodoItemIds.forEach((id) => {
      const todoItem = this.todoItemsById.get(id);
      if (todoItem) {
        todoItem.status = status;
      }
    });
  }

  clearSelected() {
    this.selectedTodoItemIds.clear();
  }

  private hasTodoItemSelectedStatus(todoItem: TodoItem): boolean {
    const { status } = this.filter;
    return status ? todoItem.status === status : true;
  }

  private hasTodoItemSelectedTitle(todoItem: TodoItem): boolean {
    const { title } = this.filter;
    return title.length > 0 ? todoItem.title.includes(title) : true;
  }
}
