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
          fontSize={"2rem"}
          fontWeight={"700"}
          marginTop={"7vh"}
        >
          Welcome,{" "}
          <Text as={"span"} color={"var(--secondary-color)"}>
            {" "}
            {user.user_metadata.display_name}!
          </Text>
        </Heading>
        <Box marginTop={"3vh"}>
          <Heading as={"h2"} fontSize={"1.5rem"}>
            Templates
          </Heading>
          <Button marginTop={"1rem"} backgroundColor={"var(--primary-color)"}>
            Create Template
          </Button>
        </Box>
      </Container>
      <Navbar />
    </>
  );
};

export default Templates;
