import { useContext } from "react";
import logoImg from "../assets/logo.jpg";
import CartContex from "../store/cartContex";
import UserProgressContex from "../store/UserProgressContex";

export default function Header() {
  const cartCtx = useContext(CartContex);
  const userProgressCtx = useContext(UserProgressContex);

  const totalCartItem = cartCtx.items.reduce((total, item) => {
    return total + item.quantity;
  }, 0);

  function handleShowCart() {
    userProgressCtx.showCart();
  }
  return (
    <header id="main-header">
      <div id="title">
        <img src={logoImg} alt="A Restaurant"></img>
        <h1>ReactFood</h1>
      </div>
      <nav>
        <button onClick={handleShowCart}>Cart {totalCartItem}</button>
      </nav>
    </header>
  );
}
