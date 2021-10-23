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
import AddUniversityLayout from '../Layout/AddUniversityLayout'
import AddDepartmentLayout from '../Layout/AddDepartmentLayout'
import AddClassLayout from '../Layout/AddClassLayout'
import AddSessionLayout from "../Layout/AddSessoinLayout";

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
         <AddClassLayout close={props.onClose} /> 
        </TabPanel>
        
        <TabPanel value={2} >
          <AddSessionLayout close={props.onClose}/>          
        </TabPanel>
        <TabPanel value={3} >
          <AddDepartmentLayout />
        </TabPanel>
        
        <TabPanel value={4} >
          <AddUniversityLayout />
        </TabPanel>
      </TabContext>
    </Dialog>
  )
  
}


export default AddFab
