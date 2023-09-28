export default function Loader({ style, isCenter }: { style?: "dark", isCenter?: boolean }) {

    const className = `
    loader
    ${style === "dark" && "loader--dark"}
    ${isCenter && "loader--center"}
    `

    return <span className={className}></span>
}