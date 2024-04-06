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
import { Navigate, redirect, useNavigate } from "react-router-dom";
import {
  Button,
  Card,
  CardBody,
  Heading,
  HStack,
  useToast,
  VStack,
} from "@chakra-ui/react";
import supabase from "../config/supabaseClient";
import { async } from "@firebase/util";

export interface Order {
  createdAt: string;
  items: CartItem[];
  order_id: number;
}

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
  const resetCart = useCartStore((state) => state.reset);
  const navigate = useNavigate();
  const toast = useToast();

  useEffect(() => {}, []);

  const calculatePrice = (pricePerUnit: number, quantity: number): number => {
    return pricePerUnit * quantity;
  };

  const calculateTotalPurchase = (items: CartItem[]): number => {
    return items.reduce((initial, element) => {
      return initial + calculatePrice(element.price, element.quantity);
    }, 0);
  };

  const addOrder = async (item: CartItem[]) => {
    try {
      const { data, error } = await supabase
        .from("orders")
        .insert({ status: "pending" })
        .single();

      const orderId: number = data.order_id;

      for (const element of item) {
        const { data, error } = await supabase.from("product_orders").insert({
          order_id: orderId,
          product_id: element.id,
          quantity: element.quantity,
        });
      }
      resetCart();
      navigate("/products");
      toast({
        title: "Yoo hoo!!",
        description: "Successfully placed the order, thank you",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const renderCartItems = cartItems.map((element, index) => (
    <div key={element.id}>
      <div className={styles["cart-list"]}>
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
    </div>
  ));

  const renderEmptyCart = () => (
    <>
      <p>Your cart is empty!!!</p>
    </>
  );

  const renderCart = () => (
    <Card>
      <CardBody>
        <Heading size={"md"}>Cart</Heading>
        <div className={styles["cart-list-wrapper"]}>{renderCartItems}</div>
        <div className={styles["total-wrapper"]}>
          <Heading size={"md"}>Total</Heading>
          <p className={styles["price"]}>
            ${calculateTotalPurchase(cartItems)}
          </p>
        </div>
        <Button colorScheme={"blue"} onClick={() => addOrder(cartItems)}>
          Check out
        </Button>
      </CardBody>
    </Card>
  );
  return (
    <div className={styles["wrapper"]}>
      {cartItems.length !== 0 ? renderCart() : renderEmptyCart()}
    </div>
  );
};

export default Cart;
