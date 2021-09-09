import TeacherAppBar from "../../component/AppBars/TeacherAppBar";
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
    <TeacherAppBar active={4} title={'تنظیمات حساب کاربری'}>
      <Grid container justifyContent={'center'}>
        <Box boxShadow={2} borderRadius={10} component={Grid} bgcolor={'white'} item xs={8}>
            <form>
              <Grid container direction={'column'} className={classes.form}>
                <TextField  disabled={!edit} label={'نام'} variant={'outlined'} color={'primary'} />
                <TextField disabled={!edit} label={'نام خانوادگی'} variant={'outlined'} color={'primary'} />
                <TextField disabled={!edit} label={'کد ملی'} variant={'outlined'} color={'primary'} />
                <TextField disabled={!edit} label={'ایمیل'} variant={'outlined'} color={'primary'} />
                <TextField disabled={!edit} label={'شماره موبایل'} variant={'outlined'} color={'primary'} />
                <TextField disabled={!edit} label={'رمز عبور'} variant={'outlined'} color={'primary'} />
                
                <Button variant={'contained'} disabled={edit} color={'secondary'} onClick={() => setEdit(true)}>
                  ویرایش کردن
                </Button>
                <Button variant={'contained'} color={'primary'}>
                  ذخیره
                </Button>
                <Button variant={'outlined'}  color={'secondary'} >
                  اضافه کردن دپارتمان
                </Button>
                <Button variant={'outlined'} color={'secondary'}  >
                  اضافه کردن دانشگاه
                </Button>
              </Grid>
            </form>
  
        </Box>
      </Grid>
    </TeacherAppBar>
  )
}


export default Setting