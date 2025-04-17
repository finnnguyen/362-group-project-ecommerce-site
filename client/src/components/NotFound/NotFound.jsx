
const styles = {
    textAlign: 'center',
    marginBlock: "150px"
}

export default function NotFound() {
    return (
        <div style={styles}>
            <h1>This page does not exist!</h1>
            <a href="/">Back</a>
        </div>
    )
}