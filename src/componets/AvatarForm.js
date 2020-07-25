import React, {useState} from 'react';
import { useForm } from 'react-hook-form';
import { Button, CssBaseline, Grid, Typography, makeStyles, Container} from '@material-ui/core';
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
import AlertDialog from './AlertDialog';
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
  
  const [imageEror, setImageError] = useState('');
  const [open, setOpen] = useState(false);
  
  const {register, handleSubmit} = useForm();
  
  const handleClose = () => {
    // handleclose dialog box 
    setOpen(false)
  }
  const classes = useStyles();
  
  const handleBack = () => {
    // handle to previous form
      props.prevStep();
  }

  const handleSubmited = (data) => {
    setImageError('');
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
          setImageError('Image size too large, min 2mb');
          // image size too large
          setOpen(true)
          // trigger alert dialog
        }
        console.log(result);
      }).catch(err=>console.log(err));
      //   props.nextStep();
    }else{
      console.log('no image');
    }
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
      <AlertDialog handleClose={handleClose} open={open} errorMessage={imageEror} />
    </Container>
  );
}
export default AvatarForm;