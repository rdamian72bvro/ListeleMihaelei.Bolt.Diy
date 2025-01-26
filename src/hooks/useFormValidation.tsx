import { useState, useCallback, useMemo } from "react";
import { useTranslation } from "./useTranslation";
import { translations } from "@/translations/en";

type TranslationKey = keyof typeof translations;
type ValidationKey = keyof (typeof translations)["validation"];
type ValidationMessages = {
  [K in ValidationKey]: keyof (typeof translations)["validation"][K];
};

export type ValidationRule<T> = {
  validate: (value: T) => boolean;
  message: `validation.${ValidationKey}.${ValidationMessages[ValidationKey]}`;
};

export type ValidationRules<T> = {
  [K in keyof T]: ValidationRule<T[K]>[];
};

export type ValidationErrors<T> = {
  [K in keyof T]?: string;
};

export function useFormValidation<T extends Record<string, any>>(
  initialValues: T,
  validationRules: ValidationRules<T>
) {
  const { t } = useTranslation();
  const [touched, setTouched] = useState<{ [K in keyof T]?: boolean }>({});

  const validateField = useCallback(
    (name: keyof T, value: T[keyof T]) => {
      const fieldRules = validationRules[name];
      if (!fieldRules) return "";

      for (const rule of fieldRules) {
        if (!rule.validate(value)) {
          return t(rule.message);
        }
      }
      return "";
    },
    [validationRules, t]
  );

  const validateSingleField = useCallback(
    (name: keyof T, value: T[keyof T]) => {
      const error = validateField(name, value);
      return { [name]: error };
    },
    [validateField]
  );

  const validateAllFields = useCallback(
    (values: T) => {
      const newErrors: ValidationErrors<T> = {};
      let isValid = true;

      Object.keys(values).forEach((key) => {
        const fieldName = key as keyof T;
        const error = validateField(fieldName, values[fieldName]);
        if (error) {
          newErrors[fieldName] = error;
          isValid = false;
        }
      });

      return { isValid, errors: newErrors };
    },
    [validateField]
  );

  const handleBlur = useCallback(
    (name: keyof T) => {
      setTouched((prev) => ({ ...prev, [name]: true }));
    },
    []
  );

  return {
    touched,
    validateField: validateSingleField,
    validateForm: validateAllFields,
    handleBlur,
    resetTouched: () => setTouched({}),
  };
}
