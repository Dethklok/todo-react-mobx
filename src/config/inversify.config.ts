import { Container } from "inversify";
import "reflect-metadata";
import { TodoItemStore, TodoItemStoreImpl } from "../store/todoItem";

const diContainer = new Container();

diContainer.bind(TodoItemStore).to(TodoItemStoreImpl).inSingletonScope();

export { diContainer };
