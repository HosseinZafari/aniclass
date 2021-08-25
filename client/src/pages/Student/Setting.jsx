import StudentAppBar from "../../component/AppBars/StudentAppBar";
import {Box, Button, Divider, Grid, makeStyles, TextField} from "@material-ui/core";
import {useState} from "react";

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
  
  return  (
    <StudentAppBar active={4} title={'تنظیمات حساب کاربری'}>
      <Grid container justifyContent={'center'}>
        <Box boxShadow={2} borderRadius={10} component={Grid} bgcolor={'white'} item xs={8}>
            <form>
              <Grid container direction={'column'} className={classes.form}>
                <TextField  disabled={!edit} label={'نام'} variant={'standard'} color={'primary'} />
                <TextField disabled={!edit} label={'نام خانوادگی'} variant={'standard'} color={'primary'} />
                <TextField disabled={!edit} label={'کد ملی'} variant={'standard'} color={'primary'} />
                <TextField disabled={!edit} label={'ایمیل'} variant={'standard'} color={'primary'} />
                <TextField disabled={!edit} label={'شماره موبایل'} variant={'standard'} color={'primary'} />
                <TextField disabled={!edit} label={'رمز عبور'} variant={'standard'} color={'primary'} />
                
                <Button variant={'contained'} disabled={edit} color={'secondary'} onClick={() => setEdit(true)}>
                  ویرایش کردن
                </Button>
                <Button variant={'contained'} color={'primary'}>
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