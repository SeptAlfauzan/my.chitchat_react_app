import React, { useState } from 'react';
// material UI
import { Link } from 'react-router-dom';
import {Avatar, Button, CssBaseline, TextField, FormControlLabel, Checkbox, Grid, Box, Typography, makeStyles, Container } from '@material-ui/core';
// icons
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { useForm } from 'react-hook-form';
import dotenv from 'dotenv';
dotenv.config();

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '90%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const Login = ()=>{

  const {register, handleSubmit, errors} = useForm();
  const [emailNotRegistered, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const classes = useStyles();

  const handleSubmited = async (data) => {
//  reset the login error
    setEmailError('');
    setPasswordError('');

    fetch(process.env.REACT_APP_API_LOGIN, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }).then(response => response.json()).then((result)=>{
      const res = result;
      if (!res.result) {
        // check what error was
        const whatError = res.kind_of_error;
        const error = res.detail;
        if (whatError === 'email') {
          setEmailError(error)
        } else{
          setPasswordError(error)
        }
      }else{
        console.log(res);
        console.log('login allowed');
      }
    }).catch(err=>console.log(err))
    
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form onSubmit={handleSubmit((data)=>handleSubmited(data))} className={classes.form} noValidate>
            <small style={{color: 'tomato'}}>{errors.email && errors.email.message}{emailNotRegistered}</small>
            <TextField
            variant="outlined"
            margin="normal" required fullWidth type="email" id="email" label="Email Address" name="email" autoComplete="email" autoFocus inputRef={register({required: "Email can't be blank", pattern: {value:  /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, message: "Invalid email address"}})}
            />
            <small style={{color: 'tomato'}}>{errors.password && errors.password.message}{passwordError}</small>
            <TextField
            variant="outlined" margin="normal" required fullWidth name="password" label="Password" type="password" id="password" autoComplete="current-password" inputRef={register({required: "password can't be blank", minLength: {value: 8, message: "Password too short, min 8 letter"}})}
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="secondary"
            className={classes.submit}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link to="/forgot-password" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link to="/signup" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}

export default Login;