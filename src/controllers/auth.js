import supabase from "../supabaseClient";

export const signUp = async (email, password, username) => {
  try {
    // Supabase auth create user
    const { data, signupError } = await supabase.auth.signUp({
      email: email,
      password: password,
      options: {
        data: { display_name: username },
      },
    });

    if (signupError) {
      console.error("Error signing user up:", signupError.message);
      return { success: false, message: signupError.message };
    }

    // Insert user into sql users table
    const userId = data.user.id;

    const { error: insertError } = await supabase
      .from("users")
      .insert({ id: userId, username: username, email: email });

    if (insertError) {
      console.error("Error signing user up:", insertError.message);
      return { success: false, message: insertError.message };
    }

    console.log("User successfully signed up and added to the database!");
    return data.user;
  } catch (err) {
    console.error("Error signing user up:", err);
    return { success: false, message: err };
  }
};

export const login = async (email, password) => {
  try {
    // Supabase auth login user
    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) {
      console.error("Error logging user in:", error.message);
      return { success: false, message: error.message };
    }

    console.log("User successfully logged in!");
    return { success: true, message: "User successfully logged in!" };
  } catch (err) {
    console.error("Error logging user in:", err.message);
    return { success: false, message: err.message };
  }
};
