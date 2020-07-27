import React from 'react';
import { Input , makeStyles, Button, Grid } from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';

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
        bottom: 0,
        marginBottom: '30px',
        position: 'fixed',
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

const ChatContainer = () => {
    const classes = useStyles();

    return (
        <div id="chat-container">
            <div className="talk-bubble-left round">
                <div className="talktext">
                    <h5>Name</h5>
                    <p>This one adds a right triangle on the left, flush at the top by using .tri-right and .left-top to specify the location.</p>
                    </div>
                </div>
            <div className="talk-bubble-right round">
                <div className="talktext">
                    <h5>Name</h5>
                    <p>This </p>
                </div>
            </div>
            <form onSubmit="" className={classes.form} noValidate>
            <Grid container spacing={0}>
                <Grid item xs={9}> 
                    <Input  variant="outlined" fullWidth placeholder="Type message" 
                    borderRadius="50%"
                    className={classes.chatBox}
                    id="chat-box" name="chat-box" />
                </Grid>  
                <Grid item xs={1}> 
                    <Button
                    type="submit"
                    placeholder="Type message"
                    fullWidth
                    color="primary"
                    id="send-button">
                    <SendIcon/>
                    </Button>
                </Grid>  
            </Grid>
            </form>
        </div>

);
}

export default ChatContainer;