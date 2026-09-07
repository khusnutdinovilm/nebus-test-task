import type { RouteLocationRaw } from "vue-router";

export type ButtonVariant = "primary" | "default" | "texted-primary" | "texted-danger";

export type ActionableTarget = "_blank" | "_self" | "_parent" | "_top";

export interface IUiButtonProps {
  to?: RouteLocationRaw;
  href?: string;
  target?: ActionableTarget;
  label?: string;
  type?: "button" | "submit";
  variant?: ButtonVariant;
  loading?: boolean;
  disabled?: boolean;
}
