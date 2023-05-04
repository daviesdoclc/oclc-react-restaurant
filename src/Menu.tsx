import { Food } from "./types/food";
import { Card } from "./shared/Card";
import { useState } from "react";
import { getFoods, deleteFood } from "./services/foods.service";
import { Button, CircularProgress } from "@mui/material";
import { enqueueSnackbar } from "notistack";
import { useUserContext } from "./context/UserContext";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function Menu() {
  const [search, setSearch] = useState("");

  const { user } = useUserContext();
  const queryClient = useQueryClient();

  const { data: foods = [], isLoading } = useQuery({
    queryKey: ["foods"],
    queryFn: getFoods,
  });

  const deleteFoodMutation = useMutation({
    mutationFn: deleteFood,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["foods"] });
      enqueueSnackbar("Removed food!", { variant: "success" });
    },
  });

  const matchingFoods = foods.filter((food) =>
    food.name.toLowerCase().includes(search)
  );

  function renderSection() {
    return matchingFoods.map((food) => (
      <Card key={food.id} className="m-4 w-96">
        <img
          src={`/images/${food.image || "default.jpg"}`}
          style={{ maxHeight: 150, objectFit: "cover" }}
          className="opacity-80"
        />
        <div className="flex flex-col grow mx-4 my-3">
          <h3 className="font-bold text-xl">{food.name}</h3>
          <div className="italic my-2 text-sm">{food.description}</div>
          <div className="mt-2 mb-4 text-right text-sm">${food.price}</div>
          <div className="flex grow text-center text-xs items-end justify-center">
            {food.tags.join(", ")}
          </div>
        </div>
        <Button
          aria-label={`Delete ${food.name}`}
          onClick={() => {
            deleteFoodMutation.mutate(food.id);
          }}
        >
          Delete
        </Button>
      </Card>
    ));
  }

  return (
    <>
      <h1 className="text-center my-3 text-3xl">WorldCat Menu</h1>
      {user && <p className="text-center my-3">Welcome, {user.name}!</p>}
      <form className="text-center">
        <label htmlFor="search" className="mr-4">
          Search
        </label>
        <input
          id="search"
          className="border p-1 border-gray-400"
          type="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </form>
      <section className="flex flex-wrap justify-center">
        {isLoading ? <CircularProgress className="mt-20" /> : renderSection()}
      </section>
    </>
  );
}
