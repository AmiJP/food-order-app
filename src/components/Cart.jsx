import { useContext } from "react";
import { Modal } from "./Modal";
import CartContex from "../store/cartContex";
import UserProgressContex from "../store/UserProgressContex";
import { CartItems } from "./CartItems";

export default function Cart() {
  const cartCtx = useContext(CartContex);
  const userProgressCtx = useContext(UserProgressContex);
  const cartTotal = cartCtx.items.reduce(
    (total, items) => total + items.quantity * items.price,
    0
  );

  function handleHideCart() {
    userProgressCtx.hideCart();
  }
  function handleGotoCheckout() {
    userProgressCtx.showCheckout();
  }
  return (
    <Modal
      className="cart"
      open={userProgressCtx.progress == "cart"}
      onClose={userProgressCtx.progress == "cart" ? handleHideCart : null}
    >
      <h2>Your Cart</h2>
      <ul>
        {cartCtx.items.map((ele) => (
          <CartItems
            key={ele.id}
            name={ele.name}
            quantity={ele.quantity}
            price={ele.price}
            onDecrease={() => cartCtx.removeItem(ele.id)}
            onIncrease={() => cartCtx.addItem(ele)}
          />
        ))}
      </ul>
      <p className="cart-total">${cartTotal.toFixed(0)}</p>
      <p className="modal-actions">
        <button onClick={handleHideCart}>Close</button>
        {cartCtx.items.length > 0 ? (
          <button onClick={handleGotoCheckout}>Go to Checkout</button>
        ) : null}
      </p>
    </Modal>
  );
}
