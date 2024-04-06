import {
  Button,
  Card,
  CardBody,
  Flex,
  Heading,
  Image,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import supabase from "../config/supabaseClient";
import { CartItem, useCartStore, useCountStore } from "../stores/store";
import styles from "../styles/Products.module.css";

export interface Product {
  brand: string;
  category: string;
  description: string;
  discountPercentage: number;
  id: number;
  price: number;
  images: string[];
  rating: number;
  stock: number;
  thumbnail: string;
  title: string;
}

interface Cart {
  price: number;
  title: string;
  brand: string;
}

interface User {
  name: string;
  isAdmin: boolean;
}

interface BearState {
  bears: number;
  increase: (by: number) => void;
}

const Products = () => {
  const URL = "https://dummyjson.com/products";
  const [products, setProducts] = useState<CartItem[]>([]);
  //glbal state
  const cartStore = useCartStore((state) => state.items);
  const addItems = useCartStore((state) => state.add);
  const removeItem = useCartStore((state) => state.remove);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(URL);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const jsonResponse = await response.json();
        setProducts(jsonResponse.products);
      } catch (error) {
        console.error("Fetching data error:", error);
      }
    };

    // const fetchProducts = async () => {
    //   const response = await fetch(URL);
    //   const jsonData = await response.json();
    //   const product: Product[] = jsonData.products;
    //   console.log(product);

    //   const { data, error } = await supabase.from("Products").insert(product);

    //   console.log(data);
    // };

    fetchData();
    // fetchProducts();
  }, []);

  const isAdded = (product: CartItem) => {
    let result = false;
    cartStore.forEach((element) => {
      if (element.id === product.id) {
        result = true;
      }
    });

    return result;
  };

  // Now `products` is guaranteed to be an array, so .map() will be a function
  const listProducts = products.map((product) => (
    <Card key={product.id}>
      <CardBody
        display={"flex"}
        flexDirection="column"
        justifyContent={"space-between"}
      >
        <Image
          width={"100%"}
          className="card-img-top"
          src={product.thumbnail}
          alt=""
          borderRadius={"4px"}
        />
        <Stack>
          <div>
            <li className="card-title">{product.title}</li>
            <li> {product.description} </li>
          </div>
          <div className={styles["price-btn"]}>
            <li className={styles.price}>${product.price}</li>
            {!isAdded(product) ? (
              <Button
                colorScheme={"blue"}
                onClick={() => addItems({ ...product, quantity: 1 })}
              >
                Add to cart
              </Button>
            ) : (
              <Button
                onClick={() => {
                  isAdded(product);
                  removeItem(product);
                }}
                colorScheme="green"
              >
                Remove
              </Button>
            )}
          </div>
        </Stack>
      </CardBody>
    </Card>
  ));

  return (
    <div className={styles.main}>
      <div className={styles.wrapper}>
        <Flex direction={"column"}>
          <Heading size={"md"}>Our products</Heading>
          <Text>
            This React app is a streamlined cart management system. It fetches a
            variety of products from an external API, allowing users to easily
            add, remove, or adjust items in their cart. With its responsive
            design and real-time updates, the app offers a smooth and
            user-friendly shopping experience.
          </Text>
        </Flex>
        <div className={styles["product-wrapper"]}>{listProducts}</div>
      </div>
    </div>
  );
};

export default Products;
