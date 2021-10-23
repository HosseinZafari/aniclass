import { Button, FormControl, Grid, TextField, Typography } from '@material-ui/core'
import { Security } from '@material-ui/icons'
import React, { useState } from 'react'
import SimpleSnackbar from '../Notify/SimpleSnackbar'
import { addUniversity } from '../../apis/AuthApi'

const AddUniversityLayout = (props) => {
  const [securityCode , setSecurityCode] = useState('')
  const [isNotify, setIsNotify] = useState({ msg: '', show: false })
  const [isError, setIsError] = useState({ msg: '', show: false })
  
  const onSubmit = async (v) => {
    if(securityCode === '') {
      return setIsError({msg: 'لطفا کد امنیتی را وارد کنید' , show: true})
    }
    
    
    try {
      const result = await addUniversity(securityCode)
      if(result.data) {
        setIsNotify({msg: result.data.msg , show: true})
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
      {isNotify.show && (<SimpleSnackbar message={isNotify.msg} onClose={() => setIsNotify({ msg: '', show: false })} color={'success'} />)}
      {isError.show && (<SimpleSnackbar message={isError.msg} onClose={() => setIsError({msg: '',show: false })} color={'error'}/>)}
      <Grid justifyContent={'center'} >
        <Grid item xs={12} md={6} style={{margin: 'auto'}}>
          <Typography variant={'h6'} style={{textAlign: 'center' , marginBottom: 10}}>
            اضافه کردن دانشگاه
          </Typography>
        
          <FormControl color={'primary'}  fullWidth style={{margin: 'auto'}}>
            <TextField variant={'filled'}
                       onChange={(v) => setSecurityCode(v.target.value)}
                       label={'کد امنیتی دانشگاه'}
                       color={'primary'} />
          </FormControl>
          
          <Button endIcon={<Security />} onClick={onSubmit} variant={'contained'} size={'large'} color={'secondary'} style={{marginTop: 10}}>
            شناسایی
          </Button>
        </Grid>
      </Grid>
    </>
  )
}


export default AddUniversityLayout
