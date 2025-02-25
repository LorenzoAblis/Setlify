import { useAuth } from "../contexts/authContext";
import { Container, Heading, Box, Text } from "@chakra-ui/react";
import Navbar from "../components/Navbar";

const Dashboard = () => {
  const { signOut, user } = useAuth();
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
        </Box>
      </Container>
      <Navbar />
    </>
  );
};

export default Dashboard;
