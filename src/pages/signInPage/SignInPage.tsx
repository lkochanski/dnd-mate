import React, {useEffect, useState} from 'react';
import {UserAuth} from "../../context/AuthContext";
import {useNavigate} from "react-router-dom";
import {Box, Button, Container, Grid, Link, TextField, Typography} from "@mui/material";
import GoogleButton from "react-google-button";
import {useTranslation} from "react-i18next";

import '../../locales/en/translationsEN.json'
import './sign-in-page.scss';

const SignInPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const {signIn, googleSignIn, user}: any = UserAuth();
  const navigate = useNavigate();
  const {t} = useTranslation();

  useEffect(() => {
    if (user != null) {
      navigate('/');
    }
  },[navigate, user]);


  const handleFormSubmit = async (e: any) => {
    e.preventDefault();
    try {
      setError("");
      await signIn(email, password);
    } catch (e: any) {
      setError(t('USER_SERVICES.SIGNIN_ERROR'));
      console.log(error);
    }
  }

  const handleGoogleSignIn = async () => {
    try {
      await googleSignIn();
    } catch(e) {
      setError(t('USER_SERVICES.SIGNIN_ERROR'))
    }
  }

  const handleFieldChange = (e: any, fieldType: string):void => {
    setError("");

    switch (fieldType) {
      case "email":
        setEmail(e.target.value);
        break;

      case "password":
        setPassword(e.target.value);
        break;
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box className={'box-wrapper'}>
        <Typography component="h1" variant="h5">
          {t('PAGE_INFO.NAME').toUpperCase()}
        </Typography>

        <Box component="form" noValidate onSubmit={handleFormSubmit} sx={{mt: 3}}>
          <Grid container>
            <Grid item xs={12} className="form-field-item-input">
              <TextField
                error={!!error}
                helperText={error}
                autoComplete="email"
                name="email"
                required
                fullWidth
                id="email"
                label={t('USER_SERVICES.EMAIL_ADDRESS')}
                autoFocus
                onChange={(e) => handleFieldChange(e, "email")}
              />
            </Grid>
            <Grid item xs={12} className="form-field-item-input">
              <TextField
                required
                fullWidth
                id="password"
                label={t('USER_SERVICES.PASSWORD')}
                name="password"
                type="password"
                autoComplete="current-password"
                onChange={(e) => handleFieldChange(e, "password")}
              />
            </Grid>
            <Grid item xs={12} className="form-field-item-button">
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{mt: 3, mb: 2}}
              >
                {t('USER_SERVICES.SIGN_IN')}
              </Button>
            </Grid>
            <Grid item xs={12} className={"form-field-google-button"}>
              <GoogleButton onClick={handleGoogleSignIn}/>
            </Grid>
            <Grid item xs={12} className={"form-field-captions"}>
              <Typography variant="caption">
                <Link href="#" onClick={() => navigate("/recover-password")}>
                  {t('USER_SERVICES.FORGOT_PASSWORD')}
                </Link>
              </Typography>
              <Typography variant="caption">
                <Link href="#" onClick={() => navigate("/register")}>
                  {t('USER_SERVICES.DONT_HAVE_AN_ACCOUNT')}
                </Link>
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default SignInPage;
