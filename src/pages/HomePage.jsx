import { useAuth } from "../contexts/authContext";

const HomePage = () => {
  const { signOut } = useAuth();
  return (
    <>
      <h1>Home Page - Protected</h1>
      <button onClick={signOut}>Logout</button>
    </>
  );
};

export default HomePage;
