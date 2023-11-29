import { Flex, Image } from "@chakra-ui/react";
import React from "react";
import SearchInput from "../SearchInput";
import AuthButtons from "../RightContent/AuthButtons";
import RightContent from "../RightContent";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/src/firebase/clientApp";
import Directory from "../Directory";

const Navbar: React.FC = () => {
  const [user, loading, error] = useAuthState(auth);
  console.log("Inside Navbar");
  return (
    // div with flex box applied to it
    // https://www.youtube.com/watch?v=K74l26pE4YA
    // margin-border-padding-element
    // PADDING X, Y -> top-bottom left-right
    <Flex
      bg="white"
      height="44px"
      padding="6px 12px"
      justify={{ md: "space-between" }}
    >
      <Flex
        align="center"
        // width={{ base: "40px", md: "auto" }}
        mr={{ base: 0, md: 2 }}
      >
        <Image src="/images/redditFace.svg" height="30px" alt="reddit" />
        <Image
          src="/images/redditText.svg"
          height="46px"
          alt="reddit"
          display={{ base: "none", sm: "unset" }}
        />
      </Flex>
      {user && <Directory />}
      <SearchInput user={user} />
      <RightContent user={user} />
    </Flex>
  );
};

export default Navbar;

// base: "0em", // 0px
// sm: "30em", // ~480px. em is a relative unit and is dependant on the font size.
// md: "48em", // ~768px
// lg: "62em", // ~992px
// xl: "80em", // ~1280px
// "2xl": "96em", // ~1536px
