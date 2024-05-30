export function CartItems({ name, quantity, price, onIncrease, onDecrease }) {
  return (
    <li className="cart-item">
      <p>
        {name}-{quantity} x ${price}
      </p>
      <p className="cart-item-actions">
        <button onClick={onIncrease}>+</button>
        <span>{quantity}</span>
        <button onClick={onDecrease}>-</button>
      </p>
    </li>
  );
}
