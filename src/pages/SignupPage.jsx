import { useState } from "react";
import { signUp } from "../controllers/auth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import {
  Flex,
  Container,
  Field,
  Input,
  Text,
  Button,
  Image,
  Heading,
  Box,
  Link,
} from "@chakra-ui/react";

const SignupPage = () => {
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const forms = [
    {
      label: "Username",
      name: "username",
      placeholder: "Username",
    },
    {
      label: "Email",
      name: "email",
      placeholder: "name@example.com",
    },
    {
      label: "Password",
      name: "password",
      placeholder: "Password",
    },
    {
      label: "Confirm Password",
      name: "confirmPassword",
      placeholder: "Confirm Password",
    },
  ];

  const validateForm = () => {
    let newErrors = {};

    if (!/^[a-zA-Z0-9_]{3,20}$/.test(formValues.username)) {
      newErrors.username =
        "Username must be 3-20 characters long and contain only letters, numbers, and underscores.";
    }

    if (!/^\S+@\S+\.\S+$/.test(formValues.email)) {
      newErrors.email = "Invalid email format.";
    }

    if (!/^(?=.*[A-Z])(?=.*\d).{8,}$/.test(formValues.password)) {
      newErrors.password =
        "Password must be at least 8 characters long, contain a number and an uppercase letter.";
    }

    if (formValues.password !== formValues.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevForm) => ({ ...prevForm, [name]: value }));
  };

  const handleSignup = async () => {
    if (validateForm()) {
      const res = await signUp(
        formValues.email,
        formValues.password,
        formValues.username
      );
      if (res.success) {
        navigate("/login");
        console.log("Signup successful");
      } else {
        toast.error(`Signup failed: ${res.message}`);
      }
    }
  };

  return (
    <Container
      display={"flex"}
      flexDirection={"column"}
      alignItems="center"
      justifyContent={"center"}
    >
      <Flex
        direction="column"
        align="center"
        borderRadius={"1.5rem"}
        padding={"2rem 0 2rem 0"}
        width={"80vw"}
      >
        <Image
          src="/setlifyLogo.png"
          align={"left"}
          width={"100%"}
          height={"8vh"}
          marginLeft={"0"}
          marginBottom={"1rem"}
          objectFit={"contain"}
          display={"block"}
        />
        <Heading
          as={"h1"}
          width={"100%"}
          fontSize={"1.65rem"}
          textAlign={"left"}
          fontWeight={"700"}
        >
          Create an Account
        </Heading>
        <Text marginBottom={"1rem"} width={"100%"}>
          Start your fitness journey
        </Text>
        <Box
          marginTop={"1rem"}
          display={"flex"}
          flexDirection={"column"}
          gap={"1rem"}
          width={"100%"}
        >
          {forms.map((form) => (
            <Field.Root key={form.name} required>
              <Field.Label fontWeight={"600"} color={"rgba(0, 0, 0, 0.5)"}>
                {form.label}
                <Field.RequiredIndicator color={"red.500"} />
              </Field.Label>
              <Input
                name={form.name}
                placeholder={form.placeholder}
                value={formValues[form.name]}
                onChange={handleChange}
              />
              {errors[form.name] && (
                <Text color="red.500">{errors[form.name]}</Text>
              )}
            </Field.Root>
          ))}
        </Box>
        <Button
          onClick={handleSignup}
          width={"100%"}
          marginTop={"2rem"}
          backgroundColor={"var(--primary-color)"}
          color={"white"}
          border={"none"}
          borderRadius={"0.5rem"}
        >
          Signup
        </Button>
        <Text
          color={"rgba(0, 0, 0, 0.5)"}
          fontSize={"0.9rem"}
          marginTop={"0.5rem"}
        >
          Already have an account?{" "}
          <Link href="/login" color={"var(--primary-color)"} fontWeight={"600"}>
            Login
          </Link>
        </Text>
      </Flex>
    </Container>
  );
};

export default SignupPage;
