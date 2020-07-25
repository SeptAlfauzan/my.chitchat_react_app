import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogContentText, Button } from '@material-ui/core';

const LogoutDialog = (props) => {
    return ( 
        <Dialog
        open={props.open}
        onClose={props.handleClose}
        aria-labeledby="alert-dialog-title"
        aria-describedby="alert-dialog-description">
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    <h3>Are yout sure want to logout?</h3>
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={props.handleClose} color="primary">
                    No
                </Button>
                <Button onClick={props.handleLogout} color="secondary">
                    Yes, i wanna logout
                </Button>
            </DialogActions>
        </Dialog>
     );
}
 
export default LogoutDialog;