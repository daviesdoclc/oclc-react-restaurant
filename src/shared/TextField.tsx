import { TextField as MuiTextField } from "@mui/material";
import { Status } from "../Admin";
import { useState } from "react";
import { FormField } from "./FormField";

type TextFieldProps = {
  label: string;
  id: string;
  onBlur?: (event: any) => void;
  onChange: (event: any) => void;
  type?: "text" | "number";
  error: string | undefined;
  value: string | number;
  status: Status;
};

export interface Touched {
  id?: boolean;
  name?: boolean;
  image?: boolean;
  price?: boolean;
  description?: boolean;
  tags?: boolean;
}

export function TextField({
  type = "text",
  status,
  error,
  onBlur,
  ...rest
}: TextFieldProps) {
  const [touched, setTouched] = useState(false);
  return (
    <FormField>
      <MuiTextField
        type={type}
        onBlur={(e) => {
          setTouched(true);
          onBlur?.(e);
        }}
        error={(touched || status === "submitted") && !!error}
        helperText={(touched || status === "submitted") && error}
        {...rest}
      />
    </FormField>
  );
}
