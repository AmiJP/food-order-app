import { useContext } from "react";
import { currencyFormatter } from "../utils/currencyFormat";
import CartContex from "../store/cartContex";

export default function MealIteam({ meal }) {
  const cartCtx = useContext(CartContex);
  function handleAddMealToCart() {
    cartCtx.addItem(meal);
  }
  return (
    <li className="meal-item">
      <article>
        <img src={`http://localhost:3000/${meal.image}`} alt={meal.name}></img>
        <div>
          <h3>{meal.name}</h3>
          <p className="meal-item-price">
            {currencyFormatter.format(meal.price)}
          </p>
          <p className="meal-item-description">{meal.description}</p>
        </div>
        <p className="meal-item-actions">
          <button onClick={handleAddMealToCart}>Add to Cart</button>
        </p>
      </article>
    </li>
  );
}
