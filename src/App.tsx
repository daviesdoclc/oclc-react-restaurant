import { Food } from "./types/food";
import { Card } from "./shared/Card";
import { useEffect, useState } from "react";
import { getFoods } from "./services/foods.service";
import { CircularProgress } from "@mui/material";
import { NavBar } from "./shared/NavBar";

export function App() {
  const [search, setSearch] = useState("");
  const [foods, setFoods] = useState<Food[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchFoods() {
      const resp = await getFoods();
      setFoods(resp);
      setLoading(false);
    }
    fetchFoods();
  }, []);

  const matchingFoods = foods.filter((food) =>
    food.name.toLowerCase().includes(search)
  );

  function renderSection() {
    return matchingFoods.map((food) => (
      <Card key={food.id} className="m-4 w-96">
        <img
          src={`/images/${food.image}`}
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
      </Card>
    ));
  }
  return (
    <main>
      <NavBar />
      <h1 className="text-center my-6 mb-10">WorldCat Menu</h1>
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
      <h2 className="text-center py-3">Filter ({search})</h2>
      <section className="flex flex-wrap justify-center">
        {loading ? <CircularProgress /> : renderSection()}
      </section>
    </main>
  );
}
