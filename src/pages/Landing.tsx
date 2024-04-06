import {
  Button,
  HStack,
  VStack,
  Text,
  Box,
  Card,
  CardBody,
  Heading,
} from "@chakra-ui/react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "../styles/Landing.module.css";

const Landing = () => {
  useEffect(() => {}, []);
  const components = [
    "functional components",
    "state and props",
    "lifecycle methods",
    "event handlers",
    "Lists and keys",
    "conditional rendering",
    "zustand state management",
    "chakra UI",
  ];

  const renderComponents = () =>
    components.map((element, index) => (
      <li key={index}>
        {index + 1 + "."} {element}
      </li>
    ));
  return (
    <>
      <div className={styles.wrapper}>
        <Card w={"390px"}>
          <CardBody>
            <VStack>
              <Heading>React project</Heading>
              <Text>
                In this React project, I explored fundamentals like JSX,
                functional components, and state management with Zustand,
                enhancing UI development and state sharing. This hands-on
                experience deepened my React skills, demonstrating the
                practicality of Zustand in real-world applications. My passion
                for React drives my commitment to continually learn and apply
                its concepts efficiently.
              </Text>
              <Text>I have learnt the following concepts so far:</Text>
              <Box w={"100%"} className={styles.lists}>
                {renderComponents()}
              </Box>
              <Link to="products">
                <Button colorScheme="blue">Lets check it out!!</Button>
              </Link>
            </VStack>
          </CardBody>
        </Card>
      </div>
    </>
  );
};

export default Landing;
