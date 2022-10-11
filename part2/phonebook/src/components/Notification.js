const Notification = ({ message, error }) => {
    
    if (message === null || message === undefined) {
        return null
    }

    const style = {
        color: 'green',
        textAlign: 'center',
        fontSize: 20,
        borderStyle: 'solid',
        padding: 10,
        marginBottom: 10
    }

    if (error) {
        style['color'] = 'red'
    }

    return (
        <div style={style}>
            {message}
        </div>
    )
}

export default Notification