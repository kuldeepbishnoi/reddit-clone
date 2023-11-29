import { authModalState } from "@/src/atoms/authModalAtom";
import { Button, Flex, Input, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useSetRecoilState } from "recoil";

// firebase dependencies -start
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth, firestore } from "@/src/firebase/clientApp";
import { addDoc, collection } from "firebase/firestore";
import { User } from "firebase/auth";
// firebase dependencies -end

const SignUp: React.FC = () => {
  console.log("Inside SignUp");
  // recoil
  const setAuthModalState = useSetRecoilState(authModalState);

  //state variables
  const [signUpForm, setsignUpForm] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");

  // firebase code -start
  const [
    createUserWithEmailAndPassword,
    user,
    loading, // loading state boolean
    userError,
  ] = useCreateUserWithEmailAndPassword(auth);
  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (error) {
      setError("");
    }
    if (signUpForm.password !== signUpForm.confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    createUserWithEmailAndPassword(signUpForm.email, signUpForm.password);
  };

  const createUserDocument = async (user: User) => {
    await addDoc(
      collection(firestore, "users"),
      JSON.parse(JSON.stringify(user))
    );
  };
  useEffect(() => {
    if (user) {
      createUserDocument(user.user);
    }
  }, [user]);
  // firebase code -end

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setsignUpForm((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };
  return (
    <form onSubmit={onSubmit}>
      <Input
        required
        type="email"
        placeholder="Email"
        name="email"
        onChange={onChange}
        mb={2}
        fontSize="10pt"
        _placeholder={{ color: "gray.500" }}
        _hover={{
          bg: "white",
          border: "1px solid",
          borderColor: "blue.500",
        }}
        _focus={{
          outline: "none",
          border: "1px solid",
          bg: "white",
          borderColor: "blue.500",
        }}
        bg="gray.50"
      />
      <Input
        required
        type="password" // encrypt into ....
        placeholder="Password"
        name="password"
        onChange={onChange}
        mb={2}
        fontSize="10pt"
        _placeholder={{ color: "gray.500" }}
        _hover={{
          bg: "white",
          border: "1px solid",
          borderColor: "blue.500",
        }}
        _focus={{
          outline: "none",
          border: "1px solid",
          bg: "white",
          borderColor: "blue.500",
        }}
        bg="gray.50"
      />
      <Input
        required
        type="password"
        placeholder="Confirm Password"
        name="confirmPassword"
        onChange={onChange}
        mb={2}
        fontSize="10pt"
        _placeholder={{ color: "gray.500" }}
        _hover={{
          bg: "white",
          border: "1px solid",
          borderColor: "blue.500",
        }}
        _focus={{
          outline: "none",
          border: "1px solid",
          bg: "white",
          borderColor: "blue.500",
        }}
        bg="gray.50"
      />
      {error ||
        (userError && (
          <Text textAlign="center" color="red.500" fontSize="10pt">
            {error || userError.message}
          </Text>
        ))}
      <Button
        type="submit"
        height="36px"
        mt={2}
        mb={2}
        width="100%"
        isLoading={loading}
      >
        Sign Up
      </Button>
      <Flex fontSize="9pt" justifyContent="center">
        <Text mr={1}>Already a redditor?</Text>
        <Text
          color="blue.500"
          fontWeight={700}
          cursor="pointer"
          onClick={() =>
            setAuthModalState((prev) => ({
              ...prev,
              view: "login",
            }))
          }
        >
          LOG IN
        </Text>
      </Flex>
    </form>
  );
};

export default SignUp;
