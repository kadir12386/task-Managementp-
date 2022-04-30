import React from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import apiUrl from "./globalConstant";
import Button from "@mui/material/Button";
import swal from "sweetalert";
import { useHistory } from "react-router-dom";
import TextField from "@mui/material/TextField";

const loginValidationSchema = yup.object({
  email: yup.string().email("Invalid email").required("Required"),
  password: yup.string().required("Please Enter your password"),
});

function UserSignin(props) {
  const history = useHistory();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginValidationSchema,
    onSubmit: (values) => {
      loginUser(values);
    },
  });

  function loginUser(logUser) {
    fetch(`${apiUrl}/users/signin`, {
      method: "POST",
      body: JSON.stringify(logUser),
      headers: { "Content-type": "application/json" },
    })
      .then((data) => data.json())
      .then((data) => {
        if (data.status === 404) {
          console.log(data);
          swal(data.message, "Try again", "error");
        } else {
          localStorage.setItem("token", data.token);
          localStorage.setItem("type", data.type);
          localStorage.setItem("username", data.username);
          props.setUserSign(true);
          swal({
            title: "Logged successfully",
            icon: "success",
            button: "ok!",
          });
          history.push(`/user/adduser`);
        }
      });
  }

  return (
    // <div className="wrapper">
    //   <div className="formz">
    <div className="add_form_box">
      <form onSubmit={formik.handleSubmit}>
        <div className="Adduser-container">
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

          <Button
            variant="contained"
            className="input-box_button"
            type="submit"
          >
            Login
          </Button>
        </div>
      </form>
    </div>
    //</div>
    // </div>
  );
}

export default UserSignin;
