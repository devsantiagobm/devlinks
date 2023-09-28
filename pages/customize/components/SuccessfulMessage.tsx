import { motion } from "framer-motion"
import { FramerMotionVariants } from "models"


export default function SuccessfulMessage({ children }: { children: JSX.Element | string }) {
    return (
        <motion.span className="customize__succesful"
            variants={messageVariants}
            animate="show" initial="hide" exit="exit">
            {children}
        </motion.span>
    )
}


const messageVariants: FramerMotionVariants = {
    hide: {
        height: 0,
        opacity: 0,
    },
    show: {
        height: "auto",
        opacity: 1,
    },
    exit: {
        height: 0,
        opacity: 0,
    }

}