import React from "react";
import { diContainer } from "./config/inversify.config";
import { InjectionProvider } from "./hook/useInjection";
import { TodoPage } from './page/todoPage'
import "./styles.css";

export default function App() {
  return (
    <InjectionProvider container={diContainer}>
      <TodoPage />
    </InjectionProvider>
  );
}
