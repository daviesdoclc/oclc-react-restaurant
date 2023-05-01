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
      <h1 className="text-center py-4 ">Menu</h1>
      <form className="text-center">
        <label htmlFor="search">Search</label>{" "}
        <input
          id="search"
          className="border p-1 border-gray-400"
          type="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </form>
      <div className="flex flex-wrap px-5 py-5">
        {matchingFoods.map((food) => (
          <Card key={food.id}>
            <h3 className="font-bold mb-4">{food.name}</h3>
            <div className="italic mb-4">{food.description}</div>
            <div className="mb-4">${food.price}</div>
            <div className="text-sm">{food.tags.join(", ")}</div>
          </Card>
        ))}
      </div>
    </>
  );
}
