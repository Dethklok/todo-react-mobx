import { TodoStatus } from "../enum/TodoStatus";

export class TodoItem {
  constructor(
    public readonly id: string,
    public title: string,
    public status: TodoStatus = TodoStatus.UNDONE
  ) {}
}
