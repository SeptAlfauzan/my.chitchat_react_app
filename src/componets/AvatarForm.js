import React, {useState} from 'react';
import { Link } from 'react-router-dom';

import { Button, CssBaseline, TextField, Grid, Box, Typography, makeStyles, Container, Input } from '@material-ui/core';
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';


function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    width: '150px',
    height: '150px',
    objectFit: 'cover',
    borderRadius: '150px'
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const AvatarForm = (props)=>{
  const [avatar, setAvatar] = useState(true);

  const classes = useStyles();

  console.log(props);
  const handleBack = () => {
      props.prevStep();
  }
  const handleSubmit = (e) => {
    //   props.nextStep();
    console.log(e.target.input);
      e.preventDefault();
  }

  const handleOnchange = (e)=>{
    if(e.target.files[0] != undefined){
      const imageUrl = window.URL.createObjectURL(e.target.files[0]);
      const addImageIcon = document.getElementById('icon-picture');
      const imageContainer = document.getElementById('output');
      addImageIcon.classList.add('hidden');
      imageContainer.classList.remove('hidden');
      imageContainer.src = imageUrl;
    }
  }



  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>

      <Button variant="contained"
      component="label" className={classes.avatar}>
          <img id="output" src="" className="avatar-picture hidden"/>
          <AddAPhotoIcon id="icon-picture" color="disabled" style={{ fontSize:90 }} />
          <input onChange={handleOnchange}
            type="file"
            style={{ display: "none" }} accept="image/png, image/jpeg" />
        </Button>            
        <Typography component="h1" variant="h5">
          Upload your profile picture
        </Typography>
        <form onSubmit={handleSubmit} className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <p style={{textAlign: 'center'}} >you can skip this step</p>
            </Grid>
            <Grid item xs={6}>
              <Button onClick={handleBack}
                  fullWidth
                  variant="outlined"
                  color="primary"
                  className={classes.submit}>
                  Go Back
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}>
                  Sign Up
              </Button>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}
export default AvatarForm;