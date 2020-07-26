import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { Avatar, Button, CssBaseline, TextField, Grid, Box, Typography, makeStyles, Container } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import {useForm} from 'react-hook-form';
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
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));


const MainForm = (props)=>{

  const [inputData, setInputData] = useState(props.defaultValue);
  // set input data save to state, to prevent it gone
  const [emailUsedErr, setEmailUsedErr] = useState('');
  // state to tell that email already used
  const [emailValid, setEmailValid] = useState(true);
  // dummy email taken
  const emails = [];

  const classes = useStyles();
  const {register, handleSubmit, errors} = useForm();

  const getEmailUsed = async () => {
    fetch(process.env)
  }

  const handleChangeEmail = (e) => {
    const checkEmail = emails.filter(email=> email === document.querySelector('#email').value).length;
    // check if email that user type is already used or not
    if (checkEmail > 0) {
      // set email error
      setEmailValid(false)
      setEmailUsedErr('Email already used');

      props.handleChange({nama: 'septa'});
    }else{
      // email is not used before
      setEmailValid(true);
      setEmailUsedErr('');
    }
  }
  const handleSubmited = (data) => {
    if (emailValid) {
      console.log('data from main form', data);
      data.profile_pic = '';
      data.verified = false;
      props.handleChange(data);
      // set value to state, prevent losing all value when user click go back button in next form
      props.nextStep();
      // move to next form
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

              <TextField error={errors.firstName? true: false} inputRef={register({ required: "First name can't be blank" })} required autoComplete="fname" name="firstName" variant="outlined" required fullWidth id="firstName" label="First Name" autoFocus
              defaultValue={inputData.firstName}
              />

            </Grid>

            <Grid item xs={12} sm={6}>
              
              <small style={{color: 'tomato'}}>{errors.lastName && errors.lastName.message}</small>

              <TextField error={errors.lastName? true : false} inputRef={register({required: "Last name can't be blank"})}
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="lname"
                defaultValue={inputData.lastName}
              />
              
            </Grid>
            
            <Grid item xs={12}>
            
              <small style={{color: 'tomato'}}>{errors.email && errors.email.message}{emailUsedErr}</small>
              
              <TextField error={errors.email? true : false} onChange={handleChangeEmail} inputRef={register({required: "Email can't be blank", pattern: {value:  /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, message: "Invalid email address"}})}
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                defaultValue={inputData.email}
                />
            
            </Grid>
            
            <Grid item xs={12}>
            
              <small style={{color: 'tomato'}}>{errors.username && errors.username.message}</small>              
              
              <TextField error={errors.username? true : false} inputRef={register({required: "Username can't be blank", pattern: {value: ['1', '2', 'a'], message: "Username already taken" }})} variant="outlined" required fullWidth id="username" label="Username" name="username" autoComplete="username" 
              defaultValue={inputData.username}/>
            
            </Grid>

            <Grid item xs={12}>              
              
              <small style={{color: 'tomato'}}>{errors.password && errors.password.message}</small>
              
              <TextField error={errors.password? true : false} inputRef={register({required: "Password can't be blank", minLength: {value: 8, message: "Your password is to short, min 8 letter"}})} variant="outlined" required fullWidth name="password" label="Password" type="password" id="password" autoComplete="current-password"
              defaultValue={inputData.password}/>
            
            </Grid>
          
          </Grid>
          
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}>
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