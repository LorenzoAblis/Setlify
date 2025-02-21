import supabase from "../supabaseClient";

// MAKE THE UUID SAME AS AUTH

export const signUp = async (email, password, username) => {
  try {
    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
      options: {
        data: { display_name: username },
      },
    });

    if (error) throw error;
    if (!data.user) throw new Error("User creation failed");

    const userId = data.user.id;

    const { error: insertError } = await supabase
      .from("users")
      .insert({ id: userId, username: username, email: email });

    if (insertError) throw insertError;

    console.log("User successfully signed up and added to the database!");
    return data.user;
  } catch (err) {
    console.error("Signup error:", err);
    return null;
  }
};

export const login = async (email, password) => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) throw error;
    console.log("User successfully logged in!");
    return data;
  } catch (err) {
    console.error(err);
    return null;
    // TODO: Handle error
  }
};
