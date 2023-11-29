import {ComponentStyleConfig} from "@chakra-ui/react";

// font-size defines how large or big the text is whereas font-weight 
// defines how bolder or lighter the text is.

export const Button: ComponentStyleConfig = {
    // Styles for the base style
    baseStyle: {
        fontWeight: "700",
        borderRadius: "60px",
        fontSize: "16px",
        _focus: {
            boxShadow: "none",
        },
    },
    // Styles for the size variations
    sizes: {
        sm: {fontSize: "8pt"},
        md: {fontSize: "10pt"},
    },
    // Styles for the visual style variations
    variants: {
        solid:{
            bg: "blue.500",
            color: "white",
            _hover: {
                bg: "blue.400"
            },
        },
        outline:{
            color: "blue.500",
            border: "1px solid",
            borderColor: "blue.500"
        },
        oauth:{
            height: "34px",
            border: "1px solid",
            borderColor: "gray.300",
            _hover: {
                bg: "gray.50"
            },
        }
    },
};