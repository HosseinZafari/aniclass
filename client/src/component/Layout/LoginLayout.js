import React, { useState } from 'react'
import {
  Button,
  FormControlLabel,
  FormGroup,
  makeStyles,
  Switch,
  TextField
} from '@material-ui/core'
import { studentLogin, teacherLogin } from '../../apis/AuthApi'
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
  
const LoginLayout = (props) => {
  const [isTeacherForLogin, setIsTeacherForLogin] = useState(false)
  const [inputNationalCode, setInputNationalCode] = useState('')
  const [inputPassword, setInputPassword] = useState('')
  const [isNotify, setIsNotify] = useState({ msg: '', show: false })
  const [isError, setIsError] = useState({ msg: '', show: false })
  const classes = styles()
  
  
  const onChangeApi = (event) => {
    setIsTeacherForLogin(event.target.checked)
  }
  
  const onSubmitLogin = async (event) => {
    event.preventDefault()
    if (inputNationalCode === '' || inputNationalCode.length < 7) {
      return setIsNotify({
        show: true,
        msg: 'لطفا کد ملی خود را صحیح وارد نمایید'
      })
    }
    
    if (inputPassword === '' || inputPassword.length < 7) {
      return setIsNotify({
        show: true,
        msg: 'لطفا رمز عبور خود را صحیح وارد نمایید'
      })
    }
    
    try {
      let result = undefined
      if(isTeacherForLogin) {
        result = await studentLogin({
          nationalCode: inputNationalCode,
          password: inputPassword,
          deviceModel: window.navigator.platform || 'Other'
        })
      } else {
        result = await teacherLogin({
          nationalCode: inputNationalCode,
          password: inputPassword,
          deviceModel: window.navigator.platform || 'Other'
        })
      }
      
      const { msg, id, role, nationalCode, firstName, lastName, email, token } = result.data
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
      <form className={classes.form} autoComplete={false} onSubmit={onSubmitLogin}>
        <TextField id={'national_code'}
                   value={inputNationalCode}
                   onChange={(event) => setInputNationalCode(event.target.value)}
                   fullWidth={true}
                   type={'number'}
                   autoComplete={false}
                   size={'small'}
                   className={classes.inputItem}
                   variant={'outlined'}
                   label={'کد ملی'}/>
        
        
        <TextField
          id="standard-adornment-password"
          variant={'outlined'}
          size={'small'}
          autoComplete={false}
          value={inputPassword}
          onChange={(event) => setInputPassword(event.target.value)}
          fullWidth={true}
          label={'رمز عبور'}
          type={'password'}
        />
        <FormGroup>
          <FormControlLabel control={<Switch checked={isTeacherForLogin} onChange={onChangeApi}/>} label={'مدرس هستم'}/>
        </FormGroup>
        
        <Button variant={'contained'} color={'primary'} fullWidth type={'submit'} size={'large'}>
          ورود به حساب کاربری
          {/*<CircularProgress style={{marginRight: 10}} size={20} color={'white'} />*/}
        </Button>
        
        <Button variant={'text'} style={{ marginTop: -20,color: '#555' }} fullWidth size={'large'}>
          رمز عبور خود را فراموش کرده اید ؟
        </Button>
      </form>
    </>
  )
}

export default LoginLayout
