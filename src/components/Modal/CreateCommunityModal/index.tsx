import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Text,
  Input,
  Radio,
  RadioGroup,
  Stack,
  Box,
  Divider,
  Checkbox,
  Flex,
  Icon,
} from "@chakra-ui/react";
import React from "react";
import { CheckIcon } from "@chakra-ui/icons";
import { BsFillEyeFill, BsFillPersonFill } from "react-icons/bs";
import { HiLockClosed } from "react-icons/hi";
// import { auth } from "../../../firebase/clientApp";

import {
  doc,
  getDoc,
  runTransaction,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { auth, firestore } from "@/src/firebase/clientApp";
import { useAuthState } from "react-firebase-hooks/auth";

interface CreateCommunityProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const CreateCommunityModal: React.FC<CreateCommunityProps> = ({
  isOpen,
  setIsOpen,
}) => {
  const [charsRemaining, setCharsRemaining] = React.useState(21);
  const [name, setName] = React.useState("");
  const [communityType, setCommunityType] = React.useState("public");
  const [nameError, setNameError] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [user] = useAuthState(auth);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value.length > 21) return;
    setName(event.target.value);
    setCharsRemaining(21 - event.target.value.length);
  };

  const onCommunityTypeChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const {
      target: { name },
    } = event;
    if (name === communityType) return;
    setCommunityType(name);
  };

  const onClose = () => setIsOpen(false);

  const handleCreateCommunity = async () => {
    // check if name is valid
    if (nameError) setNameError("");
    const format = /[ `!@#$%^&*()+\-=\[\]{};':"\\|,.<>\/?~]/;
    if (format.test(name) || name.length <= 3) {
      setNameError(
        "Community names must be between 3–21 characters, and can only contain letters, numbers, or underscores."
      );
      return;
    }

    setLoading(true);
    try {
      const communityDocRef = doc(firestore, "communities", name);

      await runTransaction(firestore, async (transaction) => {
        const communityDoc = await getDoc(communityDocRef);
        if (communityDoc.exists()) {
          throw new Error(`Sorry, /r${name} is taken. Try another.`);
        }

        // create community
        transaction.set(communityDocRef, {
          createrId: "test",
          createdAt: serverTimestamp(),
          numberOfMembers: 1,
          privacyType: communityType,
        });
        transaction.set(
          doc(firestore, `users/${user?.uid}/communitySnippets`, name),
          // doc(firestore, `users/test/communitySnippets`, name),
          {
            communityId: name,
            isModerator: true,
          }
        );
      });
    } catch (err: any) {
      setNameError(err.message);
    }
    setLoading(false);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader
          display="flex"
          flexDirection="column"
          fontSize={15}
          padding={3}
        >
          Create a Community
        </ModalHeader>
        <ModalCloseButton />

        <Box pr={3} pl={3}>
          <Divider />
          <ModalCloseButton />
          <ModalBody display="flex" flexDirection="column" padding="10px 0px">
            <Text fontWeight={600} fontSize={15}>
              Name
            </Text>
            <Text fontSize={11} color="gray.500">
              Community names including capitalization cannot be changed
            </Text>
            <Text
              color="gray.400"
              position="relative"
              top="35px"
              left="10px"
              width="20px"
            >
              r/
            </Text>
            <Input
              position="relative"
              name="name"
              value={name}
              onChange={handleChange}
              pl="27px"
              type={""}
              size="sm"
            />
            <Text
              fontSize="9pt"
              color={charsRemaining === 0 ? "red" : "gray.500"}
              pt={2}
            >
              {charsRemaining} Characters remaining
            </Text>
            <Text fontSize="9pt" color="red" pt={1}>
              {nameError}
            </Text>
            <Box mt={4} mb={4}>
              <Text fontWeight={600} fontSize={15}>
                Community Type
              </Text>
              <Stack spacing={2} pt={1}>
                <Checkbox
                  colorScheme="blue"
                  name="public"
                  isChecked={communityType === "public"}
                  onChange={onCommunityTypeChange}
                >
                  <Flex alignItems="center">
                    <Icon as={BsFillPersonFill} mr={2} color="gray.500" />
                    <Text fontSize="10pt" mr={1}>
                      Public
                    </Text>
                    <Text fontSize="8pt" color="gray.500" pt={1}>
                      Anyone can view, post, and comment to this community
                    </Text>
                  </Flex>
                </Checkbox>
                <Checkbox
                  colorScheme="blue"
                  name="restricted"
                  isChecked={communityType === "restricted"}
                  onChange={onCommunityTypeChange}
                >
                  <Flex alignItems="center">
                    <Icon as={BsFillEyeFill} color="gray.500" mr={2} />
                    <Text fontSize="10pt" mr={1}>
                      Restricted
                    </Text>
                    <Text fontSize="8pt" color="gray.500" pt={1}>
                      Anyone can view this community, but only approved users
                      can post
                    </Text>
                  </Flex>
                </Checkbox>
                <Checkbox
                  colorScheme="blue"
                  name="private"
                  isChecked={communityType === "private"}
                  onChange={onCommunityTypeChange}
                >
                  <Flex alignItems="center">
                    <Icon as={HiLockClosed} color="gray.500" mr={2} />
                    <Text fontSize="10pt" mr={1}>
                      Private
                    </Text>
                    <Text fontSize="8pt" color="gray.500" pt={1}>
                      Only approved users can view and submit to this community
                    </Text>
                  </Flex>
                </Checkbox>
              </Stack>
            </Box>
          </ModalBody>
        </Box>

        <ModalFooter bgColor="blue.50">
          <Button variant="outline" height="30px" mr={2} onClick={onClose}>
            Cancel
          </Button>
          <Button
            variant="solid"
            height="30px"
            onClick={handleCreateCommunity}
            isLoading={loading}
          >
            Create Community
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default CreateCommunityModal;
