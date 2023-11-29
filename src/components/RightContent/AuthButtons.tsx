import { authModalState } from '@/src/atoms/authModalAtom';
import { Button } from '@chakra-ui/react';
import React from 'react';
import { useSetRecoilState } from 'recoil';

const AuthButtons: React.FC = () => {
    console.log("Inside AuthButtons");
    const setAuthModalState = useSetRecoilState(authModalState);
    return (
        <>
            <Button 
                variant="outline"
                height="28px"
                display={{base: "none", sm:"flex"}}
                width={{base: "70px", md: "110px"}}
                mr={2}
                onClick={() => setAuthModalState({open:true, view:"login"})}
            >Log In</Button>
            <Button
                height="28px"
                display={{base: "none", sm:"flex"}}
                width={{base: "70px", md: "110px"}}
                mr={2}
                onClick={() => setAuthModalState({open:true, view:"signup"})}
            >Sign Up</Button> 
        </>
    );
};

export default AuthButtons;

// A common pattern in React is for a component to return multiple
// elements. Fragments let you group a list of children without adding
// extra nodes to the DOM.