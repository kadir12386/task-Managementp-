import { useState } from "react";
import { useHistory } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

export function Adduser({ user, setUser }) {
  const history = useHistory();
  const [title, setTitle] = useState("");
  const [notes, setNotes] = useState("");
  // const [like, setlike] = useState("");

  const adduser = () => {
    const newuser = {
      title: title,
      notes: notes,
    };
    // setUser([...user, newuser]);
    // restUser_Form();
    // history.push("/user");

    //1.method:POST
    //2.body: data & JSON
    //3.header - JSON data

    if (title === "" || notes === "") {
      alert("Fill the Form ");
    } else {
      fetch("https://6120e9a524d11c001762ee48.mockapi.io/notesapp", {
        method: "POST",
        body: JSON.stringify(newuser),
        headers: { "Content-type": "application/json" },
      }).then(() => history.push("/user"));
      alert("Your notes are added Sucessfully");
    }
  };

  return (
    <div className="add_form_box">
      <div className="Adduser-container">
        <h1>Add Notes</h1>

        <TextField
          id="outlined-basic"
          label="Enter the Title"
          variant="outlined"
          className="input-box"
          color="success"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          required
        />
        <TextField
          id="outlined-basic"
          label="Enter the Notes"
          variant="outlined"
          className="input-box"
          color="success"
          value={notes}
          onChange={(event) => setNotes(event.target.value)}
          required
        />

        {/* <input
        value={name}
        placeholder="enter the name"
        onChange={(event) => setName(event.target.value)}
      /> */}
        {/* <input
        value={pic}
        placeholder="enter the pic"
        onChange={(event) => setPic(event.target.value)}
      /> */}
        <Button
          variant="contained"
          onClick={adduser}
          className="input-box_button"
        >
          Add user
        </Button>
        {/* <button onClick={adduser}>Add user</button> */}
      </div>
    </div>
  );
}
