import supabase from "../supabaseClient";

export const fetchItems = async (user_id, tableName) => {
  try {
    const { data, error } = await supabase
      .from(tableName)
      .select("*")
      .eq("user_id", user_id);

    if (error) {
      console.error(`Error fetching from ${tableName}:`, error.message);
      return { success: false, message: error.message };
    }

    return { success: true, message: "Data fetched successfully", data };
  } catch (error) {
    console.error(
      `Unexpected error fetching from ${tableName}:`,
      error.message
    );
    return { success: false, message: error.message };
  }
};

export const addItem = async (user_id, item, tableName) => {
  try {
    const { data, error } = await supabase
      .from(tableName)
      .insert({ user_id, ...item });

    if (error) {
      console.error(`Error inserting into ${tableName}:`, error.message);
      return { success: false, message: error.message };
    }

    console.log(`Added successfully to ${tableName}!`);
    return { success: true };
  } catch (error) {
    console.error(
      `Unexpected error inserting into ${tableName}:`,
      error.message
    );
    return { success: false, message: error.message };
  }
};

export const updateItem = async (user_id, prevItem, newItem, tableName) => {
  try {
    const updatedFields = {};

    for (let key in prevItem) {
      if (
        Object.prototype.hasOwnProperty.call(prevItem, key) &&
        prevItem[key] !== newItem[key]
      ) {
        updatedFields[key] = newItem[key];
      }
    }

    if (Object.keys(updatedFields).length > 0) {
      const { error } = await supabase
        .from(tableName)
        .update(updatedFields)
        .eq("name", prevItem.name)
        .eq("user_id", user_id);

      if (error) {
        console.error(`Error updating ${tableName}:`, error.message);
        return { success: false, message: error.message };
      }
    }

    console.log(`Updated successfully in ${tableName}!`);
    return { success: true };
  } catch (error) {
    console.error(`Unexpected error updating ${tableName}:`, error.message);
    return { success: false, message: error.message };
  }
};

export const deleteItem = async (user_id, item_name, tableName) => {
  try {
    const { error } = await supabase
      .from(tableName)
      .delete()
      .eq("name", item_name)
      .eq("user_id", user_id);

    if (error) {
      console.error(`Error deleting from ${tableName}:`, error.message);
      return { success: false, message: error.message };
    }

    console.log(`Deleted successfully from ${tableName}!`);
    return { success: true };
  } catch (error) {
    console.error(
      `Unexpected error deleting from ${tableName}:`,
      error.message
    );
    return { success: false, message: error.message };
  }
};
