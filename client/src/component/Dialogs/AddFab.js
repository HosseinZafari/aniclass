import {
  AppBar, Button,
  Dialog, Fade, FormControl, FormControlLabel, Grid,
  IconButton, Input, InputAdornment, InputLabel,
  makeStyles, MenuItem, Select,
  Slide, Switch, Tab, TextField,
  Toolbar,
  Typography
} from "@material-ui/core";
import React from 'react';
import {useState} from "react";
import {AccountCircle, AddBox, Close, Code, Security} from "@material-ui/icons";
import {TabContext, TabList, TabPanel} from "@material-ui/lab";
import {DatePicker, TimePicker} from "@material-ui/pickers";
import moment from "moment";
import jMoment from "moment-jalaali";
import HourAccessTable from "../Tables/Teacher/HourAccessTable";

const Styles = makeStyles( {
  appbar : {
    background: '#f5f5f5' ,
    position: 'relative' ,
  } ,
  title: {
    color: '#444' ,
    position: 'absolute' ,
    right: '45%' ,
  } ,
  main: {
    width: '100%' ,
    height: '100%'
  } ,
  formControl: {
    minWidth: '100%' ,
    margin: '10px auto'
  }
})

const AddFab = (props) => {
  const [value , setValue] = useState(1)
  const [selectedDate, handleDateChange] = useState(moment());
  const [date, setDate] = useState(new Date());
  
  const [isOnChange , setIsOnChange] = useState(false)
  const classes = Styles()
  
  const onChange = (event , newValue) => {
    setIsOnChange(true)
    setValue(newValue)
  }
  
  return (
    <Dialog open={true} fullScreen onClose={props.onClose} >
      <AppBar className={classes.appbar}>
        <Toolbar variant={'dense'}>
          <IconButton edge="start" color="primary" onClick={props.onClose} aria-label="close" >
            <Close />
          </IconButton>
          
          <Typography varient={'h6'} className={classes.title}>
            یک رویکرد را انتخاب کنید...
          </Typography>
        </Toolbar>
      </AppBar>
      
      <TabContext value={value} className={classes.main}>
        <AppBar position="sticky" color={'primary'}>
          <TabList variant={'fullWidth'} onChange={onChange} focusRipple={true} textColor={'white'} indicatorColor={'secondary'} >
            <Tab label={'ایجاد کلاس جدید'} value={1}/>
            <Tab label={'اضافه کردن جلسه'} value={2}/>
            <Tab label={'اضافه کردن دپارتمان'} value={3}/>
            <Tab label={'اضافه کردن دانشگاه'} value={4}/>
          </TabList>
        </AppBar>
        
        <TabPanel value={1} >
          <Typography variant={'h6'} style={{textAlign: 'center'}}>
            اضافه کردن کلاس
          </Typography>
          
          <Grid container justifyContent={'center'}>
            <Grid item xs={12} md={8} style={{margin: 'auto'}}>
              <TextField  style={{marginTop: 10}} fullWidth size={'small'}  variant={'filled'} label={'نام درس'} />
            </Grid>
            
            <Grid item xs={12} md={8} direction={'row'} container justifyContent={'space-between'}>
              <Grid item xs={12}  md={5}>
                <FormControl color={'primary'} fullWidth style={{margin: '10px auto'}}>
                  <TextField
                    id="standard-select-uni"
                    select
                    label="انتخاب دانشگاه"
                    value={'karaj'}
                    // onChange={}
                    variant="filled"
                    helperText="دانشگاهی که این کلاس برای آن است را مشخص کنید"
                  >
                    {(['university of theran' , 'shiraz uni' , 'karaj',]).map((option) => (
                      <MenuItem key={option} value={option}>
                        {option}
                      </MenuItem>
                    ))}
                  </TextField>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={5}>
                <FormControl color={'primary'} fullWidth style={{margin: '10px auto'}}>
                  <TextField
                    id="standard-select-uni"
                    select
                    label="انتخاب دپارتمان"
                    value={'فنی مهندسی'}
                    // onChange={}
                    variant="filled"
                    helperText="دپارتمان مورد نظر را مشخص کنید"
                  >
                    {(['فنی مهندسی' , 'هنر' , 'پزشکی',]).map((option) => (
                      <MenuItem key={option} value={option}>
                        {option}
                      </MenuItem>
                    ))}
                  </TextField>
                </FormControl>
              </Grid>
            </Grid>
            <Grid item xs={12} md={8}>
              <FormControl color={'primary'} fullWidth style={{margin: '10px auto'}}>
                <TextField
                  label={'توضیحات کلاس'}
                  rows={10}
                  style={{textAlign: 'justify'}}
                  variant={'filled'}
                  multiline
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} md={8} container justifyContent={'space-between'} >
              <Grid item xs={12} md={4}>
                <FormControlLabel control={<Switch  color={'secondary'}/>} label={'اعمال کد امنیتی برای ثبت نام دانشجو'}  />
              </Grid>
              <Grid item xs={12} md={3}>
                <TextField  fullWidth size={'small'} type={'password'}  variant={'filled'} label={'رمز عبور'} />
              </Grid>
              <Grid item xs={12} md={3}>
                <TextField fullWidth size={'small'} type={'password'}  variant={'filled'} label={'تکرار رمز عبور'} />
              </Grid>
            </Grid>
            <Grid item xs={12} md={8} style={{marginTop: 10}}>
              <Button variant={'contained'} size={'large'} endIcon={<AddBox />} color={'secondary'}>
                ایجاد کلاس
              </Button>
            </Grid>
          </Grid>
        </TabPanel>
        
        <TabPanel value={2} >
          <Typography variant={'h6'} style={{textAlign: 'center'}}>
          ایجاد جلسه
          </Typography>
          
          <Grid container justifyContent={'center'} style={{marginTop: 20}}>
            <Grid item xs={12} md={8} >
              <FormControl color={'primary'} fullWidth>
                <TextField label={'عنوان جلسه'} color={'primary'} variant={'standard'}/>
              </FormControl>
            </Grid>
            
            <Grid item xs={12} md={8} >
              <FormControl className={classes.formControl}>
                <InputLabel htmlFor="lesson-native-simple">جلسه اضافه شود به کلاس </InputLabel>
                <Select
                  native
                  value={-1}
                  inputProps={{
                    name: 'کلاس',
                    id: 'lesson-native-simple',
                  }}
                >
                  <option aria-label="None" value="" />
                  <option value={10}>سیستم عامل 2 - کد درس 202111</option>
                  <option value={20}>سیستم عامل 2 - کد درس 202111</option>
                  <option value={30}>سیستم عامل 2 - کد درس 202111</option>
                </Select>
              </FormControl>
            </Grid>
            
            <Grid container item xs={12} md={8} direction={'row'} justifyContent={'space-between'} style={{marginTop: 20}}>
              <Grid item xs={12} md={6}>
                <DatePicker
                  autoOk
                  labelFunc={date => (date ? date.format("jYYYY/jMM/jDD") : "")}
                  orientation="landscape"
                  okLabel="تأیید"
                  cancelLabel="لغو"
                  clearLabel="پاک کردن"
                  variant="static"
                  openTo="date"
                  value={selectedDate}
                  onChange={handleDateChange}
                />
              </Grid>
  
              <Grid item xs={12} md={6}>
                
                <HourAccessTable
                   rows={[{id: 1, time: '12:00'} , {id: 2, time: '13:00'} , {id: 2, time: '9:00'} , {id: 2, time: '15:00'}]}
                />
              </Grid>
  
              <Grid item xs={12} md={8} style={{marginTop: 30}}>
                <Button variant={'contained'} size={'large'} endIcon={<AddBox />} color={'secondary'}>
                  ایجاد جلسه
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </TabPanel>
        <TabPanel value={3} >
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
                  value={'karaj'}
                  // onChange={}
                  variant="filled"
                  helperText="دانشگاه مورد نظر برای استفاده از این دپارتمان را تعیین کنید"
                >
                  {(['university of theran' , 'shiraz uni' , 'karaj',]).map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </TextField>
              </FormControl>
              <FormControl color={'primary'}  fullWidth style={{margin: 'auto'}}>
                <TextField variant={'filled'} label={'کد امنیتی دپارتمان'} color={'primary'} />
              </FormControl>
              <Button endIcon={<Security />} variant={'contained'} size={'large'} color={'secondary'} style={{marginTop: 10}}>
                شناسایی
              </Button>
            </Grid>
          </Grid>
        </TabPanel>
        
        <TabPanel value={4} >
          <Grid justifyContent={'center'} >
            <Grid item xs={12} md={6} style={{margin: 'auto'}}>
              <Typography variant={'h6'} style={{textAlign: 'center' , marginBottom: 10}}>
                اضافه کردن دانشگاه
              </Typography>
              
              <FormControl color={'primary'}  fullWidth style={{margin: 'auto'}}>
                <TextField variant={'filled'} label={'کد امنیتی دانشگاه'} color={'primary'} />
              </FormControl>
                <Button endIcon={<Security />} variant={'contained'} size={'large'} color={'secondary'} style={{marginTop: 10}}>
                  شناسایی
                </Button>
            </Grid>
          </Grid>
        </TabPanel>
      </TabContext>
    </Dialog>
  )
  
}


export default AddFab
