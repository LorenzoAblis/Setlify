import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Container, Flex, Button, Icon } from "@chakra-ui/react";
import { CgProfile } from "react-icons/cg";
import { FaClock } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";
import { FaDumbbell } from "react-icons/fa6";
import { IoIosSettings } from "react-icons/io";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const navLinks = [
    {
      label: "Profile",
      href: "/profile",
      icon: <Icon as={CgProfile} boxSize={4} />,
    },
    {
      label: "History",
      href: "/history",
      icon: <Icon as={FaClock} boxSize={4} />,
    },
    {
      label: "Templates",
      href: "/",
      icon: <Icon as={FaPlus} boxSize={4} />,
    },
    {
      label: "Exercises",
      href: "/exercises",
      icon: <Icon as={FaDumbbell} boxSize={4} />,
    },
    {
      label: "Settings",
      href: "/settings",
      icon: <Icon as={IoIosSettings} boxSize={4} />,
    },
  ];

  return (
    <Container
      position={"fixed"}
      bottom={0}
      left={0}
      right={0}
      height={{ base: "10vh" }}
      backgroundColor={"var(--secondary-color)"}
    >
      <Flex
        direction={{ base: "row" }}
        justifyContent={{ base: "space-between" }}
        height={{ base: "100%" }}
        alignItems={{ base: "center" }}
      >
        {navLinks.map((link) => (
          <Button
            key={link.label}
            size={{ base: "sm" }}
            variant={{ base: "ghost" }}
            fontWeight={{ base: "500" }}
            href={link.href}
            width={{ base: "20%" }}
            color={
              location.pathname === link.href ? "white" : "rgba(0, 0, 0, 0.5)"
            }
            onClick={() => navigate(link.href)}
          >
            <Flex direction="column" alignItems="center">
              {React.cloneElement(link.icon, { boxSize: 6 })}
              <span style={{ fontSize: "0.7rem" }}>{link.label}</span>
            </Flex>
          </Button>
        ))}
      </Flex>
    </Container>
  );
};

export default Navbar;
