import { useContext } from "react";
import UserProgressContex from "../store/UserProgressContex";
import CartContex from "../store/cartContex";
import { Input } from "./Input";
import { Modal } from "./Modal";
import useHttp from "../hooks/usehttp";
import { Error } from "./Error";

const requestConfig = {
  method: "POST",
  headers: {
    "Content-type": "application/json",
  },
};

export function Checkout() {
  const cartCtx = useContext(CartContex);
  const userProgressCtx = useContext(UserProgressContex);

  const { data, error, loading, sendRequest } = useHttp(
    "http://localhost:3000/orders",
    requestConfig
  );
  console.log(data);
  const cartTotal = cartCtx.items.reduce(
    (total, items) => total + items.quantity * items.price,
    0
  );
  function handleClose() {
    userProgressCtx.hideCheckout();
  }

  function handleFinish() {
    userProgressCtx.hideCheckout();
    cartCtx.clearCart();
    clearData();
  }

  function handleSubmit(event) {
    event.preventDefault();
    const fd = new FormData(event.target);
    const customerData = Object.fromEntries(fd.entries());

    sendRequest(
      JSON.stringify({
        order: { items: cartCtx.items, customer: customerData },
      })
    );
  }
  let action = (
    <>
      <button onClick={handleClose} type="button">
        Close
      </button>
      <button>Submit Order</button>
    </>
  );

  if (loading) {
    action = <span>seding data...</span>;
  }

  if (data) {
    return (
      <Modal
        open={userProgressCtx.progress == "checkout"}
        onClose={handleFinish}
      >
        <h2>Success!</h2>
        <p>Your order was successfully done.</p>
        <p className="modal-actions">
          <button onClick={handleFinish}>Okay</button>
        </p>
      </Modal>
    );
  }

  return (
    <Modal open={userProgressCtx.progress == "checkout"} onClose={handleClose}>
      <form onSubmit={handleSubmit}>
        <h2>Checkout</h2>
        <p>Total Amount: ${cartTotal}</p>
        <Input label="Full Name" type="text" id="name" />
        <Input label="Email-Address" type="email" id="email" />
        <Input label="Street" type="text" id="street" />
        <div className="control-row">
          <Input label="Postal code" type="text" id="postal-code" />
          <Input label="City" type="text" id="city" />
        </div>
        {error && <Error title="Failed to submit order" message={error} />}
        <p className="modal-actions">{action}</p>
      </form>
    </Modal>
  );
}
