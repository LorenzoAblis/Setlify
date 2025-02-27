import { useRef, useState } from "react";
import { useAuth } from "../contexts/authContext";
import { addItem } from "../controllers/itemData";
import Navbar from "../components/Navbar";
import {
  Container,
  Heading,
  Input,
  Text,
  Button,
  createListCollection,
} from "@chakra-ui/react";
import {
  DialogActionTrigger,
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from "../components/ui/dialog";
import {
  SelectContent,
  SelectItem,
  SelectRoot,
  SelectTrigger,
  SelectValueText,
} from "../components/ui/select";
import { Field } from "../components/ui/field";

const Exercises = () => {
  const contentRef = useRef(null);
  const { user } = useAuth();
  const [exercise, setExercise] = useState({
    name: null,
    muscleGroup: null,
    category: null,
  });
  const muscleGroups = createListCollection({
    items: [
      { label: "Arms", value: "Arms" },
      { label: "Chest", value: "Chest" },
      { label: "Legs", value: "Legs" },
      { label: "Back", value: "Back" },
      { label: "Shoulders", value: "Shoulders" },
      { label: "Core", value: "Core" },
      { label: "Cardio", value: "Cardio" },
      { label: "Full Body", value: "Full Body" },
    ],
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setExercise((prevExercise) => ({
      ...prevExercise,
      [name]: value,
    }));
  };

  const handleSelectChange = (value, name) => {
    setExercise((prevExercise) => ({
      ...prevExercise,
      [name]: value.value[0],
    }));
  };

  const addExercise = async () => {
    // try {
    //   await addItem(user.id, exercise);
    // } catch (error) {
    //   console.error(error);
    //   alert("Failed to add exercise. Please try again.");
    // }
    console.log(exercise);
  };

  return (
    <>
      <Container>
        <Heading
          as={"h1"}
          fontSize={{ base: "2rem" }}
          fontWeight={{ base: "700" }}
          marginTop={{ base: "7vh" }}
        >
          Your{" "}
          <Text as={"span"} color={{ base: "var(--secondary-color)" }}>
            Exercises
          </Text>
        </Heading>
        <Input
          placeholder="Search"
          marginTop={{ base: "1rem" }}
          fontSize={{ base: "1rem" }}
          borderRadius={{ base: "0.75rem" }}
          border="1.5px solid #E5E5E5"
          fontWeight={500}
        />
        <DialogRoot>
          <DialogTrigger asChild>
            <Button
              marginTop={{ base: "1rem" }}
              width={{ base: "100%" }}
              backgroundColor={{ base: "var(--primary-color)" }}
              onClick={() =>
                setExercise({
                  name: undefined,
                  muscleGroup: undefined,
                  category: undefined,
                })
              }
            >
              Create
            </Button>
          </DialogTrigger>
          <DialogContent width={"90%"} ref={contentRef}>
            <DialogHeader>
              <DialogTitle fontSize={{ base: "1.5rem" }}>
                <Text as={"span"} color={{ base: "var(--secondary-color)" }}>
                  Create
                </Text>{" "}
                Exercise
              </DialogTitle>
            </DialogHeader>
            <DialogCloseTrigger />
            <DialogBody
              display={{ base: "flex" }}
              flexDirection={{ base: "column" }}
              gap={4}
            >
              <Field
                invalid={exercise.name === "" && exercise.name !== undefined}
                errorText="Name is required"
              >
                <Input
                  placeholder="Name"
                  fontWeight={{ base: "600" }}
                  onChange={handleInputChange}
                  name="name"
                  value={exercise.name}
                />
              </Field>
              <Field
                invalid={
                  exercise.muscleGroup === "" &&
                  exercise.muscleGroup !== undefined
                }
                errorText="Muscle Group is required"
              >
                <SelectRoot
                  collection={muscleGroups}
                  size="md"
                  onValueChange={(value) =>
                    handleSelectChange(value, "muscleGroup")
                  }
                >
                  <SelectTrigger>
                    <SelectValueText
                      placeholder="Muscle Group"
                      fontWeight={"600"}
                    />
                  </SelectTrigger>
                  <SelectContent portalRef={contentRef}>
                    {muscleGroups.items.map((item) => (
                      <SelectItem item={item} key={item.value}>
                        {item.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </SelectRoot>
              </Field>
              <Field
                invalid={
                  exercise.category === "" && exercise.category !== undefined
                }
                errorText="Category is required"
              >
                <SelectRoot
                  collection={muscleGroups}
                  size="md"
                  onValueChange={(value) =>
                    handleSelectChange(value, "category")
                  }
                >
                  <SelectTrigger>
                    <SelectValueText
                      placeholder="Category"
                      fontWeight={"600"}
                    />
                  </SelectTrigger>
                  <SelectContent portalRef={contentRef}>
                    {muscleGroups.items.map((item) => (
                      <SelectItem item={item} key={item.value}>
                        {item.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </SelectRoot>
              </Field>
            </DialogBody>
            <DialogFooter>
              <DialogActionTrigger asChild>
                <Button
                  backgroundColor={"var(--primary-color)"}
                  onClick={addExercise}
                >
                  Save
                </Button>
              </DialogActionTrigger>
            </DialogFooter>
          </DialogContent>
        </DialogRoot>
      </Container>
      <Navbar />
    </>
  );
};

export default Exercises;
