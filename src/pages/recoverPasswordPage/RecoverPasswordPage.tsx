import React, {useState} from 'react';
import {Box, Button, CircularProgress, Container, Grid, Link, TextField, Typography} from "@mui/material";
import {useTranslation} from "react-i18next";
import {useNavigate} from "react-router-dom";
import {UserAuth} from "../../context/AuthContext";


const RecoverPasswordPage = () => {
  const navigate = useNavigate();
  const {t} = useTranslation();
  const {sendRecoveryPasswordMail}: any = UserAuth();

  const [recoverPasswordState, setRecoverPasswordState] = useState({
    email: "",
    isLoading: false,
    isFinished: false,
    error: "",
    emailError: ""
  });

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setRecoverPasswordState({
      ...recoverPasswordState,
      isLoading: true
    });

    try {
      sendRecoveryPasswordMail(recoverPasswordState.email).then(() => {
        setRecoverPasswordState({
          ...recoverPasswordState,
          isLoading: false,
          isFinished: true,
          error: "",
          emailError: ""
        });
      });
    } catch (error) {
      let message: string;
      if (error instanceof Error)
        message=error.message;
      else
        message= String(error)

      setRecoverPasswordState({
        ...recoverPasswordState,
        isLoading: false,
        isFinished: false,
        error: t('GLOBAL_MESSAGES.BASIC_ERROR'),
        emailError: message
      });

      console.log(message);

    }
  }

  return (
    <>
      <Container component="main" maxWidth="xs">
        <Box className={'box-wrapper'}>
          <Typography component="h1" variant="h5">
            {recoverPasswordState.isFinished
              ? t('USER_SERVICES.RECOVER_PASSWORD_MESSAGE', {email: recoverPasswordState.email})
              : t('USER_SERVICES.RECOVER_PASSWORD_HEADING').toUpperCase()
            }
          </Typography>
          {!recoverPasswordState.isFinished &&
              <Box
                  component="form"
                  noValidate
                  className={"form-wrapper"}
                  onSubmit={handleFormSubmit}
              >
                  <Grid container>
                      <Grid item xs={12} className="form-field-item-input">
                          <TextField
                              autoComplete="email"
                              name="email"
                              required
                              fullWidth
                              id="email"
                              label={t('USER_SERVICES.EMAIL_ADDRESS')}
                              autoFocus
                              onChange={(e) => setRecoverPasswordState({
                                ...recoverPasswordState,
                                email: e.target.value
                              })}
                          />
                      </Grid>
                      <Grid item xs={12} className="form-field-item-button">
                        {!recoverPasswordState.isLoading &&
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{mt: 3, mb: 2}}
                            >
                              {t('USER_SERVICES.RECOVER_PASSWORD')}
                            </Button>
                        }
                        {recoverPasswordState.isLoading && <CircularProgress/>}
                      </Grid>
                  </Grid>
              </Box>
          }
          <Grid item xs={12} className={"recover-password-form-field-captions"}>
            <Typography variant="caption">
              <Link href="#" onClick={() => navigate("/sign-in")}>
                {recoverPasswordState.isFinished
                  ? t('USER_SERVICES.RETURN_TO_SIGN_IN')
                  : t('ACTIONS.CANCEL')
                }
              </Link>
            </Typography>
          </Grid>
        </Box>
      </Container>
    </>
  );
};

export default RecoverPasswordPage;
