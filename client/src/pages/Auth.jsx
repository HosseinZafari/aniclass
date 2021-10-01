import React, {Component, useEffect, useRef, useState} from 'react';
import {
  Box,
  Button, CircularProgress,
  Container,
  createStyles,
  FormControl, FormControlLabel, FormGroup,
  Grid,
  Grow,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  LinearProgress,
  makeStyles,
  OutlinedInput, Slide, Switch,
  Tab,
  Tabs,
  TextField,
  Typography,
  useTheme,
  Zoom
} from '@material-ui/core'
import {PrimaryButton, SecondaryButton} from "../component/Button/Buttons";
import { importFromPublic, setInfo } from '../common/Useful'
import {grey} from "@material-ui/core/colors";
import TableContext from "@material-ui/core/Table/TableContext";
import { CheckBox, ExitToApp, LockOpen, Visibility, VisibilityOff } from '@material-ui/icons'
import {TabContext, TabPanel} from "@material-ui/lab";
import RegisterDialog from "../component/Dialogs/RegisterDialog";
import SimpleSnackbar from '../component/Notify/SimpleSnackbar'
import Index from '../apis'
import { studentLogin } from '../apis/AuthApi'
import { useDispatch } from 'react-redux'
import { disableProgressbar, enableProgressbar } from '../redux/reducers/ProgressbarSlice'
import { setUser } from '../redux/reducers/UserSlice'
import { useHistory } from 'react-router-dom'
import LoginLayout from '../component/Layout/LoginLayout'
import SignupLayout from '../component/Layout/SignupLayout'

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
  const classes = styles({background: primary.main});
  const ref = useRef(null);
  
  const history = useHistory()
  const dispatch = useDispatch()
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
                 <LoginLayout onSuccess={(data) => {
                   if (dispatch(setUser({ ...data , isLogin: true }))) {
                     setInfo(data.token , data.role === 'student' ? 0 : 1)
                     history.push('/reload?login=1')
                   }
                 }} />
                </TabPanel>
                
                
                <TabPanel value={2}>
                  <SignupLayout onSuccess={(data) => {
                    if(dispatch(setUser({...data , isLogin: true}))){
                      setInfo(data.token , data.role === 'student' ? 0 : 1)
                      history.push('/reload?register=1')
                    }
                  }}/>
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
