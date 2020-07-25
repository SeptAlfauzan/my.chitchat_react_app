import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { Avatar, Button, CssBaseline, TextField, Grid, Box, Typography, makeStyles, Container } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import {useForm} from 'react-hook-form';

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
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const handleSubmit = (e) => {
  e.preventDefault();
  console.log('form submited');
}

const MainForm = (props)=>{

  
  const [data, setData] = useState({});
  const [emailUsedErr, setEmailUsedErr] = useState('');
  const [emailValid, setEmailValid] = useState(true);
  const emails = ['alfauzansepta@gmail.com'];

  const classes = useStyles();
  const {register, handleSubmit, errors} = useForm();

  const handleChangeEmail = (e) => {
    const checkEmail = emails.filter(email=> email == document.querySelector('#email').value).length;
    console.log(checkEmail);
    if (checkEmail > 0) {
      setEmailValid(false)
      setEmailUsedErr('Email already used');
    }else{
      setEmailValid(true);
      setEmailUsedErr('');
    }
  }

  const handleSubmited = (data) => {
    if (emailValid) {
      console.log(data);
      data.picture = 'gambar.jpg';
      console.log(data);
      props.nextStep();
    }
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form onSubmit={handleSubmit((data)=> handleSubmited(data))} className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <small style={{color: 'tomato'}}>{errors.firstName && errors.firstName.message}</small>
              <TextField inputRef={register({ required: "First name can't be blank" })} required autoComplete="fname" name="firstName" variant="outlined" required fullWidth id="firstName" label="First Name" autoFocus
              />
              </Grid>
            <Grid item xs={12} sm={6}>
              <small style={{color: 'tomato'}}>{errors.lastName && errors.lastName.message}</small>
              <TextField inputRef={register({required: "Last name can't be blank"})}
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="lname"
              />
            </Grid>
            <Grid item xs={12}>
              <small style={{color: 'tomato'}}>{errors.email && errors.email.message}{emailUsedErr}</small>
              <TextField onChange={handleChangeEmail} inputRef={register({required: "Email can't be blank", pattern: {value:  /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, message: "Invalid email address"}})}
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12}>
              <small style={{color: 'tomato'}}>{errors.username && errors.username.message}</small>              
              <TextField inputRef={register({required: "Username can't be blank", pattern: {value: ['1', '2', 'a'], message: "Username already taken" }})} variant="outlined" required fullWidth id="username" label="Username" name="username" autoComplete="username" />
            </Grid>
            <Grid item xs={12}>              
              <small style={{color: 'tomato'}}>{errors.password && errors.password.message}</small>
              <TextField inputRef={register({required: "Password can't be blank", minLength: {value: 8, message: "Your password is to short, min 8 letter"}})} variant="outlined" required fullWidth name="password" label="Password" type="password" id="password" autoComplete="current-password"
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Next Step
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link to="/signin">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}
export default MainForm;