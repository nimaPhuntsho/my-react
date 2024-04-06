import {
  Card,
  CardBody,
  Divider,
  Heading,
  HStack,
  VStack,
} from "@chakra-ui/react";
import { async } from "@firebase/util";
import { useEffect, useState } from "react";
import { Product } from "../components/Products";
import supabase from "../config/supabaseClient";

interface ProductOrders {
  quantity: number;
  products: Product;
}

export interface Order {
  order_id: number;
  product_orders: ProductOrders[];
  order_date: string;
  status: string;
}

const Dashboard = () => {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const { data, error } = await supabase
        .from("orders")
        .select("*, product_orders(product_id, quantity, products(*))");
      if (data) {
        const order: Order[] = data;
        setOrders(order);
      }
    };
    fetchProducts();
  }, []);

  const getTotal = (order: Order): number => {
    return order.product_orders.reduce((initial, element) => {
      return initial + element.products.price * element.quantity;
    }, 0);
  };

  const renderOrders = () => {
    return orders.map((element) => (
      <Card w={"90%"} key={element.order_id}>
        <CardBody>
          <HStack justifyContent={"space-between"}>
            <Heading size={"md"}> Order {element.order_id}</Heading>
            <Heading size={"md"}>
              {" "}
              {new Date(element.order_date).toDateString()}
            </Heading>
          </HStack>
          <VStack>
            {element.product_orders.map((item, index) => (
              <HStack
                w={"100%"}
                justifyContent={"space-between"}
                key={item.products.id}
                className="product-list"
              >
                <li>
                  {index + 1}. {item.products.brand}{" "}
                </li>
                <li>$ {item.products.price} </li>
                <li> {item.quantity} </li>
                <li> $ {item.quantity * item.products.price} </li>
              </HStack>
            ))}
          </VStack>
          <HStack>
            <Heading size={"md"}> Total - </Heading>
            <Heading size={"md"}> $ {getTotal(element)} </Heading>
          </HStack>
        </CardBody>
      </Card>
    ));
  };
  return (
    <>
      <VStack>{renderOrders()}</VStack>
    </>
  );
};

export default Dashboard;
