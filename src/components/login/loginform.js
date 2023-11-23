import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import DrawerAppBar from "../Navbar/navbar";
import { ToastContainer, toast } from "react-toastify";
import { useEffect } from "react";
import { useState } from "react";


export default function SignIn() {
  const navigate = useNavigate();
  const [loading, isLoading] = useState(true)
  // console.log(document.cookie);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const notify = (message, condition) => {
    condition(message, {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  const checkLoggedIn = async () => {
    let { data } = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/checklogin`, { withCredentials: true, baseURL: process.env.REACT_APP_BACKEND_URL })
    if (data === 'LOGGED_IN') {
      notify("Already Logged In", toast.warning);
      setTimeout(() => {
        navigate("/");
      }, 100);
    }else{
      isLoading(false)
    }
  }


  const onSubmit = async (data) => {
    let response = await axios.post(
      `${process.env.REACT_APP_BACKEND_URL}/login`,
      {
        password: data.password,
        email: data.email,
      },
      { withCredentials: true, baseURL: process.env.REACT_APP_BACKEND_URL}
    );
    if (response.data === "login success") {
      notify("Login Successful", toast.success);
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } else {
      notify("Unable to login", toast.error);
    }
  };


  useEffect(() => {
    checkLoggedIn()
  }, [])
  
  
  return (
      (!loading ? 
    <>
      <ToastContainer
        position="top-right"
        autoClose={1500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />

      <DrawerAppBar />
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage:
              "url(https://source.unsplash.com/random?wallpapers)",
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit(onSubmit)}
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                {...register("email", { required: "Email is required" })}
              />
              <span className="error-message">{errors.name?.message}</span>
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                {...register("password", { required: "Password is required" })}
              />
              <span className="error-message">{errors.password?.message}</span>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link
                    href="#"
                    variant="body2"
                    onClick={() => navigate("/register")}
                  >
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </>
      : '')
  );
}
