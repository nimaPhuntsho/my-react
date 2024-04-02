import {
  Box,
  Button,
  Card,
  CardBody,
  Flex,
  Heading,
  HStack,
  Text,
  VStack,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { questions } from "../data/questions";
import { QuizAnswer, useQuiz } from "../stores/quiz";
import styles from "../styles/Quiz.module.css";

export interface UserAnswerStore {
  items: QuizAnswer[];
}

export interface Question {
  difficulty: string;
  category: string;
  question: string;
  correctAnswer: string;
  options: string[];
  questionType: string;
  id: number;
}

const Question = () => {
  //local state
  const [selectedAnswer, setSelectedAnswer] = useState<string>("");
  const [quizQuestions, setQuizQuestions] = useState<QuizAnswer[]>([]);

  //global state
  const quizStore = useQuiz().items;
  const addQuizAnswer = useQuiz().add;

  useEffect(() => {
    const q = newQuestions();
    setQuizQuestions(q);
  }, []);

  const newQuestions = (): QuizAnswer[] => {
    return questions.map((element) => {
      const temp: QuizAnswer = {
        ...element,
        hasAnswered: false,
        userAnswer: "",
      };
      return temp;
    });
  };

  const getUserAnswer = (answer: string, question: QuizAnswer) => {
    setSelectedAnswer(answer);
    const current = quizQuestions.map((element) => {
      if (element.id === question.id) {
        return { ...element, hasAnswered: true, userAnswer: answer };
      }
      return element;
    });
    setQuizQuestions(current);
  };

  const checkAnswer = (userAnswer: string, correctAnswer: string): number => {
    let result = 0;
    if (
      userAnswer.trim().toLowerCase() === correctAnswer.trim().toLowerCase()
    ) {
      result = 1;
    } else result = 0;
    return result;
  };

  const submit = (question: QuizAnswer) => {
    addQuizAnswer(question);
    const current = quizQuestions.map((element) => {
      if (element.id === question.id) {
        return { ...element, hasAnswered: false };
      }
      return element;
    });
    setQuizQuestions(current);
  };

  const renderQuestions = quizQuestions.map((element, index) => (
    <Card key={element.id} width={"500px"}>
      <CardBody>
        <HStack alignItems={"start"}>
          <Heading padding={0} margin={0} size={"md"}>
            {element.id}
          </Heading>
          <Text fontWeight={500} padding={0} margin={0}>
            {element.question}
          </Text>
        </HStack>
        <Box display={element.hasAnswered}>
          {element.options.map((answer, index) => (
            <Text
              border={".1px solid"}
              padding="1rem"
              borderRadius={"4px"}
              key={index}
              _hover={{ border: "1px solid red", cursor: "pointer" }}
              onClick={() => getUserAnswer(answer, element)}
              backgroundColor={
                selectedAnswer === answer.trim() &&
                element.userAnswer === answer.trim()
                  ? "rgb(246, 148, 148)"
                  : "transparent"
              }
            >
              {answer}
            </Text>
          ))}
        </Box>
        <HStack>
          <Button
            isDisabled={!element.hasAnswered}
            onClick={() => submit(element)}
            colorScheme={"twitter"}
          >
            Submit
          </Button>
        </HStack>
      </CardBody>
    </Card>
  ));
  return (
    <>
      <Flex direction={"column"}>
        <Box className={styles["question-wrapper"]}>
          <Heading size={"lg"}>Quiz</Heading>
          {renderQuestions}
        </Box>
      </Flex>

      {/* <div className="quiz">
      </div> */}

      <div>
        {quizStore.map((element) => (
          <Box border={"1px solid"} key={element.id}>
            <li> U- {element.userAnswer} </li>
            <li> Correct - {element.correctAnswer} </li>
            <li> {element.question} </li>
          </Box>
        ))}
      </div>
    </>
  );
};

export default Question;
