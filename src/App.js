
import { useState } from "react";
import Cart from "./components/Cart/Cart";
import Header from "./components/Layout/Header";
import Meals from "./components/Meals/Meals";
import CartProvider from "./store/CartProvider";
function App() {
  const [cartShown, setCartShown] = useState(false);
  const showHandler = () => {
    setCartShown(true);
  };
  const hideHandler = () => {
    setCartShown(false);
  };
  return (
    <CartProvider>


      {cartShown && <Cart onClose={hideHandler} />}
      <Header onShow={showHandler} />
      <main>
        <Meals />
      </main>


    </CartProvider>


  );
}

export default App;
