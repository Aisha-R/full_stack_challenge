const Notification = ({ message }) => {
  let style = {
    color: "grey",
    textAlign: "center",
    fontSize: 20,
    borderStyle: "solid",
    padding: 5,
    marginBottom: 10,
  };

  if (message === "") {
    style = {};
  }

  return (
    <div style={style}>
      <p style={{ margin: 5 }}>{message}</p>
    </div>
  );
};

export default Notification;
