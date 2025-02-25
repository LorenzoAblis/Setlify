import React from "react";
import { Container, Flex, Button, Icon } from "@chakra-ui/react";
import { CgProfile } from "react-icons/cg";
import { FaClock } from "react-icons/fa";
import { FaHome } from "react-icons/fa";
import { FaDumbbell } from "react-icons/fa6";

const Navbar = () => {
  const navLinks = [
    {
      label: "Profile",
      href: "/",
      icon: <Icon as={CgProfile} boxSize={4} mr={1} />,
    },
    {
      label: "History",
      href: "/",
      icon: <Icon as={FaClock} boxSize={4} mr={1} />,
    },
    {
      label: "Workout",
      href: "/",
      icon: <Icon as={FaHome} boxSize={4} mr={1} />,
    },
    {
      label: "Exercises",
      href: "/",
      icon: <Icon as={FaDumbbell} boxSize={4} mr={1} />,
    },
  ];
  return (
    <Container
      position={"fixed"}
      bottom={0}
      left={0}
      right={0}
      height={"7.5vh"}
      backgroundColor={"var(--primary-color)"}
    >
      <Flex
        direction={"row"}
        justifyContent={"space-between"}
        height={"100%"}
        alignItems={"center"}
      >
        {navLinks.map((link) => (
          <Button
            key={link.label}
            size={"sm"}
            variant={"ghost"}
            color={"white"}
            fontWeight={"500"}
            _hover={{ bg: "var(--primary-color-dark)" }}
            paddingTop={"1vh"}
            href={link.href}
          >
            <Flex direction="column" alignItems="center">
              {React.cloneElement(link.icon, { boxSize: 6, mr: 1 })}
              <span style={{ fontSize: "0.7rem" }}>{link.label}</span>
            </Flex>
          </Button>
        ))}
      </Flex>
    </Container>
  );
};

export default Navbar;
