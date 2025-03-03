import supabase from "../supabaseClient";

export const fetchTemplatesWithExercises = async (user_id) => {
  try {
    // Fetch all templates for the user
    const { data: templates, error: templateError } = await supabase
      .from("templates")
      .select("*")
      .eq("user_id", user_id);

    if (templateError) {
      console.error("Error fetching templates:", templateError.message);
      return { success: false, message: templateError.message };
    }

    // Extract template IDs
    const template_ids = templates.map((t) => t.template_id);
    if (template_ids.length === 0) return [];

    // Fetch exercises with details
    const { data: templateExercises, error: exercisesError } = await supabase
      .from("template_exercises")
      .select("*, exercises(*)")
      .in("template_id", template_ids);

    if (exercisesError) {
      console.error(
        "Error fetching template exercises:",
        exercisesError.message
      );
      return { success: false, message: exercisesError.message };
    }

    // Combine templates with their exercises
    const templatesWithExercises = templates.map((template) => ({
      ...template,
      exercises: templateExercises
        .filter((ex) => ex.template_id === template.template_id)
        .map((ex) => ({
          ...ex,
          ...ex.exercises,
        })),
    }));

    console.log(templatesWithExercises);
    return {
      success: true,
      message: "Sucessfully fetched exercises!",
      data: templatesWithExercises,
    };
  } catch (error) {
    console.error("Error fetching templates with exercises:", error);
    return { success: false, message: error.message };
  }
};

export const addTemplateExercises = async (newTemplate) => {
  try {
    const {
      template_id,
      exercise_id,
      sets,
      reps,
      order_index,
      rest_time,
      weight,
    } = newTemplate;

    const { error } = await supabase.from("template_exercises").insert({
      template_id,
      exercise_id,
      sets,
      reps,
      order_index,
      rest_time,
      weight,
    });

    if (error) {
      console.error("Error adding exercise to template:", error.message);
      return { success: false, message: error.message };
    }

    console.log("Exercise added to template successfully!");
    return {
      success: true,
      message: "Exercise added to template successfully.",
    };
  } catch (error) {
    console.error("Error adding exercise to template:", error.message);
    return { success: false, message: error.message };
  }
};

export const addTemplateExerciseSets = async (newSet) => {
  try {
    const { template_id, exercise_id, set_index, reps, weight } = newSet;

    const { error } = await supabase.from("template_exercise_sets").insert({
      template_id,
      exercise_id,
      set_index,
      reps,
      weight,
    });

    if (error) {
      console.error("Error adding set to template:", error.message);
      return { success: false, message: error.message };
    }

    console.log("Set added to template successfully!");
    return {
      success: true,
      message: "Set added to template successfully.",
    };
  } catch (error) {
    console.error("Error adding Set to template:", error.message);
    return { success: false, message: error.message };
  }
};

export const editTemplateExercises = async (prevTemplate, newTemplate) => {
  try {
    // Compare previous template with new template
    const updatedFields = {};

    for (let key in prevTemplate) {
      if (
        Object.prototype.hasOwnProperty.call(prevTemplate, key) &&
        prevTemplate[key] !== newTemplate[key]
      ) {
        updatedFields[key] = newTemplate[key];
      }
    }

    // If there are no changes, return success
    if (Object.keys(updatedFields).length === 0) {
      console.log("No changes detected in the template.");
      return { success: true, message: "No changes detected." };
    }

    // Update the template in Supabase
    const { error } = await supabase
      .from("template_exercises")
      .update(updatedFields)
      .eq("template_id", prevTemplate.template_id)
      .eq("exercise_id", prevTemplate.exercise_id);

    if (error) {
      console.error(`Error updating template:`, error.message);
      return { success: false, message: error.message };
    }

    console.log("Template updated successfully!");
    return { success: true, message: "Template updated successfully." };
  } catch (error) {
    console.error("Unexpected error updating template:", error.message);
    return { success: false, message: error.message };
  }
};

export const deleteTemplateExercises = async (template_id, exercise_id) => {
  try {
    const { error } = await supabase
      .from("template_exercises")
      .delete()
      .eq("template_id", template_id)
      .eq("exercise_id", exercise_id);

    if (error) {
      console.error(`Error deleting template exercise:`, error.message);
      return { success: false, message: error.message };
    }

    console.log("Template exercise deleted successfully!");
    return {
      success: true,
      message: "Template exercise deleted successfully.",
    };
  } catch (error) {
    console.error(
      "Unexpected error deleting template exercise:",
      error.message
    );
    return { success: false, message: error.message };
  }
};
