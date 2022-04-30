import React, { useEffect, useState } from 'react'
import apiUrl from "./globalConstant";
import swal from "sweetalert";
import { useHistory } from "react-router-dom";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Axios from 'axios';

export default function Checkout() {
    const history = useHistory();

    const [checkOutItems, setcheckOutItems] = useState([]);
  
    
    const getcheckOutItems = () => {
        getAPi(`${apiUrl}/pizzas/cart/${localStorage.getItem("username")}`)
          .then((check) => setcheckOutItems(check))
          .catch((err) => {
            swal("Login to View Pizzas", "Try again", "error");
            history.push("/users/signin");
          });
      };
    
      useEffect(getcheckOutItems, [history]);

      async function razorPayPaymentHandler() {
        const API_URL = `http://localhost:9000/razorpay/`
        const orderUrl = `${API_URL}order`;
        const response = await Axios.get(orderUrl);
        const { data } = response;
        console.log("App -> razorPayPaymentHandler -> data", data)
        
        const options = {
          key: '',
          name: "Immanuel",
          description: "Immanuel",
          order_id: data.id,
          handler: async (response) => {
            try {
             const paymentId = response.razorpay_payment_id;
             const url = `${API_URL}capture/${paymentId}`;
             const captureResponse = await Axios.post(url, {})
             const successObj = JSON.parse(captureResponse.data)
             const captured = successObj.captured;
             console.log("App -> razorPayPaymentHandler -> captured", successObj)
             if(captured){
                 console.log('success')
             }
             
            } catch (err) {
              console.log(err);
            }
          },
          theme: {
            color: "#686CFD",
          },
        };
        const rzp1 = new window.Razorpay(options);
        rzp1.open();
      }
    return (
        <div className="pizza-card">
        {checkOutItems.map((pizza, index) => {
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
                      fetch(`${apiUrl}/pizzas/cart/${pizza._id}`, {
                        method: "DELETE",
                        body: JSON.stringify({
                          username: localStorage.getItem("username")
                        }),
                        headers: {
                          "Content-type": "application/json",
                          "x-auth-token": localStorage.getItem("token"),
                        },
                      }).then((data) => getcheckOutItems());

                      
                    }}
                  >
                    Remove from cart
                  </Button>
                
              </CardActions>

              
            </Card>
               
          );
        })}

        <div>
       
            <h1>Total: {checkOutItems.reduce((a, b) => +a + +b.price, 0)}</h1>
            <Button
            variant="contained"
            className="mt-auto"
            color="primary"
            onClick={razorPayPaymentHandler}
            > Confirm Order

            </Button>
            </div>
      </div>
    )
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
