import { useEffect } from "react";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
export function EditUser() {
  const { user_id } = useParams(); //important
  const [user, setUser] = useState(null);
  useEffect(() => {
    fetch(`https://6120e9a524d11c001762ee48.mockapi.io/notesapp/${user_id}`, {
      method: "GET",
    })
      .then((data) => data.json())
      .then((mvs) => setUser(mvs));
  }, [user_id]);

  // return user ? <UpdatedNewUser user={user} /> : "";
  //updateMovies is child ... is hanliding the display part...
  return user ? <UpdatedNewUser user={user} /> : "";
}

function UpdatedNewUser({ user }) {
  console.log("hello", user.id);
  const history = useHistory();
  const [title, setTitle] = useState(user.title);
  const [notes, setNotes] = useState(user.notes);

  const edituser = () => {
    // history.push("/user");
    const updatedUser = {
      title,
      notes,
    };
    console.log(updatedUser);
    fetch(`https://6120e9a524d11c001762ee48.mockapi.io/notesapp/${user.id}`, {
      method: "PUT",
      body: JSON.stringify(updatedUser),
      headers: { "Content-type": "application/json" },
    }).then(() => history.push("/user"));
    alert("Updated successfully");
  };
  return (
    <div className="add_form_box">
      <div className="Adduser-container">
        <h1>Edit Notes</h1>
        <TextField
          id="outlined-basic"
          label="Enter the Title"
          variant="outlined"
          className="input-box"
          color="success"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />
        <TextField
          id="outlined-basic"
          label="Enter the Notes"
          variant="outlined"
          className="input-box"
          color="success"
          value={notes}
          onChange={(event) => setNotes(event.target.value)}
        />
        {/* <input
        value={name}
        placeholder="enter the color"
        onChange={(event) => setName(event.target.value)}
      />
      <input
        value={pic}
        placeholder="enter the color"
        onChange={(event) => setPic(event.target.value)}
      /> */}
        <Button
          variant="contained"
          onClick={edituser}
          className="input-box_button"
        >
          Edit user
        </Button>
        {/* <button onClick={edituser}>Edit user</button> */}
      </div>
    </div>
  );
}
