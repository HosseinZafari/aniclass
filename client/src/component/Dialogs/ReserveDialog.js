import React, { useState } from 'react'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle, TextField
} from "@material-ui/core";
import {PrimaryButton, SecondaryTextButton} from "../Button/Buttons";

const RegisterDialog = (props) =>  {
  const [value , setValue] = useState('')
  
  return (
    <Dialog open={props.open} onClose={props.onClose} aria-labelledby={'Register User'}>
      <DialogTitle>
        کد امنیتی
      </DialogTitle>
      
      <DialogContent>
        <DialogContentText>
          کد امنیتی خود را برای ثبت نام وارد نمایید.
        </DialogContentText>
        <TextField
          id={'secure_code'}
          onChange={v => setValue(v.target.value)}
          autoFocus
          margin={'dense'}
          fullWidth
          label={'کد امنیتی'}
        />
      </DialogContent>
      
      <DialogActions style={{margin: 10}} onSubmit={(v) => {
        v.preventDefault()
      }}>
        <Button variant={'contained'} onClick={(v) => props.onSend(value)} color={'primary'}> ثبت کد امنیتی</Button>
        <Button variant={'text'} color={'default'} onClick={props.onClose}>لغو</Button>
      </DialogActions>
    </Dialog>
  );
}

export default RegisterDialog;