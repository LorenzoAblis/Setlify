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
} from "@chakra-ui/react";
import "../styles/SignupPage.scss";

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
    <Container className="login-container">
      <Flex direction="column" align="center" className="login-form">
        <Image src="/setlifyLogo.png" />
        <h1>Create an Account</h1>
        <Text css={{ marginBottom: "1rem" }}>Start your fitness journey</Text>
        <div className="login-fields">
          {forms.map((form) => (
            <Field.Root key={form.name} required>
              <Field.Label>
                {form.label}
                <Field.RequiredIndicator className="indicator" />
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
        </div>
        <Button onClick={handleSignup} className="signup-btn">
          Signup
        </Button>
        <span className="login-text">
          Already have an account?{" "}
          <a className="login-btn" href="/login">
            Login
          </a>
        </span>
      </Flex>
    </Container>
  );
};

export default SignupPage;
