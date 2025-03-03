import React, { useState, useRef, useEffect } from "react";
import {
  DialogRoot,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogBody,
  DialogFooter,
  DialogCloseTrigger,
} from "../../components/ui/dialog";
import { Field } from "../../components/ui/field";
import {
  Input,
  Button,
  Stack,
  Box,
  Text,
  Table,
  IconButton,
} from "@chakra-ui/react";
import {
  MenuRoot,
  MenuTrigger,
  MenuContent,
  MenuItem,
} from "../../components/ui/menu";
import { fetchItems, addItem } from "../../controllers/itemData";
import supabase from "../../supabaseClient";
import toast from "react-hot-toast";
import { FaTrash } from "react-icons/fa6";

const AddTemplate = ({ isOpen, onClose, refreshTemplates, user }) => {
  const contentRef = useRef(null);
  const [templateName, setTemplateName] = useState("");
  const [templateExercises, setTemplateExercises] = useState([]);
  const [userExercises, setUserExercises] = useState([]);

  const fetchExercises = async () => {
    try {
      const res = await fetchItems(user.id, "exercises");
      if (res.success) {
        setUserExercises(res.data);
      } else {
        toast.error(`Failed to fetch exercises: ${res.message}`);
      }
    } catch (error) {
      toast.error(`Failed to fetch exercises: ${error.message}`);
    }
  };

  const exerciseSelect = (exercise) => {
    setTemplateExercises((prev) => {
      if (prev.some((e) => e.exercise_id === exercise.exercise_id)) {
        return prev;
      }
      return [
        ...prev,
        { name: exercise.name, exercise_id: exercise.exercise_id, sets: [] },
      ];
    });
  };

  const handleAddExerciseSet = (exercise) => {
    setTemplateExercises((prev) =>
      prev.map((e) =>
        e.exercise_id === exercise.exercise_id
          ? { ...e, sets: [...e.sets, { reps: 0, weight: 0 }] }
          : e
      )
    );
  };

  const handleSetChange = (exercise, index, field, value) => {
    setTemplateExercises((prev) =>
      prev.map((e) => {
        if (e.exercise_id === exercise.exercise_id) {
          const updatedSets = e.sets.map((set, idx) =>
            idx === index ? { ...set, [field]: value } : set
          );
          return { ...e, sets: updatedSets };
        }
        return e;
      })
    );
  };

  const handleDeleteExerciseSet = (exercise, setIndex) => {
    setTemplateExercises((prev) =>
      prev.map((e) => {
        if (e.exercise_id === exercise.exercise_id) {
          return { ...e, sets: e.sets.filter((_, idx) => idx !== setIndex) };
        }
        return e;
      })
    );
  };

  // TODO: handle name validation

  const handleTemplateAdd = async () => {
    if (templateName !== "") {
      try {
        const res = await addItem(user.id, { name: templateName }, "templates");
        if (!res.success) {
          toast.error(`Failed to create template: ${res.message}`);
          return;
        }

        const templatesRes = await fetchItems(user.id, "templates");
        const createdTemplate = templatesRes.data.find(
          (t) => t.name === templateName
        );

        if (!createdTemplate) {
          toast.error("Template creation failed.");
          return;
        }

        const exercisesData = templateExercises.map((exercise, index) => ({
          template_id: createdTemplate.template_id,
          exercise_id: exercise.exercise_id,
          order_index: index,
          rest_time: 90,
        }));

        const setsData = templateExercises.flatMap((exercise) =>
          exercise.sets.map((set, setIndex) => ({
            template_id: createdTemplate.template_id,
            exercise_id: exercise.exercise_id,
            set_index: setIndex,
            reps: set.reps,
            weight: set.weight,
          }))
        );

        const { error: exercisesError } = await supabase
          .from("template_exercises")
          .insert(exercisesData);

        if (exercisesError) {
          toast.error(`Failed to add exercises: ${exercisesError.message}`);
          return;
        }

        if (setsData.length > 0) {
          const { error: setsError } = await supabase
            .from("template_exercise_sets")
            .insert(setsData);

          if (setsError) {
            toast.error(`Failed to add sets: ${setsError.message}`);
            return;
          }
        }

        toast.success("Template created successfully!");
        onClose();
        setTemplateName("");
        setTemplateExercises([]);
        refreshTemplates();
      } catch (err) {
        toast.error(`Failed to create template: ${err.message}`);
      }
    } else {
      toast.error("Template name is required.");
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchExercises();
    }
  }, [isOpen]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (contentRef.current && !contentRef.current.contains(event.target)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, onClose]);

  return (
    <DialogRoot open={isOpen} onOpenChange={onClose}>
      <DialogContent width={"90%"} ref={contentRef}>
        <DialogHeader>
          <DialogTitle fontSize={{ base: "1.5rem" }}>
            <Text as={"span"} color={{ base: "var(--secondary-color)" }}>
              Create
            </Text>{" "}
            Template
          </DialogTitle>
        </DialogHeader>
        <DialogCloseTrigger />
        <DialogBody
          display={{ base: "flex" }}
          flexDirection={{ base: "column" }}
          gap={4}
        >
          <Field errorText="Template Name is required">
            <Input
              placeholder="Template Name"
              fontWeight={{ base: "600" }}
              onChange={(e) => setTemplateName(e.target.value)}
              name="name"
              value={templateName}
            />
          </Field>
          <Stack>
            {templateExercises.map((exercise) => (
              <Box
                key={exercise.exercise_id}
                padding={"0.5rem"}
                borderRadius={"0.75rem"}
              >
                <Text
                  fontSize={"1.2rem"}
                  fontWeight={"600"}
                  color={"var(--secondary-color)"}
                >
                  {exercise.name}
                </Text>
                <Table.Root
                  size="sm"
                  marginTop={"0.5rem"}
                  sx={{ tableLayout: "fixed", width: "100%" }}
                >
                  <Table.Header>
                    <Table.Row>
                      <Table.ColumnHeader
                        textAlign="start"
                        padding={"0"}
                        paddingRight={"1rem"}
                      >
                        Set
                      </Table.ColumnHeader>
                      <Table.ColumnHeader>Weight</Table.ColumnHeader>
                      <Table.ColumnHeader textAlign="end">
                        Reps
                      </Table.ColumnHeader>
                    </Table.Row>
                  </Table.Header>
                  <Table.Body>
                    {exercise.sets.map((set, index) => (
                      <Table.Row key={index}>
                        <Table.Cell>
                          {index + 1}
                          <IconButton
                            aria-label="Delete Set"
                            size="sm"
                            variant="ghost"
                            color="red"
                            marginLeft="0.5rem"
                            onClick={() =>
                              handleDeleteExerciseSet(exercise, index)
                            }
                          >
                            <FaTrash />
                          </IconButton>
                        </Table.Cell>
                        <Table.Cell>
                          <Input
                            placeholder="0 lbs"
                            width={"15vw"}
                            value={set.weight}
                            onChange={(e) =>
                              handleSetChange(
                                exercise,
                                index,
                                "weight",
                                e.target.value
                              )
                            }
                          />
                        </Table.Cell>
                        <Table.Cell textAlign="end">
                          <Input
                            placeholder="0 reps"
                            width={"15vw"}
                            value={set.reps}
                            onChange={(e) =>
                              handleSetChange(
                                exercise,
                                index,
                                "reps",
                                e.target.value
                              )
                            }
                          />
                        </Table.Cell>
                      </Table.Row>
                    ))}
                  </Table.Body>
                </Table.Root>
                <Button
                  backgroundColor="rgba(0,0,0,0.3)"
                  width="100%"
                  marginTop="1rem"
                  height="2rem"
                  borderRadius="0.5rem"
                  onClick={() => handleAddExerciseSet(exercise)}
                >
                  Add set
                </Button>
              </Box>
            ))}
          </Stack>

          <MenuRoot>
            <MenuTrigger asChild>
              <Button borderRadius={"0.75rem"}>Add Exercise</Button>
            </MenuTrigger>
            <MenuContent portalRef={contentRef}>
              {userExercises.map((exercise) => (
                <MenuItem
                  key={exercise.exercise_id}
                  value={exercise.exercise_id}
                  onClick={() => exerciseSelect(exercise)}
                >
                  {exercise.name}
                </MenuItem>
              ))}
            </MenuContent>
          </MenuRoot>
        </DialogBody>
        <DialogFooter>
          <Button
            backgroundColor={"var(--primary-color)"}
            onClick={handleTemplateAdd}
          >
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </DialogRoot>
  );
};

export default AddTemplate;
