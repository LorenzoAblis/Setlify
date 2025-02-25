import { useAuth } from "../contexts/authContext";
import { Text } from "@chakra-ui/react";

const HomePage = () => {
  const { signOut } = useAuth();
  return (
    <>
      <Text css={{ background: "var(--primary-color)", color: "white" }}>
        This is the text component
      </Text>
      <button onClick={signOut}>Logout</button>
    </>
  );
};

export default HomePage;
