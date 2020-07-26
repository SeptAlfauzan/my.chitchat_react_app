import React, {useState} from 'react';
import { useForm } from 'react-hook-form';
import { Button, CssBaseline, Grid, Typography, makeStyles, Container} from '@material-ui/core';
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
import AlertDialog from './AlertDialog';
import dotenv from 'dotenv';
import { useHistory } from 'react-router-dom';
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
  // console.log('get data from props', props.values);
  // console.log(props.values.profile_pic);

  let history = useHistory();
  
  const [message, setMessage] = useState('');
  const [open, setOpen] = useState(false);
  const [registered, setRegistered] = useState(false);
  const {register, handleSubmit} = useForm();
  
  const handleClose = () => {
    // handleclose dialog box 
    if (registered === true) {
      history.push('/signin');
      // push back to signin link
    }else{
      setOpen(false);
    }
  }
  const classes = useStyles();
  
  const handleBack = () => {
    // handle to previous form
      props.prevStep();
  }

  const postRegister = async (data) => {
    fetch(process.env.REACT_APP_API_USERS, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }).then(response => response.json()).then(result => {
        console.log(result);
        setMessage('Register success! now check your email to verifycation.');
        // succesfully register
        setRegistered(true);
        // set registered state
        setOpen(true)
        // trigger alert dialog
    }).catch(err => {
      console.log(err);
    })
  }

  const handleSubmited = (data) => {
    setMessage('');
    if (data.profile.length>0) {
      const file = new FormData();
      const imageFile = data.profile[0];
      file.append('file', imageFile);
      // upload image to API
      fetch(process.env.REACT_APP_API_UPLOAD_AVATAR, 
      {
        method: 'POST',
        body: file
      }).then(response => response.json()).then(result => {
        // handle image upload error
        if (result.image_error) {
          setMessage('Image size too large, min 2mb');
          // image size too large
          setOpen(true)
          // trigger alert dialog
        }
        props.values.profile_pic = result.fileName
        // set images filename to props
        postRegister(props.values);
        // registered with image
      }).catch(err=>{
        setMessage(err);
        // set error message to user
        setOpen(true)
        // trigger alert dialog
      }
      );
      //   props.nextStep();
    }else{
      postRegister(props.values);
      // registered without image
    }

    console.log('RESULT DATA', props.values);
    // register data from props to API
    
  }

  const handleOnchange = (e)=>{
    if(e.target.files[0] !== undefined){
      console.log(e.target.files[0]);
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
  
      <AlertDialog handleClose={handleClose} open={open} errorMessage={message} />

      <CssBaseline />
      <div className={classes.paper}>

      <form onSubmit={handleSubmit((data) => handleSubmited(data))} className={classes.form} noValidate>
      <Grid container spacing={2}>
        <Grid item xs={12} className={classes.paper}>
          <Button variant="contained"
          component="label" className={classes.avatar}>
            <img id="output" src="" alt="avatar" className="avatar-picture hidden"/>
            <AddAPhotoIcon id="icon-picture" color="disabled" style={{ fontSize:90 }} />
            <input ref={register} onChange={handleOnchange}
              type="file"
              style={{ display: "none" }} name="profile" accept="image/png, image/jpeg" />
          </Button>            
          <Typography component="h1" variant="h5">
            Upload your profile picture
          </Typography>
        </Grid>
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