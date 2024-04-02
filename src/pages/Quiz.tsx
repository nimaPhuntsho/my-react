import { Flex, Heading } from "@chakra-ui/react";
import Question from "../components/Question";
import styles from "../styles/Quiz.module.css";

const Quiz = () => {
  return (
    <div className={styles.main}>
      <Flex className={styles.wrapper} direction={"column"}>
        <Heading size={"lg"}>Quiz</Heading>
        <Question />
      </Flex>
    </div>
  );
};

export default Quiz;
