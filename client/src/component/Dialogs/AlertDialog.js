import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from '@material-ui/core'

const AlertDialog = (props) => {
  
  
  return (
    <Dialog
      open={true}
      onClose={(v) => props.onClose()}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        {props.title}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {props.detail}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={(v) => props.onClose()}>لغو</Button>
        <Button color={'primary'} onClick={(v) => {
          props.onSubmit()
          props.onClose()
        }} autoFocus>
          تایید
        </Button>
      </DialogActions>
    </Dialog>
  )
  
}


export default AlertDialog
