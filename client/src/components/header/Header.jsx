import React from "react";
import {
  Box,
  Stack,
  Flex,
  Button,
  useDisclosure,
  Heading,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { MdQrCode2, MdOutlineMenu } from "react-icons/md";

function Header({ isAuth, ...props }) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  function menuToggleHandle() {
    if (isOpen) {
      onClose();
    } else {
      onOpen();
    }
  }

  async function logoutBtnHandler() {
    try {
    } catch (e) {}
  }

  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      bg="teal.500"
      padding={2}
      color="white"
      onClick={onClose}
      {...props}
    >
      <Flex as={Link} to="/" align="center" justify="center" mr={5}>
        <MdQrCode2 fontSize="2em" />
        <Heading size="md">mergedqr</Heading>
      </Flex>

      <Box
        display={{ base: "block", md: "none" }}
        onClick={(e) => {
          e.stopPropagation();
          menuToggleHandle();
        }}
      >
        <MdOutlineMenu fontSize="24px" />
      </Box>

      <Stack
        direction={{ base: "column", md: "row" }}
        display={{ base: isOpen ? "block" : "none", md: "flex" }}
        width={{ base: "full", md: "auto" }}
        mt={{ base: 4, md: 0 }}
        alignItems="center"
        justify="flex-end"
        flexGrow={1}
      >
        {isAuth ? (
          <>
            <Box>
              <Button
                as={Link}
                to="/"
                variant="outline"
                _hover={{ bg: "teal.700", borderColor: "teal.700" }}
              >
                profile
              </Button>
            </Box>
            <Box>
              <Button
                as={Link}
                to="create-poll"
                variant="outline"
                _hover={{ bg: "teal.700", borderColor: "teal.700" }}
              >
                create poll
              </Button>
            </Box>
            <Box>
              <Button
                variant="outline"
                _hover={{ bg: "teal.700", borderColor: "teal.700" }}
                onClick={logoutBtnHandler}
              >
                log out
              </Button>
            </Box>
          </>
        ) : (
          <>
            <Box>
              <Button
                as={Link}
                to="/login"
                variant="ghost"
                _hover={{ bg: "teal.700", borderColor: "teal.700" }}
              >
                log in
              </Button>
            </Box>
            <Box>
              <Button
                as={Link}
                to="registration"
                variant="ghost"
                _hover={{ bg: "teal.700", borderColor: "teal.700" }}
              >
                registration
              </Button>
            </Box>
          </>
        )}
      </Stack>
    </Flex>
  );
}

export default Header;
