import { Dialog, DialogContent, DialogContentText, DialogTitle, Typography } from '@material-ui/core'
import React from 'react'

const ResponseDialog = (props)=> {
    return (
        <Dialog open={props.showDialog} onClose={props.handleCloseBox} fullWidth={true}>
        <DialogTitle id="alert-dialog-title">Status</DialogTitle>
        <DialogContent>
          <DialogContentText>
            <Typography style={{ fontWeight: 500 }}>{props.dialogContent}</Typography>
          </DialogContentText>
        </DialogContent>
      </Dialog>
    )
}

export default ResponseDialog
