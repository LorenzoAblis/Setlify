import supabase from "../supabaseClient";

export const addExercise = async (user_id, name, muscle_group, category) => {
  try {
    const { error } = await supabase.from("exercises").insert({
      user_id: user_id,
      name: name,
      muscle_group: muscle_group,
      category: category,
    });

    if (error) throw error;
    console.log("Exercise added successfully!");
  } catch (error) {
    console.error(error);
    return null;
  }
};
