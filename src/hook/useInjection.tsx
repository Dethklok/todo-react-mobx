import React, { useContext } from "react";
import { Container, interfaces } from "inversify";

const InjectionContext = React.createContext<{ container?: Container }>({});

interface Props {
  container: Container;
  children: React.ReactNode;
}

const InjectionProvider: React.FC<Props> = ({ container, children }) => {
  return (
    <InjectionContext.Provider value={{ container }}>{children}</InjectionContext.Provider>
  );
};

function useInjection<T>(identifier: interfaces.ServiceIdentifier<T>) {
  const { container } = useContext(InjectionContext);

  if (!container) {
    throw new Error('Dependency injection container is undefided. Maybe you forgot to use InjectionProvider?');
  }

  return container.get<T>(identifier);
}

export { InjectionProvider, useInjection };
