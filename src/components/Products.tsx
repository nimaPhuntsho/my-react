import { Button } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
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
        // Set products to the correct property from the response
        // Assuming the API response structure is like { products: [...] }
        setProducts(jsonResponse.products);
      } catch (error) {
        console.error("Fetching data error:", error);
      }
    };

    fetchData();
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
    <div className="card" key={product.id}>
      <img className="card-img-top" src={product.thumbnail} alt="" />
      <div className="card-body">
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
      </div>
    </div>
  ));

  return (
    <div>
      <div className={styles["product-wrapper"]}>{listProducts}</div>
    </div>
  );
};

export default Products;
