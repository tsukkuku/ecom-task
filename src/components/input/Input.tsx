import type { InputHTMLAttributes } from "react";
import style from "./Input.module.css";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

export const Input = ({ ...props }: InputProps) => {
  return <input className={style.input} {...props} />;
};
