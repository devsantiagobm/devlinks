import { Variants, Variant } from "framer-motion"

// Interface must be extended from Variants. That way, the HTML elements will be able to use object with with interface 
export interface FramerMotionVariants extends Variants {
    hide?: Variant
    show?: Variant
    exit?: Variant
}