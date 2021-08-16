import React, {Component, useEffect, useRef, useState} from 'react';
import {
  Box,
  Button, CircularProgress,
  Container,
  createStyles,
  FormControl,
  Grid,
  Grow,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  LinearProgress,
  makeStyles,
  OutlinedInput, Slide,
  Tab,
  Tabs,
  TextField,
  Typography,
  useTheme,
  Zoom
} from "@material-ui/core";
import {PrimaryButton, SecondaryButton} from "../component/Button/Buttons";
import {importFromPublic} from "../common/Useful";
import {color} from "@material-ui/system";
import {grey} from "@material-ui/core/colors";
import TableContext from "@material-ui/core/Table/TableContext";
import {ExitToApp, LockOpen, Visibility, VisibilityOff} from "@material-ui/icons";
import {TabContext, TabPanel} from "@material-ui/lab";
import RegisterDialog from "../component/Dialogs/RegisterDialog";

const styles = makeStyles({
  root: {
    width: '',
  },
  bgHeader: {
    background: props => props.background,
    width: '100%',
    height: '350px',
    position: 'fixed',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    zIndex: -1,
    overflow: 'hidden',
    display: 'block'
  },
  tabs: {
    width: '100%',
    flexGrow: 1
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

const Auth = (props) => {
  const {primary} = useTheme().palette;
  const [value, setValue] = useState(1);
  const [isShowDialog ,setIsShowDialog ] = useState(false);
  const classes = styles({background: primary.main});
  const ref = useRef(null);
  
  // enable this to solve the error, you have to use a timeout in order for it to work
  useEffect(() => {
    setTimeout(() => {
      ref.current?.updateIndicator();
    }, 600);
  });
  
  const selectedTab = (event, newValue) => {
    setValue(newValue)
  }
  
  return (
    <div className={`${classes.root} `}>
      <div className={`${classes.bgHeader}`}></div>
      <Container maxWidth={'md'}>
        <Slide in={true}>
          <Grid justifyContent={'space-between'} alignItems={'center'} container
                className={`${classes.main}`}>
            <Grid item sx={6}>
              <h1 className={'white'} style={{fontSize: 26}}>سرویس جلسات آنلاین</h1>
              <Typography variant={'subtitle2'} className={'white'}>وزارت علوم دانشگاه
                فنی
                حرفه ای واحد کرج</Typography>
            </Grid>
            
            <Box
              sx={6}
              component={Grid}
              flexDirection={'column'}
              borderRadius={5}
              mt={2}
              bgcolor={primary.dark}
              padding={.5}
            >
              <ul className={'p6'}>
                <li><img src={importFromPublic('images/icon-white.png')} width={52}
                         alt={'logo'}/></li>
                <li><img src={importFromPublic('images/img.png')} width={52}
                         alt={'logo'}/></li>
              </ul>
            </Box>
          </Grid>
        </Slide>
        
        <TabContext value={value}>
          <Zoom in={true}>
            <Box
              container
              component={Grid}
              bgcolor={'white'}
              flexDirection={'column'}
              mt={3}
              boxShadow={3}
              borderColor={grey[100]}
              borderRadius={4}
              height={'auto'}>
              
              <Grid sx={12} item>
                <Tabs
                  className={classes.tabs}
                  action={ref}
                  variant={'fullWidth'}
                  aria-label="tab auth"
                  value={value}
                  indicatorColor={'primary'}
                  textColor={'primary'}
                  onChange={selectedTab}>
                  
                  <Tab value={1} icon={<LockOpen/>} label={'ورود'}/>
                  <Tab value={2} icon={<ExitToApp/>} label={'ثبت نام'}/>
                </Tabs>
              </Grid>
              
              
              <Grid sx={12} item>
                <TabPanel value={1}>
                  <form className={classes.form} autoComplete={false}>
                    <TextField id={'national_code'}
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
                      className={classes.inputItem}
                      fullWidth={true}
                      label={'رمز عبور'}
                      type={'password'}
                    />
                    
                    <Button variant={'contained'}
                            color={'primary'}
                            fullWidth
                    
                            size={'large'}
                    >
                      ورود به حساب کاربری
                      
                      {/*<CircularProgress style={{marginRight: 10}} size={20} color={'white'} />*/}
                    </Button>
                    
                    <Button variant={'text'}
                            style={{marginTop: -20, color: '#555'}}
                            fullWidth
                            size={'large'}
                    >
                      رمز عبور خود را فراموش کرده اید ؟
                    
                    </Button>
                  </form>
                </TabPanel>
                
                <TabPanel value={2}>
                  <form className={classes.form} autoComplete={false}>
                    <TextField id={'national_code'}
                               fullWidth={true}
                               type={'number'}
                               autoComplete={false}
                               className={classes.inputItem}
                               size={'small'}
                               variant={'outlined'}
                               label={'کد ملی'}/>
                    <TextField id={'name'}
                               fullWidth={true}
                               size={'small'}
                               autoComplete={false}
                               className={classes.inputItem}
                               variant={'outlined'}
                               label={'نام'}/>
                    <TextField id={'family'}
                               fullWidth={true}
                               size={'small'}
                               autoComplete={false}
                               className={classes.inputItem}
                               variant={'outlined'}
                               label={'نام خانوادگی'}/>
                    <TextField id={'email'}
                               fullWidth={true}
                               size={'small'}
                               type={'email'}
                               autoComplete={false}
                               className={classes.inputItem}
                               variant={'outlined'}
                               label={'ایمیل'}/>
                    <TextField
                      id="password"
                      variant={'outlined'}
                      size={'small'}
                      autoComplete={false}
                      className={classes.inputItem}
                      fullWidth={true}
                      label={'رمز عبور'}
                      type={'password'}/>
                    
                    <TextField
                      id="confirm-password"
                      variant={'outlined'}
                      autoComplete={false}
                      className={classes.inputItem}
                      fullWidth={true}
                      label={'تکرار رمز عبور'}
                      size={'small'}
                      type={'password'}/>
                    
                    <Button variant={'contained'}
                            color={'primary'}
                            fullWidth
                            onClick={v => setIsShowDialog(true)}
                            size={'large'}
                    >
                      ایجاد حساب کاربری
                      {/*<CircularProgress style={{marginRight: 10}} size={20} color={'white'} />*/}
                    </Button>
                    <RegisterDialog
                      onClose={() => setIsShowDialog(false)}
                      open={isShowDialog}
                      onSend={() => {}}
                    />
                  </form>
                </TabPanel>
              </Grid>
            
            </Box>
          </Zoom>
        </TabContext>
      </Container>
    </div>
  );
}


export default Auth;