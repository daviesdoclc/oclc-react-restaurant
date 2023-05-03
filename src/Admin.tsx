import { Button, CircularProgress, TextField } from "@mui/material";
import { FormField } from "./shared/FormField";
import { useState } from "react";
import { Food } from "./types/food";
import { addFood } from "./services/foods.service";
import { useNavigate } from "react-router-dom";

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

export function Admin() {
  const [food, setFood] = useState(newFood);
  const [isSaving, setIsSaving] = useState(false);
  const navigate = useNavigate();

  function onChange(
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) {
    setFood({ ...food, [event.target.id]: event.target.value });
  }

  return (
    <div className="bg-white px-10 pb-10">
      <h1 className="text-black text-lg">Admin</h1>
      <form
        onSubmit={async (event) => {
          event.preventDefault();
          setIsSaving(true);
          await addFood(food);
          setIsSaving(false);
          navigate("/");
        }}
      >
        {isSaving && <CircularProgress />}
        <FormField>
          <TextField
            label="Name"
            id="name"
            value={food.name}
            onChange={onChange}
          />
        </FormField>
        <FormField>
          <TextField
            label="Description"
            id="description"
            value={food.description}
            onChange={onChange}
          />
        </FormField>
        <FormField>
          <TextField
            label="Price"
            id="price"
            type="number"
            value={food.price ?? ""}
            onChange={onChange}
          />
        </FormField>
        <FormField>
          <Button type="submit" variant="contained">
            Add Menu Item
          </Button>
        </FormField>
      </form>
    </div>
  );
}
