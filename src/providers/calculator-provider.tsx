"use client";

import {
  createContext,
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useContext,
  useState,
} from "react";

export type Food = {
  name: string;
  qty: number;
  calcium_mg: number;
  category: string;
};

type ContextType = {
  foods: Food[];
  onFoods: Dispatch<SetStateAction<Food[]>>;
};

const CalculatorContext = createContext<ContextType | undefined>(undefined);

export const CalculatorProvider = ({ children }: PropsWithChildren) => {
  const [foods, setFoods] = useState<Food[]>([]);

  return (
    <CalculatorContext.Provider
      value={{
        foods,
        onFoods: setFoods,
      }}
    >
      {children}
    </CalculatorContext.Provider>
  );
};

export const useCalculatorContext = () => {
  const context = useContext(CalculatorContext);

  if (!context) throw new Error("Calculator context is not defined");

  return context;
};
