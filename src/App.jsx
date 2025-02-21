import { signUp, login } from "./controllers/auth";
import { useAuth } from "./contexts/authContext";
function App() {
  const { user, signOut } = useAuth();
  return (
    <>
      {user ? <h2>Welcome, {user.email}!</h2> : <h2>Welcome, Guest!</h2>}
      <button onClick={() => login("lorenzo.ablis123@gmail.com", "password")}>
        Sign Up
      </button>
      <button onClick={signOut}>Logout</button>
    </>
  );
}

export default App;
