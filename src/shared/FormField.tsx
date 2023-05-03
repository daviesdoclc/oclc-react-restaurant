import { Box } from "@mui/material";

type FormFieldProps = {
  children: React.ReactNode;
};

export function FormField(props: FormFieldProps) {
  return <Box className="my-2">{props.children}</Box>;
}
