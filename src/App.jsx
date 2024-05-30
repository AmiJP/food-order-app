import Cart from "./components/Cart";
import { Checkout } from "./components/CheckOut";

import Header from "./components/Header";
import Meals from "./components/Meals";
import { UserProgressContexProvider } from "./store/UserProgressContex";
import { CartContexProvider } from "./store/cartContex";

function App() {
  return (
    <UserProgressContexProvider>
      <CartContexProvider>
        <Header />
        <Meals />
        <Cart />
        <Checkout />
      </CartContexProvider>
    </UserProgressContexProvider>
  );
}

export default App;
