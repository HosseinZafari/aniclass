import {
  Button,
  FormControlLabel,
  FormGroup,
  makeStyles,
  Switch,
  TextField
} from '@material-ui/core'
import RegisterDialog from '../Dialogs/RegisterDialog'
import React, { useState } from 'react'
import { studentLogin, studentSignup, teacherLogin, teacherSignup } from '../../apis/AuthApi'
import SimpleSnackbar from '../Notify/SimpleSnackbar'

const styles = makeStyles({
  root: {
    width: '',
  },
  form: {
    flexGrow: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: '100%',
    "& > *": {
      marginBottom: 30,
      marginRight: 10,
    }
  },
});


const SignupLayout =  (props) => {
  const [isShowDialog , setIsShowDialog ] = useState(false);
  const [isError , setIsError ] = useState({msg: '' , show: false});
  const [isNotify , setIsNotify ] = useState({msg: '' , show: false});
  const [isTeacherForSignup , setIsTeacherForSignup ] = useState(false);
  const [nationalCode , setNationalCode ] = useState('');
  const [firstName , setFirstName ] = useState('');
  const [lastName , setLastName ] = useState('');
  const [email , setEmail ] = useState('');
  const [password , setPassword ] = useState('');
  const [confirmPassword , setConfirmPassword ] = useState('');
  const classes = styles()
  
  const onChangeApi = (event) => {
    setIsTeacherForSignup(event.target.checked)
  }
  
  const onRegisterSubmit = async (qrcode) => {
    setIsShowDialog(false)
    if(qrcode === ''){
      return setIsNotify({
        show: true,
        msg: 'لطفا کد امنیتی خود را وارد کنید'
      })
    }
    
    if (nationalCode === '' || nationalCode.length < 7) {
      return setIsNotify({
        show: true,
        msg: 'لطفا کد ملی خود را صحیح وارد نمایید'
      })
    }
    
    if (firstName === '') {
      return setIsNotify({
        show: true,
        msg: 'نام خود را وارد کنید'
      })
    }
    
    if (lastName === '') {
      return setIsNotify({
        show: true,
        msg: 'نام خانوادگی خود را وارد نمایید'
      })
    }
  
    if (email === '') {
      return setIsNotify({
        show: true,
        msg: 'ایمیل خود را وارد کنید'
      })
    }
    
    if (password === '' || password.length < 7) {
      return setIsNotify({
        show: true,
        msg: 'لطفا رمز عبور خود را صحیح وارد نمایید'
      })
    }
  
    if (password !== confirmPassword ) {
      return setIsNotify({
        show: true,
        msg: 'رمز عبور و تکرار آن یکسان نمیباشد'
      })
    }
  
    const requestData = {
      nationalCode: nationalCode,
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
      qrcode: qrcode,
      deviceModel: window.navigator.platform || 'Other'
    }
    
    try {
      let resultApi = null
      if(isTeacherForSignup) {
        resultApi = await teacherSignup(requestData)
      } else {
        resultApi = await studentSignup(requestData)
      }
    
      const { msg, id, role, nationalCode, firstName, lastName, email, token } = resultApi.data
      console.log('hello')
      props.onSuccess({id , role , nationalCode , firstName , lastName , email , token})
    } catch (error) {
      if (error.response) {
        const data = error.response.data
        if (data.code !== 422 && data.code < 500) {
          setIsError({
            msg: data.msg,
            show: true
          })
        } else {
          setIsError({
            msg: 'لطفا اطلاعات را صحیح وارد نمایید.',
            show: true
          })
        }
      } else {
        setIsError({
          msg: 'مشکلی در برقراری ارتباط به وجود آمده',
          show: true
        })
      }
    }
  
  
  }
  
  return (
    <>
      {isNotify.show && (<SimpleSnackbar message={isNotify.msg} onClose={() => setIsNotify({ msg: '', show: false })} color={'warning'}/>)}
      {isError.show && (<SimpleSnackbar message={isError.msg} onClose={() => setIsError({msg: '',show: false })} color={'error'}/>)}
    <form className={classes.form} autoComplete={false} onSubmit={(v) => v.preventDefault()}>
      <TextField id={'national_code'}
                 onChange={(v) => setNationalCode(v.target.value)}
                 fullWidth={true}
                 type={'number'}
                 autoComplete={false}
                 size={'small'}
                 variant={'outlined'}
                 label={'کد ملی'}/>
      <TextField id={'name'}
                 onChange={(v) => setFirstName(v.target.value)}
                 fullWidth={true}
                 size={'small'}
                 autoComplete={false}
                 variant={'outlined'}
                 label={'نام'}/>
      <TextField id={'family'}
                 onChange={(v) => setLastName(v.target.value)}
                 fullWidth={true}
                 size={'small'}
                 autoComplete={false}
                 variant={'outlined'}
                 label={'نام خانوادگی'}/>
      <TextField id={'email'}
                 fullWidth={true}
                 onChange={(v) => setEmail(v.target.value)}
                 size={'small'}
                 type={'email'}
                 autoComplete={false}
                 variant={'outlined'}
                 label={'ایمیل'}/>
      <TextField
        id="password"
        variant={'outlined'}
        onChange={(v) => setPassword(v.target.value)}
        size={'small'}
        autoComplete={false}
        fullWidth={true}
        label={'رمز عبور'}
        type={'password'}/>
    
      <TextField
        id="confirm-password"
        onChange={(v) => setConfirmPassword(v.target.value)}
        variant={'outlined'}
        autoComplete={false}
        fullWidth={true}
        label={'تکرار رمز عبور'}
        size={'small'}
        type={'password'}/>
  
      <FormGroup>
        <FormControlLabel control={<Switch checked={isTeacherForSignup} onChange={onChangeApi}/>} label={'مدرس هستم'}/>
      </FormGroup>
      
      <Button variant={'contained'}
              onClick={v => setIsShowDialog(true)}
              fullWidth
              color={'primary'}
              size={'large'}
      >
        ایجاد حساب کاربری
        { /*<CircularProgress style={{marginRight: 10}} size={20} color={'white'} />*/ }
      </Button>
      <RegisterDialog
        onClose={() => setIsShowDialog(false)}
        open={isShowDialog}
        onSend={(value) => onRegisterSubmit(value)}
      />
    </form>
  </>
)
}



export default SignupLayout
