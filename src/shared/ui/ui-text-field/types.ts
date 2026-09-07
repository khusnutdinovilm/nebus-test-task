export interface IUiTextFieldProps {
  id: string;
  label?: string;
  type?: "text" | "number" | "password";
  variant?: "default" | "tertiary";
  name?: string;
  disabled?: boolean;
}
