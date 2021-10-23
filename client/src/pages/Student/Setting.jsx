import StudentAppBar from "../../component/AppBars/StudentAppBar";
import {Box, Button, Divider, Grid, makeStyles, TextField} from "@material-ui/core";
import React, {useState} from "react";
import { useDispatch, useSelector } from 'react-redux'
import { setUser, userSelector } from '../../redux/reducers/UserSlice'
import SimpleSnackbar from '../../component/Notify/SimpleSnackbar'
import { studentUpdate } from '../../apis/AuthApi'

const Style = makeStyles({
  form: {
    '& > *': {
      marginTop: 15 ,
      marginRight: 55 ,
      marginLeft: 55
    }
  }
})

const Setting = () =>  {
  const classes = Style()
  const [edit , setEdit] = useState(false)
  const [isNotify, setIsNotify] = useState({ msg: '', show: false })
  const userInfo = useSelector(userSelector)
  const [firstName , setFirstName]  = useState(userInfo.firstName)
  const [lastName , setLastName]    = useState(userInfo.lastName)
  const [nationalCode , setNationalCode]  = useState(userInfo.nationalCode)
  const [email , setEmail]  = useState(userInfo.email)
  const [password , setPassword]  = useState('')
  const [isError, setIsError] = useState({ msg: '', show: false })
  const dispatch = useDispatch()
  
  const update = async (e) => {
    e.preventDefault()
    
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
    
    try {
      const result = await studentUpdate(firstName , lastName ,  email , nationalCode , password)
      if(result.data && result.data.role === 'student') {
        const { msg, id, role, nationalCode, firstName, lastName, email, token } = await result.data
        setIsNotify({msg , show: true})
        dispatch(setUser({id , role , nationalCode , firstName , lastName , email , token , isLogin: true}))
      }
    } catch (error) {
      if (error.response) {
        const data = error.response.data
        if (data.code !== 422 && data.code < 500) {
          setIsError({
            msg: data.msg,
            show: true
          })
        } else {
          console.log(data)
          setIsError({
            msg:  ' ' + 'لطفا اطلاعات را صحیح وارد نمایید.',
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
  
  
  return  (
    <StudentAppBar active={4} title={'تنظیمات حساب کاربری'}>
      {isError.show && (<SimpleSnackbar message={isError.msg} onClose={() => setIsError({
        msg: '',
        show: false
      })} color={'error'}/>)}
      {isNotify.show && (<SimpleSnackbar message={isNotify.msg} onClose={() => setIsNotify({ msg: '', show: false })} color={'warning'}/>)}
  
      <Grid container justifyContent={'center'}>
        <Box boxShadow={2} borderRadius={10} component={Grid} bgcolor={'white'} item xs={8}>
            <form onSubmit={update}>
              <Grid container direction={'column'} className={classes.form}>
                <TextField  disabled={!edit} label={'نام'} variant={'standard'}
                            onChange={(v) => setFirstName(v.target.value)}
                            value={firstName} color={'primary'} />
                <TextField disabled={!edit} label={'نام خانوادگی'} variant={'standard'}
                           onChange={(v) => setLastName(v.target.value)}
                           value={lastName} color={'primary'} />
                <TextField disabled={!edit} label={'کد ملی'} variant={'standard'}
                           onChange={(v) => setNationalCode(v.target.value)}
                           value={nationalCode} color={'primary'} />
                <TextField disabled={!edit} label={'ایمیل'} variant={'standard'}
                           onChange={(v) => setEmail(v.target.value)}
                           value={email} color={'primary'} />
                <TextField disabled={!edit}
                           label={'رمز عبور'}
                           type={'password'}
                           value={password} onChange={(v) => setPassword(v.target.value)}
                           variant={'standard'}  color={'primary'} />
                
                <Button variant={'contained'} disabled={edit} color={'secondary'} onClick={() => setEdit(true)}>
                  ویرایش کردن
                </Button>
                <Button variant={'contained'} color={'primary'} disabled={!edit} type={'submit'}>
                  ذخیره
                </Button>
              </Grid>
            </form>
        </Box>
      </Grid>
    </StudentAppBar>
  )
}


export default Setting
