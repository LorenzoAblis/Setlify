import { useRef } from "react";
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
  SelectLabel,
  SelectRoot,
  SelectTrigger,
  SelectValueText,
} from "../components/ui/select";

const Exercises = () => {
  const contentRef = useRef(null);
  const frameworks = createListCollection({
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

  return (
    <>
      <Container>
        <Heading
          as={"h1"}
          fontSize={"2rem"}
          fontWeight={"700"}
          marginTop={"7vh"}
        >
          Your{" "}
          <Text as={"span"} color={"var(--secondary-color)"}>
            Exercises
          </Text>
        </Heading>
        <Input
          placeholder="Search"
          marginTop={"1rem"}
          fontSize={"1rem"}
          borderRadius={"0.75rem"}
          border="1.5px solid #E5E5E5"
          fontWeight={500}
        />
        <DialogRoot>
          <DialogTrigger asChild>
            <Button
              marginTop={"1rem"}
              width={"100%"}
              backgroundColor={"var(--primary-color)"}
            >
              Create
            </Button>
          </DialogTrigger>
          <DialogContent width={"90%"} ref={contentRef}>
            <DialogHeader>
              <DialogTitle fontSize={"1.5rem"}>
                <Text as={"span"} color={"var(--secondary-color)"}>
                  Create
                </Text>{" "}
                Exercise
              </DialogTitle>
            </DialogHeader>
            <DialogCloseTrigger />
            <DialogBody display={"flex"} flexDirection={"column"} gap={4}>
              <Input placeholder="Name" fontWeight={"600"} />
              <SelectRoot collection={frameworks} size="md">
                <SelectTrigger>
                  <SelectValueText
                    placeholder="Muscle Group"
                    fontWeight={"600"}
                  />
                </SelectTrigger>
                <SelectContent portalRef={contentRef}>
                  {frameworks.items.map((item) => (
                    <SelectItem item={item} key={item.value}>
                      {item.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </SelectRoot>
              <SelectRoot collection={frameworks} size="md">
                <SelectTrigger>
                  <SelectValueText placeholder="Category" fontWeight={"600"} />
                </SelectTrigger>
                <SelectContent portalRef={contentRef}>
                  {frameworks.items.map((item) => (
                    <SelectItem item={item} key={item.value}>
                      {item.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </SelectRoot>
            </DialogBody>
            <DialogFooter>
              <DialogActionTrigger asChild>
                <Button backgroundColor={"var(--primary-color)"}>Save</Button>
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
