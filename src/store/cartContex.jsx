import { createContext, useReducer } from "react";

export const CartContex = createContext({
  items: [],
  addItem: (item) => {},
  removeItem: (id) => {},
  clearCart: () => {},
});

function cartReducer(state, action) {
  if (action.type == "ADD_ITEM") {
    const existingItemCartIndex = state.items.findIndex(
      (item) => item.id === action.item.id
    );

    const updateItems = [...state.items];
    if (existingItemCartIndex > -1) {
      const existingItem = state.items[existingItemCartIndex];
      const updateItem = {
        ...existingItem,
        quantity: existingItem.quantity + 1,
      };
      updateItems[existingItemCartIndex] = updateItem;
    } else {
      updateItems.push({ ...action.item, quantity: 1 });
    }
    return { ...state, items: updateItems };
  }
  if (action.type == "REMOVE_ITEM") {
    const existingItemCartIndex = state.items.findIndex(
      (item) => item.id === action.id
    );
    const updateItems = [...state.items];
    const existingItem = state.items[existingItemCartIndex];
    if (existingItem == 1) {
      updateItems.splice(existingItemCartIndex, 1);
    } else {
      const updateItem = {
        ...existingItem,
        quantity: existingItem.quantity - 1,
      };
      updateItems[existingItemCartIndex] = updateItem;
    }
    return { ...state, items: updateItems };
  }

  if (action.type == "CLEAR_CART") {
    return { ...state, items: [] };
  }

  return state;
}
export function CartContexProvider({ children }) {
  const [cart, dispatch] = useReducer(cartReducer, { items: [] });

  function addItem(item) {
    dispatch({ type: "ADD_ITEM", item });
  }
  function removeItem(id) {
    dispatch({ type: "REMOVE_ITEM", id });
  }
  function clearCart() {
    dispatch({ type: "CLEAR_CART" });
  }
  const cartContex = {
    items: cart.items,
    addItem,
    removeItem,
    clearCart,
  };

  return (
    <CartContex.Provider value={cartContex}>{children}</CartContex.Provider>
  );
}
export default CartContex;
