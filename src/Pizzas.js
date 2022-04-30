import React, { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import LocalPizzaIcon from "@mui/icons-material/LocalPizza";
import Typography from "@mui/material/Typography";
import apiUrl from "./globalConstant";
import swal from "sweetalert";
import { useHistory } from "react-router-dom";

export default function Pizzas() {
  const history = useHistory();

  const [pizzas, setPizzas] = useState([]);
  const [cart, setCart] = useState(0);

  const getPizzas = () => {
    getAPi(`${apiUrl}/pizzas`)
      .then((pizza) => setPizzas(pizza))
      .catch((err) => {
        swal("Login to View Pizzas", "Try again", "error");
        history.push("/users/signin");
      });
  };

  useEffect(getPizzas, [history]);

  const cartItems = () => {
    getAPi(`${apiUrl}/pizzas/cart/${localStorage.getItem("username")}`).then(
      (cart) => {
        setCart(cart.length);
      }
    );
  };

  useEffect(cartItems, []);

  const getCartItems = () => {
    getAPi(`${apiUrl}/pizzas/cart/${localStorage.getItem("username")}`).then(
      (cartItem) => {
        setCart(cartItem.length);
      }
    );
  };

  return (
    <>
      <div className="cart">
        <div>
          <Button
            startIcon={<LocalPizzaIcon />}
            variant="contained"
            className="mt-auto"
            color="primary"
          >
            Make your own pizza(Currently unavailable)
          </Button>
        </div>
        <Button
          startIcon={<ShoppingCartIcon />}
          variant="contained"
          className="mt-auto"
          color="primary"
          onClick={() => history.push(`/pizzas/cart-checkout`)}
        >
          Cart {cart}
        </Button>
        <div></div>
      </div>
      <div></div>

      <div className="pizza-card">
        {pizzas.map((pizza, index) => {
          return (
            <Card sx={{ maxWidth: 345 }} key={index}>
              <CardMedia
                component="img"
                height="300"
                image={pizza.img}
                alt={pizza.name}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {pizza.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  RS. {pizza.price}
                </Typography>
              </CardContent>

              <CardActions>
                <Button
                  size="small"
                  onClick={() => {
                    fetch(
                      `${apiUrl}/pizzas/cart/${localStorage.getItem(
                        "username"
                      )}`,
                      {
                        method: "POST",
                        body: JSON.stringify({
                          username: localStorage.getItem("username"),
                          name: pizza.name,
                          price: pizza.price,
                          img: pizza.img,
                          quantity: 0,
                          isDisabled: true,
                        }),
                        headers: {
                          "Content-type": "application/json",
                          "x-auth-token": localStorage.getItem("token"),
                        },
                      }
                    )
                      .then((data) => data.json())
                      .then((data) => {
                        console.log(data.message);
                        if (data.message) {
                          swal(data.message, "Try again", "error");
                        } else {
                          swal({
                            title: "Pizza successfully Added",
                            icon: "success",
                            button: "Enjoy!",
                          });
                        }
                      }).then(data=>getCartItems())
                  }}
                >
                  Add to cart
                </Button>
              </CardActions>
            </Card>
          );
        })}
      </div>
    </>
  );
}

function getAPi(url) {
  return fetch(url, {
    headers: {
      "x-auth-token": localStorage.getItem("token"),
    },
  }).then((response) => {
    if (response.status === 200) {
      return response.json();
    }
    throw new Error("Unauthorized");
  });
}
