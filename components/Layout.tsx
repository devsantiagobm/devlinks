import Head from "next/head"
import { motion } from "framer-motion"


export default function Layout({ children, title = "", className, favicon }: { children: React.ReactNode, title?: string, className?: string, favicon?: string }) {


    return (
        <>

            <Head>
                <title>
                    {
                        title
                            ? title + " - Devlinks"
                            : "Devlinks"
                    }
                </title>
            </Head>

            <motion.main
                variants={variants}
                initial={"hidden"}
                animate={"show"}
                transition={{ duration: .4 }}
                className={className}>

                {children}
            </motion.main >
        </>
    )
}


const variants = {
    show: {
        opacity: 1,
        y: 0
    },

    hidden: {
        opacity: 0,
        y: 14
    }
}