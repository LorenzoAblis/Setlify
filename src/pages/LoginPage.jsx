import { useState } from "react";
import { login } from "../controllers/auth";
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

const LoginPage = () => {
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });

  const forms = [
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
  ];

  const validateForm = () => {
    let newErrors = {};

    if (!/^\S+@\S+\.\S+$/.test(formValues.email)) {
      newErrors.email = "Invalid email format.";
    }

    if (!/^(?=.*[A-Z])(?=.*\d).{8,}$/.test(formValues.password)) {
      newErrors.password =
        "Password must be at least 8 characters long, contain a number and an uppercase letter.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevForm) => ({ ...prevForm, [name]: value }));
  };

  const handleLogin = async () => {
    if (validateForm()) {
      const res = await login(formValues.email, formValues.password);
      if (res.success) {
        navigate("/");
        console.log("Login successful");
      } else {
        toast.error(`Login failed: ${res.message}`);
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
          Welcome back!
        </Heading>
        <Text marginBottom={"1rem"} width={"100%"}>
          Ready to do more?
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
              {form.name === "password" && (
                <PasswordInput
                  name={form.name}
                  value={formValues[form.name]}
                  onChange={handleChange}
                  placeholder={form.placeholder}
                />
              )}
              {form.name !== "password" && (
                <Input
                  name={form.name}
                  placeholder={form.placeholder}
                  value={formValues[form.name]}
                  onChange={handleChange}
                />
              )}
              {errors[form.name] && (
                <Text color="red.500">{errors[form.name]}</Text>
              )}
            </Field.Root>
          ))}
        </Box>
        <Button
          onClick={handleLogin}
          width={"100%"}
          marginTop={"2rem"}
          backgroundColor={"var(--primary-color)"}
          color={"white"}
          border={"none"}
          borderRadius={"0.5rem"}
        >
          Login
        </Button>
        <Text
          color={"rgba(0, 0, 0, 0.5)"}
          fontSize={"0.9rem"}
          marginTop={"0.5rem"}
        >
          Don't have an account?{" "}
          <Link
            href="/signup"
            color={"var(--primary-color)"}
            fontWeight={"600"}
          >
            Signup
          </Link>
        </Text>
      </Flex>
    </Container>
  );
};

export default LoginPage;
