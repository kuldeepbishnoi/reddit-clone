import { Flex } from '@chakra-ui/react';
import React from 'react';
import Login from './Login';
import { useRecoilValue } from 'recoil';
import { authModalState } from '@/src/atoms/authModalAtom';
import SignUp from './SignUp';

type AuthInputsProps = {
};

const AuthInputs: React.FC<AuthInputsProps> = () => {
    console.log("Inside AuthInputs");
    const modalState = useRecoilValue(authModalState);

    return (
        <Flex direction="column" align="center" width="100%" mt={4}>
            {modalState.view === "login" && <Login />}
            {modalState.view === "signup" && <SignUp />}
        </Flex>    
    );
};

export default AuthInputs;