import { authModalState } from '@/src/atoms/authModalAtom';
import { Button, Input, Flex, Text} from '@chakra-ui/react';
import React, {useState} from 'react';
import { useSetRecoilState } from 'recoil';
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { auth } from '@/src/firebase/clientApp';


type LoginProps = {}

const Login: React.FC<LoginProps> = () => {
    console.log("Inside Login");
    // recoil
    const setAuthModalState = useSetRecoilState(authModalState);
    
    // state variables
    const [loginForm, setLoginForm] = useState({
        email: "",
        password: ""
    });

    // firebase code
    const [
        signInWithEmailAndPassword,
        user,
        loading,
        error,
      ] = useSignInWithEmailAndPassword(auth);
    const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        signInWithEmailAndPassword(loginForm.email, loginForm.password);
    }

    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setLoginForm((prev) => ({
            ...prev,
            [event.target.name]: event.target.value
        }));

    }

    return (
        <form onSubmit={onSubmit}>
            <Input
                required
                type="email"
                placeholder="Email"
                name="email"
                onChange={onChange}

                mb = {2}
                fontSize="10pt"
                _placeholder={{color : "gray.500"}}
                _hover={{
                    bg: "white",
                    border: "1px solid",
                    borderColor: "blue.500"
                }}
                _focus={{
                    outline: "none",
                    border: "1px solid",
                    bg: "white",
                    borderColor: "blue.500"
                }}
                bg = "gray.50"
            />
            <Input
                required
                type="password"
                placeholder="Password"
                name="password"
                onChange={onChange}

                mb = {2}
                fontSize="10pt"
                _placeholder={{color : "gray.500"}}
                _hover={{
                    bg: "white",
                    border: "1px solid",
                    borderColor: "blue.500"
                }}
                _focus={{
                    outline: "none",
                    border: "1px solid",
                    bg: "white",
                    borderColor: "blue.500"
                }}
                bg = "gray.50"
            />
            <Button type="submit" height="36px" mt={2} mb={2} width="100%" isLoading={loading}>Login</Button>
            {error && <Text fontSize="10pt" textAlign="center" color="red">{error.message}</Text>}
            <Flex fontSize="9pt" justifyContent="center">
                <Text mr={1}>Forgot your password?</Text>
                <Text
                    color="blue.500"
                    fontWeight={700}
                    cursor="pointer"
                    onClick={() => setAuthModalState(prev => ({
                            ...prev,
                            view: "resetPassword"
                        }))}
                    >Reset</Text>        
            </Flex>
            <Flex fontSize="9pt" justifyContent="center">
                <Text mr={1}>New Here?</Text>
                <Text
                    color="blue.500"
                    fontWeight={700}
                    cursor="pointer"
                    onClick={() => setAuthModalState(prev => ({
                            ...prev,
                            view: "signup"
                        }))}
                    >Sign Up</Text>        
            </Flex>
        </form>

    );
};

export default Login;