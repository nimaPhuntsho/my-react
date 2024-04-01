import {
  Box,
  Button,
  Card,
  CardBody,
  Heading,
  HStack,
  Text,
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
  const [userAnswer, setUserAnswer] = useState<QuizAnswer[]>([]);

  //global state
  const quizStore = useQuiz().items;
  const addQuizAnswer = useQuiz().add;

  const getUserAnswer = (answer: string, question: Question) => {
    setSelectedAnswer(answer);
    const temp: QuizAnswer = {
      ...question,
      hasAnswered: true,
      userAnswer: answer,
    };
    setUserAnswer([...userAnswer, temp]);
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

  const submit = (question: Question) => {
    const { correctAnswer } = question;
    const current: QuizAnswer = {
      ...question,
      userAnswer: selectedAnswer,
      //   point: checkAnswer(selectedAnswer, correctAnswer),
      hasAnswered: true,
    };
    addQuizAnswer(current);
    console.log(userAnswer);
  };

  const renderQuestions = questions.map((element, index) => (
    <Card key={element.id} width={"700px"}>
      <CardBody>
        <HStack alignItems={"center"}>
          <Heading padding={0} margin={0} size={"md"}>
            {element.id}
          </Heading>
          <Text padding={0} margin={0}>
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
              _hover={{ cursor: "pointer" }}
              onClick={() => getUserAnswer(answer, element)}
            >
              {answer}
            </Text>
          ))}
        </Box>
        <HStack>
          <Button onClick={() => submit(element)} colorScheme={"twitter"}>
            Submit
          </Button>
        </HStack>
      </CardBody>
    </Card>
  ));
  return (
    <>
      <Heading size={"lg"}>Quiz</Heading>
      <div className="quiz">
        <Box className={styles["question-wrapper"]}>{renderQuestions}</Box>
        <div>
          {quizStore.map((element) => (
            <Box border={"1px solid"} key={element.id}>
              <li> U- {element.userAnswer} </li>
              <li> Correct - {element.correctAnswer} </li>
              <li> {element.question} </li>
            </Box>
          ))}
        </div>
      </div>
    </>
  );
};

export default Question;
