import { Link } from "react-router-dom";
import styles from "../styles/Header.module.css";

import {
  faCartShopping,
  faHouse,
  faCube,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useCartStore } from "../stores/store";
import { Box, Button, Heading, HStack } from "@chakra-ui/react";

const Header = () => {
  const cartSize = useCartStore((state) => state.items);
  const isEmpty = (): boolean => {
    let result = true;
    if (cartSize.length === 0) {
      result = true;
    } else result = false;
    return result;
  };

  return (
    <>
      <HStack className={styles["header-wrapper"]} padding={"1rem"}>
        <Link to="">
          <HStack color={"white"}>
            <FontAwesomeIcon icon={faCube} />
            <Heading
              className={styles["hide-brand"]}
              padding={0}
              margin={0}
              size={"md"}
            >
              stopshop
            </Heading>
          </HStack>
        </Link>

        <HStack color={"white"} gap="2rem" alignItems={"center"}>
          <Link to={"products"}>
            <Heading padding={0} margin={0} size={"md"}>
              Products
            </Heading>
          </Link>
          <Link to={"dashboard"}>
            <Heading padding={0} margin={0} size={"md"}>
              My orders
            </Heading>
          </Link>
          <Link to={"quiz"}>
            <Heading padding={0} margin={0} size={"md"}>
              Quiz
            </Heading>
          </Link>
          <Link to={"query"}>
            <Heading padding={0} margin={0} size={"md"}>
              React query
            </Heading>
          </Link>
          <Link to={"cart"}>
            <Button
              isDisabled={cartSize.length === 0}
              colorScheme={"messenger"}
            >
              <FontAwesomeIcon icon={faCartShopping} />
              <span className="badge badge-light"> {cartSize.length} </span>
            </Button>
          </Link>
        </HStack>
      </HStack>
    </>
  );
};

export default Header;
