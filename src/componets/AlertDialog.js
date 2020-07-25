import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogContentText, Button } from '@material-ui/core';

const AlertDialog = (props) => {
    return ( 
        <Dialog
        open={props.open}
        onClose={props.handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description">
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    <h3>{props.errorMessage}</h3>
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={props.handleClose} color="secondary">
                    Ok
                </Button>
            </DialogActions>
        </Dialog>
     );
}
 
export default AlertDialog;