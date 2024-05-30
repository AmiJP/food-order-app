import { createContext, useState } from "react";

const UserProgressContex = createContext({
  progress: "",
  showCart: () => {},
  hideCart: () => {},
  showCheckout: () => {},
  hideCheckOut: () => {},
});

export function UserProgressContexProvider({ children }) {
  const [userProgress, setUserProgress] = useState("");

  function showCart() {
    setUserProgress("cart");
  }
  function hideCart() {
    setUserProgress("");
  }
  function showCheckout() {
    setUserProgress("checkout");
  }
  function hideCheckout() {
    setUserProgress("");
  }

  const userProgressCtx = {
    progress: userProgress,
    showCart,
    hideCart,
    showCheckout,
    hideCheckout,
  };
  return (
    <UserProgressContex.Provider value={userProgressCtx}>
      {children}
    </UserProgressContex.Provider>
  );
}

export default UserProgressContex;
