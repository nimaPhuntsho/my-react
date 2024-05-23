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
  useEffect(() => {
    async function sendIDScanRequest(
      apiKey: string,
      apiSecret: string,
      data: string,
      apiEndpoint: string
    ) {
      // Generate a nonce - a unique number for each request
      const nonce = Date.now().toString();

      // Generate a timestamp in milliseconds since the Unix Epoch
      const timestamp = Date.now().toString();

      // Create the JSON payload
      const jsonData = JSON.stringify(data);

      // Import the API secret as a CryptoKey for signing
      const encoder = new TextEncoder();
      const apiSecretKey = await crypto.subtle.importKey(
        "raw",
        encoder.encode(apiSecret),
        { name: "HMAC", hash: { name: "SHA-256" } },
        false,
        ["sign"]
      );

      // Create the signature using HMAC SHA-256
      const message = nonce + timestamp + jsonData;
      const signatureArrayBuffer = await crypto.subtle.sign(
        "HMAC",
        apiSecretKey,
        encoder.encode(message)
      );

      // Convert the ArrayBuffer to hex string
      const signature = Array.from(new Uint8Array(signatureArrayBuffer))
        .map((b) => b.toString(16).padStart(2, "0"))
        .join("");

      // Setup the request headers
      const headers = {
        "Content-Type": "application/json",
        Accept: "application/json",
      };

      // Setup the request body with the required parameters
      const body = JSON.stringify({
        key: apiKey,
        signature: signature,
        nonce: nonce,
        timestamp: timestamp,
        data: jsonData,
      });

      try {
        const response = await fetch(apiEndpoint, {
          method: "POST",
          headers: headers,
          body: body,
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        // You can adjust this part of the code depending on the response structure
        const result = await response.json();
        console.log("Success:", result);
        return result;
      } catch (error) {
        console.error("Error sending IDScan request:", error);
      }
    }

    const apiKey = "4sG8SIZWsmDGtZGY";
    const apiSecret = "l2cRUzk0gKdlUfcAfpuXkeaL4S6GVYie";
    const data = {
      name: "nima",
      email: "nimafunso@gmail.com",
    };
    const apiEndpoint = "https://api.cloudcheck.com.au/idscan/initiate/";
    sendIDScanRequest(apiKey, apiSecret, JSON.stringify(data), apiEndpoint);
  }, []);
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
