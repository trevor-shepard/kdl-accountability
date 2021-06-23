import React from "react";
import { NatureOfTheOffenseDict } from "../types";

export function useFormFields<T>(initialValues: T) {
  const [formFields, setFormFields] = React.useState<T>(initialValues);
  const createChangeHandler =
    (key: keyof T) =>
    (value: string | boolean | NatureOfTheOffenseDict | null) => {
      setFormFields((prev: T) => ({ ...prev, [key]: value }));
    };
  return { formFields, createChangeHandler };
}
