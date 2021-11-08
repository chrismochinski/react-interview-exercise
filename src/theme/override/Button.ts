import { searchSchoolDistricts } from "@utils/nces";

export const Button = {
    // The styles all button have in common
    baseStyle: {
      bg: "#DDB94F",
      fontWeight: "300",
      borderRadius: "25px", // <-- border radius is same for all variants and sizes
      _hover: {
        bg: "black",
        color: "black",
      }
    },
    // Two sizes: sm and md
    sizes: {
      sm: {
        fontSize: "sm",
        px: 4, // <-- px is short for paddingLeft and paddingRight
        py: 3, // <-- py is short for paddingTop and paddingBottom
      },
      md: {
        fontSize: "md",
        px: 6, // <-- these values are tokens from the design system
        py: 4, // <-- these values are tokens from the design system
      },
    },
    // Two variants: outline and solid
    variants: {
      outline: {
        border: "2px solid",
      },
      ghost: {
        border: "none",
        color: "#fff",
        textTransform: "uppercase",
      },
      solid: {
        color: "1px solid black",
      },
    },
    // The default size and variant values
    defaultProps: {
      size: "md",
      variant: "outline",
    },
}