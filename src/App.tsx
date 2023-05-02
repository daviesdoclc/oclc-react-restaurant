import { foods } from "./types/food";
import { Card } from "./shared/Card";
import { useState } from "react";

export function App() {
  const [search, setSearch] = useState("");

  const matchingFoods = foods.filter((food) =>
    food.name.toLowerCase().includes(search)
  );

  return (
    <>
      <h1 className="text-center my-6">OCLC Restaurant Menu</h1>
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
      <div className="flex flex-wrap pt-10">
        {matchingFoods.map((food) => (
          <Card key={food.id}>
            <img
              src={food.image}
              style={{ maxHeight: 150, objectFit: "cover" }}
              className="rounded-t-lg"
            />
            <h3 className="font-bold my-2">{food.name}</h3>
            <div className="italic my-2">{food.description}</div>
            <div className="mt-2 mb-4 text-right">${food.price}</div>
            <div className="flex grow justify-center items-end text-xs">
              Available for: {food.tags.join(", ")}
            </div>
          </Card>
        ))}
      </div>
    </>
  );
}
