import MealIteam from "./MealIteam";
import useHttp from "../hooks/usehttp";
import { Error } from "./Error";
const obj = {};
export default function Meals() {
  const { data, error, loading } = useHttp(
    "http://localhost:3000/meals",
    obj,
    []
  );

  if (loading) {
    return <p className="center">Fetching data...</p>;
  }

  if (error) {
    return <Error title="Failed to fetch meals." message={error} />;
  }
  console.log("aaa", data);
  return (
    <ul id="meal">
      {data.map((meal) => (
        <MealIteam key={meal.id} meal={meal} />
      ))}
    </ul>
  );
}
