import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  Menu,
  MenuButton,
  Button,
  MenuList,
  MenuItem,
  Icon,
  Flex,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { AiFillHome } from "react-icons/ai";
import Communities from "./Communities";

const Directory: React.FC = () => {
  return (
    <Menu>
      <MenuButton
        padding="0px 6px"
        borderRadius={4}
        _hover={{ outline: "1px solid", outlineColor: "gray.200" }}
        mr={2}
        ml={{ base: 0, md: 2 }}
      >
        <Flex align="center">
          <Icon as={AiFillHome} mr={{ base: 1, md: 2 }} fontSize={20} />
          <Text
            fontSize="80%"
            fontWeight={500}
            display={{ base: "none", sm: "flex" }}
          >
            Home
          </Text>
          <ChevronDownIcon marginTop={1} />
        </Flex>
      </MenuButton>
      <MenuList>
        <Communities />
      </MenuList>
    </Menu>
  );
};

export default Directory;

// const breakpoints = {
//     base: "0em", // 0px
//     sm: "30em", // ~780px. em is a relative unit and is dependant on the font size.
//     md: "48em", // ~768px
//     lg: "62em", // ~992px
//     xl: "80em", // ~1280px
//     "2xl": "96em", // ~1536px
//   };

// %
// {}
// "px"
// pt
