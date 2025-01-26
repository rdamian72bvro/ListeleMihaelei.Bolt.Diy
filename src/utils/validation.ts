import { ValidationRule } from "@/hooks/useFormValidation";

type ValidFieldName = "listName" | "item";

export const required = (fieldName: ValidFieldName): ValidationRule<string> => ({
  validate: (value) => value.trim().length > 0,
  message: `validation.${fieldName}.required` as const,
});

export const minLength = (length: number, fieldName: ValidFieldName): ValidationRule<string> => ({
  validate: (value) => value.trim().length >= length,
  message: `validation.${fieldName}.minLength` as const,
});

export const maxLength = (length: number, fieldName: ValidFieldName): ValidationRule<string> => ({
  validate: (value) => value.trim().length <= length,
  message: `validation.${fieldName}.maxLength` as const,
});

export const pattern = (regex: RegExp, fieldName: ValidFieldName): ValidationRule<string> => ({
  validate: (value) => regex.test(value),
  message: `validation.${fieldName}.pattern` as const,
});

export const noSpecialChars = (fieldName: ValidFieldName): ValidationRule<string> => ({
  validate: (value) => /^[a-zA-Z0-9\s-_]+$/.test(value),
  message: `validation.${fieldName}.noSpecialChars` as const,
});

export const noDuplicates = (existingValues: string[], fieldName: ValidFieldName): ValidationRule<string> => ({
  validate: (value) => !existingValues.includes(value.trim()),
  message: `validation.${fieldName}.duplicate` as const,
});
