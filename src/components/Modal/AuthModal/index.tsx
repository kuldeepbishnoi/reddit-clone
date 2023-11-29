import { authModalState } from '@/src/atoms/authModalAtom';
import {Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, Flex, Text } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import AuthInputs from './AuthInputs';
import OAuthButtons from './OAuthButtons';

import {useAuthState} from 'react-firebase-hooks/auth';
import { auth } from '@/src/firebase/clientApp';
import ResetPassword from './ResetPassword';


const AuthModal: React.FC = () => {
    console.log("Inside AuthModal");
    const [modalState, setModalState] = useRecoilState(authModalState);
    const handleClose = () => {
        setModalState((prev) => ({
            ...prev,
            open: false
        }));
    }
    // firebase code
    const [user, loading, error] = useAuthState(auth);
    useEffect(() => {
        if (user) {
            handleClose();
        }
    }, [user]);


    return (
        <>
            <Modal isOpen={modalState.open} onClose={handleClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader textAlign="center">
                    {modalState.view === "login" && "Login"}
                    {modalState.view === "signup" && "Sign Up"}
                    {modalState.view === "resetPassword" && "Reset Password"}    
                </ModalHeader>
                <ModalCloseButton />
                <ModalBody
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    justifyContent="center"
                    pb={6}
                >
                    <Flex
                        direction="column"
                        align="center"
                        justify="center"
                        width="70%">
                        {
                            modalState.view === "resetPassword"? 
                            <ResetPassword /> :
                            <>
                                <OAuthButtons />
                                <Text color="gray.500" fontWeight={700}>OR</Text>
                                <AuthInputs/>
                            </>
                        }
                         
                        
                        
                    </Flex>
                </ModalBody>
            </ModalContent>
            </Modal>
        </>
    );
};

export default AuthModal;