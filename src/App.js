import "./App.css";
import { Switch, Route } from "react-router-dom";
import About from "./About";
import UserSignup from "./UserSignup";
import UserSignin from "./UserSignin";
import AdminSignin from "./AdminSignin";
import AdminSignup from "./AdminSignup";
// import Pizzas from "./Pizzas";
import AdminDashBoard from "./AdminDashBoard";
import Header from "./Header";
import { useEffect, useState } from "react";
import Checkout from "./Checkout";
import { Adduser } from "./user/Adduser";
import { EditUser } from "./user/EditUser";
import { UserList } from "./user/UserList";
import { Redirect } from "react-router-dom";
function App() {
  const [usersign, setUserSign] = useState(false);
  const [adminsign, setAdminsign] = useState(false);
  //  const history = useHistory();
  const [user, setUser] = useState([]); //common one
  //fetch
  useEffect(() => {
    fetch("https://614ed775b4f6d30017b483a0.mockapi.io/sample", {
      method: "GET",
    })
      .then((data) => data.json())
      .then((mvs) => setUser(mvs));
  }, []);
  return (
    <>
      <Header
        setUserSign={setUserSign}
        usersign={usersign}
        setAdminsign={setAdminsign}
        adminsign={adminsign}
      />
      <Switch>
        <Route exact path="/">
          <About />
        </Route>
        <Route exact path="/users/signup">
          <UserSignup />
        </Route>
        <Route exact path="/users/signin">
          <UserSignin setUserSign={setUserSign} />
        </Route>
        <Route exact path="/admins/signup">
          <AdminSignup />
        </Route>
        <Route exact path="/admins/signin">
          <AdminSignin setAdminsign={setAdminsign} />
        </Route>
        {/* <Route exact path="/pizzas">
          <Pizzas />
        </Route> */}
        <Route exact path="/admin-dashboard">
          <AdminDashBoard
            setUserSign={setUserSign}
            setAdminsign={setAdminsign}
          />
        </Route>
        <Route exact path="/pizzas/cart-checkout/">
          <Checkout />
        </Route>
        {/* =========================================== */}
        <Route path="/user/adduser">
          <Adduser />
        </Route>
        <Route path="/user/edit/:user_id">
          <EditUser />
        </Route>

        <Route path="/allusers">
          <Redirect to="/user" />
        </Route>

        <Route path="/user">
          <UserList user={user} setUser={setUser} />
        </Route>
      </Switch>
    </>
  );
}

export default App;
