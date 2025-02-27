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
import { PasswordInput } from "../components/ui/password-input";

const SignupPage = () => {
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [formValues, setFormValues] = useState({
    username: "",
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
        console.log("Signup successful");
        toast.success("Signup successful. You can now login.");
        setTimeout(() => {
          navigate("/login");
        }, 3000);
      } else {
        toast.error(`Signup failed: ${res.message}`);
      }
    }
  };

  return (
    <Container
      display={{ base: "flex" }}
      flexDirection={{ base: "column" }}
      alignItems={{ base: "center" }}
      justifyContent={{ base: "center" }}
    >
      <Flex
        direction={{ base: "column" }}
        align={{ base: "center" }}
        borderRadius={{ base: "1.5rem" }}
        padding={{ base: "2rem 0 2rem 0" }}
        width={{ base: "80vw" }}
      >
        <Image
          src="/setlifyLogo.png"
          align={{ base: "left" }}
          width={{ base: "100%" }}
          height={{ base: "8vh" }}
          marginLeft={{ base: "0" }}
          marginBottom={{ base: "1rem" }}
          objectFit={{ base: "contain" }}
          display={{ base: "block" }}
        />
        <Heading
          as={"h1"}
          width={{ base: "100%" }}
          fontSize={{ base: "1.65rem" }}
          textAlign={{ base: "left" }}
          fontWeight={{ base: "700" }}
        >
          Create an Account
        </Heading>
        <Text marginBottom={{ base: "1rem" }} width={{ base: "100%" }}>
          Start your fitness journey
        </Text>
        <Box
          marginTop={{ base: "1rem" }}
          display={{ base: "flex" }}
          flexDirection={{ base: "column" }}
          gap={{ base: "1rem" }}
          width={{ base: "100%" }}
        >
          {forms.map((form) => (
            <Field.Root key={form.name} required>
              <Field.Label
                fontWeight={{ base: "600" }}
                color={{ base: "rgba(0, 0, 0, 0.5)" }}
              >
                {form.label}
                <Field.RequiredIndicator color={{ base: "red.500" }} />
              </Field.Label>
              {(form.name === "password" ||
                form.name === "confirmPassword") && (
                <PasswordInput
                  name={form.name}
                  value={formValues[form.name]}
                  onChange={handleChange}
                  placeholder={form.placeholder}
                />
              )}
              {form.name !== "password" && form.name !== "confirmPassword" && (
                <Input
                  name={form.name}
                  placeholder={form.placeholder}
                  value={formValues[form.name]}
                  onChange={handleChange}
                />
              )}
              {errors[form.name] && (
                <Text color={{ base: "red.500" }}>{errors[form.name]}</Text>
              )}
            </Field.Root>
          ))}
        </Box>
        <Button
          onClick={handleSignup}
          width={{ base: "100%" }}
          marginTop={{ base: "2rem" }}
          backgroundColor={{ base: "var(--primary-color)" }}
          color={{ base: "white" }}
          border={{ base: "none" }}
          borderRadius={{ base: "0.5rem" }}
        >
          Signup
        </Button>
        <Text
          color={{ base: "rgba(0, 0, 0, 0.5)" }}
          fontSize={{ base: "0.9rem" }}
          marginTop={{ base: "0.5rem" }}
        >
          Already have an account?{" "}
          <Link
            href="/login"
            color={{ base: "var(--primary-color)" }}
            fontWeight={{ base: "600" }}
          >
            Login
          </Link>
        </Text>
      </Flex>
    </Container>
  );
};

export default SignupPage;
