import { CartItem, useCartStore } from "../stores/store";
import styles from "../styles/Cart.module.css";
import { useEffect } from "react";
import {
  faXmark,
  faMinus,
  faPlus,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Navigate } from "react-router-dom";
import { Button, Heading } from "@chakra-ui/react";

const Cart = () => {
  const cartItems = useCartStore((state) => state.items);
  const removeItems = useCartStore((state) => state.remove);
  //   const cartItemQuantity = useCartStore((state) => state.quantity);
  const decrementItemQuantity = useCartStore(
    (state) => state.decrementQuantity
  );
  const incrementItemQuantity = useCartStore(
    (state) => state.incrementQuantity
  );

  useEffect(() => {
    if (cartItems.length < 1) {
      console.log("yes");
    }
  }, []);

  const calculatePrice = (pricePerUnit: number, quantity: number): number => {
    return pricePerUnit * quantity;
  };

  const calculateTotalPurchase = (items: CartItem[]): number => {
    return items.reduce((initial, element) => {
      return initial + calculatePrice(element.price, element.quantity);
    }, 0);
  };

  const renderCartItems = cartItems.map((element, index) => (
    <div className={styles["cart-list"]} key={element.id}>
      <li> {index + 1 + "."} </li>
      <li> {element.title} </li>
      <div className={styles["button-group"]}>
        <FontAwesomeIcon
          className={styles["hover-effect"]}
          onClick={() => {
            decrementItemQuantity(element);
          }}
          icon={faMinus}
        />
        <li>{element.quantity}</li>

        <FontAwesomeIcon
          className={styles["hover-effect"]}
          onClick={() => {
            incrementItemQuantity(element);
          }}
          icon={faPlus}
        />
      </div>
      <li className={styles["price"]}>
        $ {calculatePrice(element.price, element.quantity)}
      </li>

      <FontAwesomeIcon
        className={styles["hover-effect"]}
        onClick={() => removeItems(element)}
        icon={faTrashCan}
      />
    </div>
  ));

  const renderEmptyCart = () => (
    <>
      <p>Your cart is empty!!!</p>
    </>
  );

  const renderCart = () => (
    <div className={styles["card-wrapper"]}>
      <div className="card-body">
        <Heading size={"md"}>Cart</Heading>
        <div className={styles["card-list-wrapper"]}>{renderCartItems}</div>
      </div>
      <div className={styles["total-wrapper"]}>
        <Heading size={"md"}>Total</Heading>
        <p className={styles["price"]}>${calculateTotalPurchase(cartItems)}</p>
      </div>
      <Button colorScheme={"blue"}>Check out</Button>
    </div>
  );
  return (
    <div className={styles["wrapper"]}>
      {cartItems.length !== 0 ? renderCart() : renderEmptyCart()}
    </div>
  );
};

export default Cart;
