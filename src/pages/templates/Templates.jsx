import React, { useEffect, useState } from "react";
import { useAuth } from "../../contexts/authContext";
import { Container, Heading, Text, Button } from "@chakra-ui/react";
import Navbar from "../../components/Navbar";
import AddTemplate from "./AddTemplate";
import { fetchTemplatesWithExercises } from "../../controllers/templates";
import toast from "react-hot-toast";

const TemplatesView = () => {
  const [userTemplates, setUserTemplates] = useState([]);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const { user } = useAuth();

  const fetchTemplates = async () => {
    try {
      const res = await fetchTemplatesWithExercises(user.id);
      if (res.success) {
        setUserTemplates(res.data);
      } else {
        toast.error(`Failed to fetch templates: ${res.message}`);
      }
    } catch (error) {
      toast.error(`Failed to fetch templates: ${error.message}`);
    }
  };

  useEffect(() => {
    if (user?.id) {
      fetchTemplates();
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
          Workout{" "}
          <Text as={"span"} color={{ base: "var(--secondary-color)" }}>
            Templates
          </Text>
        </Heading>
        <Button
          marginTop="1rem"
          width="100%"
          backgroundColor="var(--primary-color)"
          onClick={() => setIsAddDialogOpen(true)}
        >
          Create
        </Button>
        <AddTemplate
          isOpen={isAddDialogOpen}
          onClose={() => setIsAddDialogOpen(false)}
          refreshTemplates={fetchTemplates}
          user={user}
        />

        <div>
          {userTemplates.map((template) => (
            <div key={template.template_id}>{template.name}</div>
          ))}
        </div>
      </Container>
      <Navbar />
    </>
  );
};

export default TemplatesView;
