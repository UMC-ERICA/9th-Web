// src/hooks/useForm.ts
import type { ChangeEvent, FormEvent } from "react";
import { useState } from "react";

export type LoginValues = {
  email: string;
  password: string;
};

export type LoginErrors = {
  email?: string;
  password?: string;
};

type UseFormProps = {
  initialValues: LoginValues;
  validate: (values: LoginValues) => LoginErrors;
  onSubmit?: (values: LoginValues) => void;
};

export function useForm({ initialValues, validate, onSubmit }: UseFormProps) {
  const [values, setValues] = useState<LoginValues>(initialValues);
  const [errors, setErrors] = useState<LoginErrors>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    const nextValues = { ...values, [name]: value };
    setValues(nextValues);

    // 입력할 때마다 검증
    const nextErrors = validate(nextValues);
    setErrors(nextErrors);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const nextErrors = validate(values);
    setErrors(nextErrors);
    setIsSubmitted(true);

    const hasError = Object.keys(nextErrors).length > 0;
    if (!hasError && onSubmit) {
      onSubmit(values);
    }
  };

  const isValid =
    Object.keys(errors).length === 0 &&
    values.email !== "" &&
    values.password !== "";

  return {
    values,
    errors,
    isValid,
    isSubmitted,
    handleChange,
    handleSubmit,
  };
}
