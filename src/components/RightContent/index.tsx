import { Button, Flex } from "@chakra-ui/react";
import AuthButtons from "./AuthButtons";
import AuthModal from "../Modal/AuthModal";
import { User, signOut } from "firebase/auth";
import { auth } from "@/src/firebase/clientApp";
import Icons from "./Icons";
import UserMenu from "./UserMenu";

type RightContentProps = {
  user?: User | null; // ? means User or null or undefined
};

const RightContent: React.FC<RightContentProps> = ({ user }) => {
  console.log("Inside RightContent");
  return (
    <>
      <AuthModal />
      {/* justify-content property defines how the browser distributes space between and around content items along the main-axis of a flex container */}
      <Flex justify="center" align="center">
        <>
          {user ? <Icons /> : <AuthButtons />}
          <UserMenu user={user} />
        </>
      </Flex>
    </>
  );
};

export default RightContent;
