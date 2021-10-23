import { Button, FormControl, Grid, MenuItem, TextField, Typography } from '@material-ui/core'
import { Security } from '@material-ui/icons'
import React, { useEffect, useState } from 'react'
import SimpleSnackbar from '../Notify/SimpleSnackbar'
import { addDepartment, addUniversity,  getUniversitiesApi } from '../../apis/AuthApi'

const AddUniversityLayout = (props) => {
  const [securityCode , setSecurityCode] = useState('')
  const [universities , setUniversities] = useState([])
  const [selectedUniversity , setSelectedUniversity] = useState(-1)
  const [isNotify, setIsNotify] = useState({ msg: '', show: false })
  const [isError, setIsError] = useState({ msg: '', show: false })
  
  useEffect(() => {
    sync()
  } , [])
  
  const onSubmit = async (v) =>  {
    if(securityCode === '') {
      return setIsError({msg: 'لطفا کد امنیتی را وارد کنید' , show: true})
    }
    
    
    try {
      const result = await addDepartment(securityCode , selectedUniversity)
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
  
  
  const sync = async () => {
      try {
        const result = await getUniversitiesApi()
        if(result.data) {
          setUniversities(result.data.rows)
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
      <Grid justifyContent={'center'} style={{width: '100%' , height: '100%'}} >
        <Grid item xs={12} md={6} style={{margin: 'auto' ,height: '100%'}} >
          <Typography variant={'h6'} style={{textAlign: 'center' , marginBottom: 10}}>
            اضافه کردن دپارتمان
          </Typography>
          <FormControl color={'primary'} fullWidth style={{margin: 'auto'}}>
            <TextField
              id="standard-select-currency"
              select
              label="انتخاب دانشگاه"
              onChange={v => setSelectedUniversity(v.target.value.id)}
              variant="filled"
              helperText="دانشگاه مورد نظر برای استفاده از این دپارتمان را تعیین کنید"
            >
              {(universities).map((option) => (
                <MenuItem key={option.id} value={option}>
                  {option.name}
                </MenuItem>
              ))}
            </TextField>
          </FormControl>
          <FormControl color={'primary'}  fullWidth style={{margin: 'auto'}}>
            <TextField variant={'filled'} onChange={v => setSecurityCode(v.target.value)} label={'کد امنیتی دپارتمان'} color={'primary'} />
          </FormControl>
          <Button endIcon={<Security />} variant={'contained'} size={'large'} color={'secondary'} onClick={onSubmit} style={{marginTop: 10}}>
            شناسایی
          </Button>
        </Grid>
      </Grid>
    </>
  )
}


export default AddUniversityLayout
