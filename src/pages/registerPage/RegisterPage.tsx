import React, {useEffect, useState} from 'react';
import {UserAuth} from "../../context/AuthContext";
import {useNavigate} from "react-router-dom";
import {Box, Button, Container, Grid, Link, TextField, Typography} from "@mui/material";
import {useTranslation} from "react-i18next";
import isEmail from 'validator/lib/isEmail';
import { styled } from '@mui/material/styles';

const ValidationTextField = styled(TextField)({
  '& input:valid + fieldset': {
    borderColor: 'green',
    borderWidth: 2,
  },
  '& input:invalid + fieldset': {
    borderColor: 'red',
    borderWidth: 2,
  },
  '& input:valid:focus + fieldset': {
    borderLeftWidth: 6,
    padding: '4px !important',
  },
});

const RegisterPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [isValidEmail, setIsValidEmail] = useState(false);
  const [isValidPassword, setIsValidPassword] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const {createUser, user}: any = UserAuth();
  const navigate = useNavigate();
  const {t} = useTranslation();

  useEffect(() => {
    if(isValidPassword && isValidEmail)
      setIsFormValid(true);
    else
      setIsFormValid(false);
  },[isValidPassword, isValidEmail]);

  useEffect(() => {
    if (user != null) {
      navigate('/');
    }
  },[navigate, user]);

  const handleFormSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    setLoginError('');
    try {
      await createUser(email, password);
      navigate('/');
    } catch (error) {
      let message: string;
      if (error instanceof Error)
        message = error.message;
      else
        message = String(error)
      setLoginError(message);
      console.log(loginError);
    }
  }

  const handleEmailFieldChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>):void => {
    setEmail(e.target.value);
    if (isEmail(e.currentTarget.value)) {
      setIsValidEmail(true)
      setEmailError("");
    } else {
      setIsValidEmail(false)
      setEmailError(t('USER_SERVICES.REGISTER_EMAIL_ERROR'));
    }
    if (!e.currentTarget.value) {
      setIsValidEmail(true);
      setEmailError("");
    }
  };

  const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>):void => {
    if(e.target.value !== password) {
      setPasswordError(t('USER_SERVICES.REGISTER_PASSWORD_ERROR'));
      setIsValidPassword(false);
    } else {
      setPasswordError("");
      setIsValidPassword(true);
    }
    if(!e.target.value) {
      setIsValidPassword(false);
      setPasswordError("");
    }
  }

  return (
    <Container component="main" maxWidth="xs">
      <Box className={'box-wrapper'}>
        <Typography component="h1" variant="h5">
          {t('PAGE_INFO.NAME').toUpperCase()}
        </Typography>

        <Box
          component="form"
          noValidate
          onSubmit={handleFormSubmit}
          className={"form-wrapper"}
        >
          <Grid container>
            <Grid item xs={12} className="form-field-item-input">
              <ValidationTextField
                autoComplete="email"
                error={!!emailError}
                name="email"
                helperText={emailError}
                required
                fullWidth
                id="email"
                label={t('USER_SERVICES.EMAIL_ADDRESS')}
                autoFocus
                onChange={(e) => handleEmailFieldChange(e)}
              />
            </Grid>
            <Grid item xs={12} className="form-field-item-input"
            >
              <TextField
                required
                fullWidth
                id="password"
                label={t('USER_SERVICES.PASSWORD')}
                name="password"
                type="password"
                autoComplete="password"
                className={isValidPassword ? '.validation-text-field-success' : undefined}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} className="form-field-item-input">
              <TextField
                required
                fullWidth
                id="confirmPassword"
                label={t('USER_SERVICES.REPEAT_PASSWORD')}
                error={!!passwordError}
                helperText={passwordError}
                name="password"
                type="password"
                autoComplete="password"
                className={isValidPassword ? '.validation-text-field-success' : undefined}
                onChange={(e) => handleConfirmPasswordChange(e)}
              />
            </Grid>
            <Grid item xs={12} className="form-field-item-button">
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{mt: 3, mb: 2}}
                disabled={!isFormValid}
              >
                {t('USER_SERVICES.CREATE_ACCOUNT')}
              </Button>
            </Grid>
            <Grid item xs={12} className={"form-field-captions"}>
              <Typography variant="caption">
                <Link href="#" onClick={() => navigate("/recover-password")}>
                  {t('USER_SERVICES.FORGOT_PASSWORD')}
                </Link>
              </Typography>
              <Typography variant="caption">
                <Link href="#" onClick={() => navigate("/sign-in")}>
                  {t('USER_SERVICES.ALREADY_HAVE_AN_ACCOUNT')}
                </Link>
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default RegisterPage;
