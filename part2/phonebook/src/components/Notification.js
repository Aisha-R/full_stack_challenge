const Notification = ({ message }) => {
    
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

    return (
        <div className='error' style={style}>
            {message}
        </div>
    )
}

export default Notification