import { useRef, useState, useEffect } from "react";
import { useAuth } from "../../contexts/authContext";
import { addItem, fetchItems } from "../../controllers/itemData";

import toast from "react-hot-toast";
import Navbar from "../../components/Navbar";
import {
  Container,
  Heading,
  Input,
  Text,
  Button,
  createListCollection,
} from "@chakra-ui/react";
import {
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from "../../components/ui/dialog";
import {
  SelectContent,
  SelectItem,
  SelectRoot,
  SelectTrigger,
  SelectValueText,
} from "../../components/ui/select";
import { InputGroup } from "../../components/ui/input-group";
import { Field } from "../../components/ui/field";
import { IoSearch } from "react-icons/io5";

const Exercises = () => {
  const contentRef = useRef(null);
  const { user } = useAuth();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [userExercises, setUserExercises] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const [exercise, setExercise] = useState({
    name: "",
    muscle_group: "",
    category: "",
  });
  const [validations, setValidations] = useState({
    name: true,
    category: true,
    muscle_group: true,
  });

  const muscle_groups = createListCollection({
    items: [
      { label: "Arms", value: "Arms" },
      { label: "Chest", value: "Chest" },
      { label: "Legs", value: "Legs" },
      { label: "Back", value: "Back" },
      { label: "Shoulders", value: "Shoulders" },
      { label: "Core", value: "Core" },
      { label: "Full Body", value: "Full Body" },
    ],
  });
  const categories = createListCollection({
    items: [
      { label: "Barbell", value: "Barbell" },
      { label: "Dumbbell", value: "Dumbbell" },
      { label: "Weighted Bodyweight", value: "Weighted Bodyweight" },
      { label: "Assisted Bodyweight", value: "Assisted Bodyweight" },
      { label: "Machine", value: "Machine" },
      { label: "Time", value: "Time" },
      { label: "Cardio", value: "Cardio" },
    ],
  });

  const fetchExercises = async () => {
    try {
      const res = await fetchItems(user.id, "exercises");
      if (res.success) {
        setUserExercises(res.data);
        console.log(categories);
      } else {
        toast.error(`Failed to fetch exercises: ${res.message}`);
      }
    } catch (error) {
      toast.error(`Failed to fetch exercises: ${error.message}`);
    }
  };

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
    const isValid = {
      name: exercise.name !== "",
      category: exercise.category !== "",
      muscle_group: exercise.muscle_group !== "",
    };

    setValidations(isValid);

    if (Object.values(isValid).includes(false)) {
      return;
    }

    try {
      const res = await addItem(user.id, exercise, "exercises");
      if (res.success) {
        setExercise({
          name: "",
          muscle_group: "",
          category: "",
        });
        setIsDialogOpen(false);
        fetchExercises();
        toast.success("Exercise added successfully!");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to add exercise. Please try again.");
    }
  };

  const filteredExercises = userExercises.filter((exercise) =>
    exercise.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (contentRef.current && !contentRef.current.contains(event.target)) {
        setIsDialogOpen(false);
      }
    };

    if (isDialogOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isDialogOpen]);

  useEffect(() => {
    if (user?.id) {
      fetchExercises();
    }
  }, [user?.id]);

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
        <InputGroup
          startElement={<IoSearch />}
          marginTop={{ base: "1rem" }}
          width={{ base: "100%" }}
        >
          <Input
            placeholder="Search"
            fontWeight={500}
            borderRadius={{ base: "1rem" }}
            fontSize={{ base: "1rem" }}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </InputGroup>
        <DialogRoot open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button
              marginTop={{ base: "1rem" }}
              width={{ base: "100%" }}
              backgroundColor={{ base: "var(--primary-color)" }}
              onClick={() =>
                setExercise({
                  name: "",
                  muscle_group: "",
                  category: "",
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
              <Field invalid={!validations.name} errorText="Name is required">
                <Input
                  placeholder="Name"
                  fontWeight={{ base: "600" }}
                  onChange={handleInputChange}
                  name="name"
                  value={exercise.name}
                />
              </Field>
              <Field
                invalid={!validations.muscle_group}
                errorText="Muscle Group is required"
              >
                <SelectRoot
                  collection={muscle_groups}
                  size="md"
                  onValueChange={(value) =>
                    handleSelectChange(value, "muscle_group")
                  }
                >
                  <SelectTrigger>
                    <SelectValueText
                      placeholder="Muscle Group"
                      fontWeight={"600"}
                    />
                  </SelectTrigger>
                  <SelectContent portalRef={contentRef}>
                    {muscle_groups.items.map((item) => (
                      <SelectItem item={item} key={item.value}>
                        {item.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </SelectRoot>
              </Field>
              <Field
                invalid={!validations.category}
                errorText="Category is required"
              >
                <SelectRoot
                  collection={categories}
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
                    {categories.items.map((item) => (
                      <SelectItem item={item} key={item.value}>
                        {item.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </SelectRoot>
              </Field>
            </DialogBody>
            <DialogFooter>
              <Button
                backgroundColor={"var(--primary-color)"}
                onClick={addExercise}
              >
                Save
              </Button>
            </DialogFooter>
          </DialogContent>
        </DialogRoot>
        {filteredExercises
          .sort((a, b) => a.name.localeCompare(b.name))
          .map((exercise) => (
            <Button
              key={exercise.id}
              variant={"outline"}
              width={{ base: "100%" }}
              padding={{ base: "1.5rem" }}
              borderRadius={{ base: "0.75rem" }}
              display={"flex"}
              justifyContent={"space-between"}
              marginTop={{ base: "1rem" }}
            >
              <Text fontWeight={"600"} fontSize={"1rem"}>
                {exercise.name}
              </Text>
              <Text color={"var(--secondary-color)"}>
                {exercise.muscle_group}
              </Text>
            </Button>
          ))}
      </Container>
      <Navbar />
    </>
  );
};

export default Exercises;
