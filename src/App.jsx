import { signUp, login } from "./controllers/auth";
import { addExercise } from "./controllers/exercises";
import { useAuth } from "./contexts/authContext";
function App() {
  const { user, signOut } = useAuth();
  return (
    <>
      {user ? <h2>Welcome, {user.email}!</h2> : <h2>Welcome, Guest!</h2>}
      <button
        onClick={() => addExercise(user.id, "curls", "chest", "bodyweight")}
      >
        Sign Up
      </button>
      <button onClick={signOut}>Logout</button>
    </>
  );
}

export default App;
