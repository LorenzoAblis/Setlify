import { useAuth } from "../contexts/authContext";
import { Container, Heading, Box, Text, Button } from "@chakra-ui/react";
import Navbar from "../components/Navbar";

const Templates = () => {
  const { user } = useAuth();
  return (
    <>
      <Container>
        <Heading
          as={"h1"}
          fontSize={{ base: "2rem" }}
          fontWeight={{ base: "700" }}
          marginTop={{ base: "7vh" }}
        >
          Welcome,{" "}
          <Text as={"span"} color={{ base: "var(--secondary-color)" }}>
            {" "}
            {user.user_metadata.display_name}!
          </Text>
        </Heading>
        <Box marginTop={{ base: "3vh" }}>
          <Heading as={"h2"} fontSize={{ base: "1.5rem" }}>
            Templates
          </Heading>
          <Button
            marginTop={{ base: "1rem" }}
            backgroundColor={{ base: "var(--primary-color)" }}
          >
            Create Template
          </Button>
        </Box>
      </Container>
      <Navbar />
    </>
  );
};

export default Templates;
