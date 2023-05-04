import { Button, CircularProgress } from "@mui/material";
import { useState } from "react";
import { Food } from "./types/food";
import { addFood } from "./services/foods.service";
import { useNavigate } from "react-router-dom";
import { enqueueSnackbar } from "notistack";
import { TextField } from "./shared/TextField";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export interface NewFood extends Omit<Food, "id" | "price"> {
  price: number | null;
}

const newFood: NewFood = {
  name: "",
  image: "",
  price: null,
  description: "",
  tags: [],
};

export interface Errors {
  id?: string;
  name?: string;
  image?: string;
  price?: string;
  description?: string;
  tags?: string;
}

export type Status = "idle" | "submitted" | "saving";

export function Admin() {
  const [status, setStatus] = useState<Status>("idle");
  const [food, setFood] = useState(newFood);

  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const addFoodMutation = useMutation({
    mutationFn: addFood,
    onSuccess: () => {
      enqueueSnackbar("Saved food!", { variant: "success" });
      queryClient.invalidateQueries({ queryKey: ["foods"] });
      navigate("/");
    },
  });

  function onChange(
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) {
    setFood({ ...food, [event.target.id]: event.target.value });
  }

  function getErrors() {
    const errors: Errors = {};
    if (!food.name) {
      errors.name = "Food name is required.";
    }
    if (!food.description) {
      errors.description = "Description is required.";
    }
    if (!food.price) {
      errors.price = "Price is required.";
    }
    return errors;
  }

  const errors = getErrors();

  return (
    <div className="bg-white px-10 pb-10">
      <h1 className="text-black text-lg">Admin</h1>
      <form
        onSubmit={async (event) => {
          event.preventDefault();
          if (Object.keys(errors).length > 0) {
            setStatus("submitted");
            return;
          }
          setStatus("saving");
          addFoodMutation.mutate(food);
          setStatus("idle");
        }}
      >
        {addFoodMutation.isLoading && <CircularProgress />}
        <TextField
          label="Name"
          id="name"
          value={food.name}
          onChange={onChange}
          error={errors.name}
          status={status}
        />
        <TextField
          label="Description"
          id="description"
          value={food.description}
          onChange={onChange}
          error={errors.description}
          status={status}
        />
        <TextField
          label="Price"
          id="price"
          type="number"
          value={food.price ?? ""}
          onChange={onChange}
          error={errors.price}
          status={status}
        />
        <Button type="submit" variant="contained">
          Add Menu Item
        </Button>
      </form>
    </div>
  );
}
