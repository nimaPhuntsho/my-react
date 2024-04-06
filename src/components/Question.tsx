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
import styles from "../styles/Question.module.css";

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
  const resetQuizStore = useQuiz().reset;

  useEffect(() => {
    const q = newQuestions();
    const reshuffledOptions: QuizAnswer[] = q.map((element) => ({
      ...element,
      options: reshuffleOptions(element.options),
    }));
    setQuizQuestions(reshuffledOptions);
  }, []);

  const newQuestions = (): QuizAnswer[] => {
    return questions.map((element) => {
      const temp: QuizAnswer = {
        ...element,
        answerSelected: false,
        userAnswer: "",
        hasSubmitted: false,
        point: 0,
      };
      return temp;
    });
  };

  const getUserAnswer = (answer: string, question: QuizAnswer) => {
    setSelectedAnswer(answer);
    const current = quizQuestions.map((element) => {
      if (element.id === question.id) {
        return {
          ...element,
          answerSelected: true,
          userAnswer: answer,
        };
      }
      return element;
    });
    setQuizQuestions(current);
  };

  const reshuffleOptions = (options: string[]): string[] => {
    const temp: string[] = [];
    const indexes: number[] = generateRandomIndexs(options.length);
    indexes.forEach((randomIndex) => {
      temp.push(options[randomIndex]);
    });
    return temp;
  };

  const generateRandomIndexs = (size: number): number[] => {
    let temp: number[] = [];
    while (temp.length < size) {
      let randomIndex = Math.floor(Math.random() * size);
      if (!temp.includes(randomIndex)) {
        temp.push(randomIndex);
      }
    }

    return temp;
  };

  const checkAnswer = (userAnswer: string, correctAnswer: string): boolean => {
    let result = false;
    if (
      userAnswer.trim().toLowerCase() === correctAnswer.trim().toLowerCase()
    ) {
      result = true;
    } else result = false;
    return result;
  };

  const resetQuiz = () => {
    const q = newQuestions();
    setQuizQuestions(q);
  };

  const submit = (question: QuizAnswer) => {
    addQuizAnswer(question);
    const current = quizQuestions.map((element) => {
      if (element.id === question.id) {
        return { ...element, hasSubmitted: true };
      }
      return element;
    });
    setQuizQuestions(current);
  };

  const calculateScore = (): number => {
    let score: number = 0;
    quizStore.forEach((element) => {
      if (element.correctAnswer === element.userAnswer) {
        score++;
      }
    });
    return score;
  };

  const renderQuestions = quizQuestions.map((element) => (
    <Card padding={"1rem"} key={element.id}>
      <CardBody>
        <HStack alignItems={"start"}>
          <Heading padding={0} margin={0} size={"md"}>
            {element.id}
          </Heading>
          <Text fontWeight={500} padding={0} margin={0}>
            {element.question}
          </Text>
        </HStack>
        <Box>
          {element.options.map((answer, index) => (
            <Text
              border={".1px solid"}
              padding="1rem"
              borderRadius={"4px"}
              key={index}
              _hover={{ bg: "lightBlue", cursor: "pointer" }}
              onClick={() => getUserAnswer(answer, element)}
              backgroundColor={
                selectedAnswer === answer.trim() &&
                element.userAnswer === answer.trim()
                  ? "lightBlue"
                  : "transparent"
              }
              pointerEvents={element.hasSubmitted ? "none" : "auto"}
            >
              {answer}
            </Text>
          ))}
        </Box>
        <HStack alignItems={"center"}>
          {element.hasSubmitted ? (
            <Button
              isDisabled={element.answerSelected}
              onClick={() => submit(element)}
              colorScheme={"twitter"}
            >
              Done
            </Button>
          ) : (
            <Button
              isDisabled={!element.answerSelected}
              onClick={() => submit(element)}
              colorScheme={"twitter"}
            >
              Submit
            </Button>
          )}
          {element.hasSubmitted ? (
            <div>
              {checkAnswer(selectedAnswer, element.correctAnswer) ? (
                <Text fontWeight={600} padding={"0"} margin={0}>
                  Correct
                </Text>
              ) : (
                <Text color={"red"} fontWeight={600} padding={"0"} margin={0}>
                  Incorrect
                </Text>
              )}
            </div>
          ) : (
            ""
          )}
        </HStack>
      </CardBody>
    </Card>
  ));
  return (
    <>
      <Flex justifyContent={"center"}>
        <Box className={styles["question-wrapper"]}>
          <Flex
            padding={"1rem"}
            border={".4px solid"}
            borderRadius="4px"
            gap={"1.5rem"}
            alignItems={"center"}
            justifyContent="space-evenly"
            className={styles["score-board"]}
          >
            <Flex
              flex={1}
              alignItems="center"
              justifyContent={"flex-start"}
              gap={"1rem"}
              w={"100%"}
            >
              <Text flex={1} margin={0}>
                Questions answered
              </Text>
              <Text fontWeight={600} margin={0} flex={1}>
                {quizStore.length}
              </Text>
            </Flex>
            <Flex w={"100%"} alignItems="center" flex={1} gap={"1rem"}>
              <Text flex={1} margin={0}>
                Remaining questions
              </Text>
              <Text fontWeight={600} margin={0} flex={1}>
                {quizQuestions.length - quizStore.length}
              </Text>
            </Flex>
            <Text w={"100%"} flex={1} margin={0}>
              score : {calculateScore()} / {quizStore.length}
            </Text>
            <Button
              onClick={() => {
                resetQuizStore();
                resetQuiz();
              }}
            >
              Reset
            </Button>
          </Flex>
          <Box>{renderQuestions}</Box>
        </Box>
      </Flex>
    </>
  );
};

export default Question;
