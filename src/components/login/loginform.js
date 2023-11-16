import React from "react";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useForm } from "react-hook-form";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { useState } from "react";
import { auth } from "../firebase/firebase";
import { Toaster, toast } from "react-hot-toast";

export default function Loginform() {
  const [showOtp, setShowOtp] = useState(false);

  const [user, setUser] = useState();

  const { register, handleSubmit } = useForm();

  const sendOtp = async (data) => {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        auth,
        "recaptcha-container",
        {
          size: "invisible",
        }
      );
    }
    const appVerifier = window.recaptchaVerifier;

    const phoneNumber = "+91" + data.no;
    await signInWithPhoneNumber(auth, phoneNumber, appVerifier)
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;
        toast.success("OTP Sended Sucessfully");
        setShowOtp(true);
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  const verify = (data) => {
    window.confirmationResult
      .confirm(data.otp)
      .then(async (result) => {
        // User signed in successfully.
        const user = result.user;
        setUser(user.uid);
        // setLoading(false);
      })
      .catch((error) => {
        console.log(error.message);
        toast.error(error.message);
      });
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          {/* <LockOutlinedIcon /> */}
        </Avatar>
        <Typography component="h1" variant="h5" sx={{ color: "white" }}>
          {user ? user : "Sign in"}
        </Typography>
        {!showOtp && (
          <Box
            component="form"
            onSubmit={handleSubmit(sendOtp)}
            noValidate
            sx={{ mt: 2 }}
          >
            <TextField
              margin="normal"
              variant="standard"
              fullWidth
              type={"number"}
              id="mobile"
              label="Mobile No."
              name="mobile"
              autoFocus
              InputProps={{ style: { color: "white" } }}
              {...register("no", {
                required: "This is a required field",
                minLength: 10,
              })}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Send OTP
            </Button>
          </Box>
        )}
      </Box>
      {showOtp && (
        <Box
          component="form"
          onSubmit={handleSubmit(verify)}
          noValidate
          sx={{ mt: 2 }}
        >
          <TextField
            margin="normal"
            variant="standard"
            fullWidth
            type={"number"}
            id="otp"
            label="OTP"
            name="otp"
            autoFocus
            InputProps={{ style: { color: "white" } }}
            {...register("otp", {
              required: "This is required field",
              minLength: 6,
            })}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Verify
          </Button>
        </Box>
      )}
      <div
        style={{ display: "none" }}
        className="recaptcha-container"
        id="recaptcha-container"
      />
      <Toaster position="top-center" reverseOrder={false} />
    </Container>
    // <Toaster/>
  );
}
