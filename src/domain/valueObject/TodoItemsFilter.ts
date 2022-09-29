import { TodoStatus } from "../enum/TodoStatus";

export interface TodoItemsFilter {
  title: string;
  status?: TodoStatus;
}
