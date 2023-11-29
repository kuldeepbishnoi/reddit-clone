import React from "react";
import { Flex, Icon, MenuItem, Text } from "@chakra-ui/react";
import { IoMdAdd } from "react-icons/io";
import CreateCommunityModal from "../Modal/CreateCommunityModal/index";
const Communities = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  return (
    <>
      <CreateCommunityModal isOpen={isOpen} setIsOpen={setIsOpen} />
      <MenuItem
        width="auto"
        fontSize="10pt"
        _hover={{ bg: "gray.100" }}
        onClick={() => setIsOpen(true)}
      >
        <Flex align="center">
          <Icon as={IoMdAdd} fontSize={20} mr={1} />
          Create Community
        </Flex>
      </MenuItem>
    </>
  );
};

export default Communities;
