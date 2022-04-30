import React from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import apiUrl from "./globalConstant";
import Button from "@mui/material/Button";
import swal from "sweetalert";
import { useHistory } from "react-router-dom";
import TextField from "@mui/material/TextField";
// import AddIcon from "@mui/icons-material/Add";

const signupValidationSchema = yup.object({
  username: yup.string().required("Please Enter your username"),
  password: yup
    .string()
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
      "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
    )
    .required("Please Enter your password"),
  passwordConfirm: yup
    .string()
    .required()
    .oneOf([yup.ref("password")], "Passwords does not match"),
  email: yup.string().email("Invalid email").required("Required"),
});

function UserSignup() {
  const history = useHistory();

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
      email: "",
    },
    validationSchema: signupValidationSchema,
    onSubmit: (values) => {
      addUser(values);
    },
  });

  function addUser(newUser) {
    delete newUser.passwordConfirm;
    fetch(`${apiUrl}/users/signup`, {
      method: "POST",
      body: JSON.stringify(newUser),
      headers: { "Content-type": "application/json" },
    })
      .then((data) => data.json())
      .then((data) => {
        console.log(data.message);
        if (data.message) {
          swal(data.message, "Try again", "error");
        } else {
          swal({
            title: "User has been added successfully",
            icon: "success",
            button: "Login!",
          });
          history.push(`/users/signin`);
        }
      });
  }

  return (
    <div className="add_form_box">
      <form onSubmit={formik.handleSubmit}>
        <div className="Adduser-container">
          <TextField
            className="input-box"
            fullWidth
            label="UserName"
            id="username"
            name="username"
            value={formik.values.username}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            color="primary"
            error={formik.errors.username && formik.touched.username}
            helperText={formik.touched.username && formik.errors.username}
          />

          <TextField
            className="input-box"
            fullWidth
            label="Email"
            id="email"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            color="primary"
            error={formik.errors.email && formik.touched.email}
            helperText={formik.touched.email && formik.errors.email}
          />

          <TextField
            className="input-box"
            fullWidth
            label="Password"
            id="password"
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            color="primary"
            error={formik.errors.password && formik.touched.password}
            helperText={formik.touched.password && formik.errors.password}
          />

          <TextField
            className="input-box"
            fullWidth
            label="Password Confirm"
            id="passwordConfirm"
            name="passwordConfirm"
            value={formik.values.passwordConfirm}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            color="primary"
            error={
              formik.errors.passwordConfirm && formik.touched.passwordConfirm
            }
            helperText={
              formik.touched.passwordConfirm && formik.errors.passwordConfirm
            }
          />
          <Button
            variant="contained"
            className="input-box_button"
            type="submit"
          >
            SignUp
          </Button>
        </div>
      </form>
    </div>
  );
}

export default UserSignup;
