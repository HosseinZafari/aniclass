import {
  AppBar,
  createStyles,
  createTheme,
  Drawer,
  IconButton,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
  MuiThemeProvider,
  Toolbar,
  ThemeProvider,
  Typography,
  useMediaQuery,
  InputBase,
  Paper,
  Icon,
  Slide,
  Fade,
  Grow,
  Dialog,
  DialogTitle,
  DialogContentText, DialogContent, Button, DialogActions
} from '@material-ui/core'
import clsx from 'clsx';
import {ChevronRight, Dashboard, ExitToApp, RateReview, Search, Settings} from "@material-ui/icons";
import {DrawerTheme, MainTheme} from "../../Themes";
import {useHistory} from "react-router-dom";
import {grey, yellow} from "@material-ui/core/colors";
import { clearInfo, importFromPublic } from '../../common/Useful'
import AlertDialog from '../Dialogs/AlertDialog'
import { useState } from 'react'
import { logoutStudent } from '../../apis/AuthApi'
import { useDispatch } from 'react-redux'
import { logout, setUser } from '../../redux/reducers/UserSlice'

const drawerWidth = 85
const MenuNavigation = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
  },
  appbar: {
    boxShadow: '0px 0px 8px 0px #b2b2b2',
  },
  toolbar: {
    padding: 0
  },
  toolbar2: theme.mixins.toolbar,
  drawer: {
    width: drawerWidth
  },
  title: {
    margin: 'auto',
    color: '#888'
  },
  listItem: {
    marginBottom: '5px',
    flexDirection: 'column',
    paddingRight: '8px',
    paddingLeft: '8px',
    paddingTop: '8px',
    paddingBottom: '8px'
  },
  listIcon: {
    minWidth: 0
  },
  listText: {
    color: '#888',
    '& > *': {
      fontSize: '12px'
    }
  },
  listTextActive: {
    color: MainTheme.palette.primary.main,
    '& > *': {
      fontSize: '12px'
    }
  },
  content: {
    flexGrow: 1,
    display: "flex",
    height: '100vh' ,
    padding: theme.spacing(2),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: drawerWidth
  },
  inputLayout: {
    height: 30,
    background: '#f5f5f5',
    borderRadius: 2,
    width: 300,
    margin: 'auto',
    justifyContent: 'space-between',
    boxShadow: 'none',
    alignItems: 'center',
    display: 'flex',
    paddingLeft: 10,
    paddingRight: 5,
  },
  inputSearch: {
    fontSize: 12,
    fontWeight: 300,
    color: grey[900],
    width: '88%'
  },
  iconSearch: {
    padding: 6
  },
  advancedSearch: {
    marginRight: 5,
  } ,
  backgroundPage: {
    opacity: .3,
    zIndex: -1,
    position: "fixed" ,
    right: 0 ,
    top: 0 ,
    width: '100%' ,
    height: '100%'
  }
}));


const StudentAppBar = (props) => {
  const classes = MenuNavigation()
  const history = useHistory()
  const matches = useMediaQuery(theme => theme.breakpoints.down('xs'))
  const [openLogout , setOpenLogout] = useState(false)
  const [searchInput , setSearchInput] = useState('')
  const dispatch = useDispatch()
  
  const onMenuItemClick = (link) => {
    history.push(link)
  }
  
  const onSubmitLogout = async () => {
    try {
      const result = await logoutStudent()
      if(result.data) {
        clearInfo()
        dispatch(logout())
        history.push('/reload?clear=1')
      }
    } catch (err) {
      console.log(err)
    }
    
  }
  
  return (
    <ThemeProvider theme={DrawerTheme}>
      <div className={classes.root} >
        {props.backgroundSrc &&
        <img src={importFromPublic(props.backgroundSrc)} className={classes.backgroundPage} alt={'bg'}/>}
       
        <AppBar className={classes.appbar} position={'static'} color={'white'}>
          <Slide in={true}>
          
          <Toolbar variant={'dense'} className={classes.toolbar}>
            
            {props.searchPanel ? (
                <>
                  <Paper component={'form'} onSubmit={(e) => {
                    e.preventDefault()
                    props.submitSearch(searchInput)
                  }} className={classes.inputLayout}>
                    
                    <InputBase
                      className={classes.inputSearch}
                      placeholder={'جستجو'}
                      onChange={v => setSearchInput(v.target.value)}
                    />
                    <IconButton type="button"
                                className={classes.iconSearch}
                                onClick={(v) => props.submitSearch(searchInput)}
                                aria-label="search">
                      <Search fontSize={'small'}/>
                    </IconButton>
                  </Paper>
                  
                  {/*<IconButton type={'button'} className={classes.advancedSearch}>*/}
                  {/*  <Settings fontSize={'small'}/>*/}
                  {/*</IconButton>*/}
                </>) :
              
              <Typography component={"h1"} align={'center'} className={classes.title} noWrap>
                {props.title}
              </Typography>
            }
          </Toolbar>
          </Slide>
        </AppBar>
        
        <Drawer variant={'permanent'} className={classes.drawer}>
          
          <ListItem button key={"صفحه اصلی"} className={classes.listItem}
                    onClick={() => onMenuItemClick('/')}>
            <ListItemIcon className={classes.listIcon}>
              <Dashboard color={props.active === 1 ? 'primary' : 'inherit'}/>
            </ListItemIcon>
            {
              matches ? '' : <ListItemText
                className={props.active === 1 ? classes.listTextActive : classes.listText}
                primary={'صفحه اصلی'}/>
            }
          </ListItem>
          <ListItem button key={"جستجو"} className={classes.listItem}
                    onClick={() => onMenuItemClick('/search/')}>
            <ListItemIcon className={classes.listIcon}>
              <Search color={props.active === 2 ? 'primary' : 'inherit'}/>
            </ListItemIcon>
            {
              matches ? '' : <ListItemText
                className={props.active === 2 ? classes.listTextActive : classes.listText}
                primary={'جستجو'}/>
            }
          </ListItem>
          <ListItem button key={"درس من"} className={classes.listItem}
                    onClick={() => onMenuItemClick('/lesson/')}>
            <ListItemIcon className={classes.listIcon}>
              <RateReview color={props.active === 3 ? 'primary' : 'inherit'}/>
            </ListItemIcon>
            {
              matches ? '' : <ListItemText
                className={props.active === 3 ? classes.listTextActive : classes.listText}
                primary={'درس من'}/>
            }
          </ListItem>
          <ListItem button key={"تنظیمات"} className={classes.listItem}
                    onClick={() => onMenuItemClick('/setting/')}>
            <ListItemIcon className={classes.listIcon}>
              <Settings color={props.active === 4 ? 'primary' : 'inherit'}/>
            </ListItemIcon>
            {
              matches ? '' : <ListItemText
                className={props.active === 4 ? classes.listTextActive : classes.listText}
                primary={'تنظیمات'}/>
            }
          </ListItem>
          <ListItem focusRipple={'red'} button key={"خروج"} className={classes.listItem}
                    onClick={(v) => setOpenLogout(true)}>
            <ListItemIcon className={classes.listIcon}>
              <ExitToApp color={props.active === 5 ? 'primary' : 'inherit'}/>
            </ListItemIcon>
            {
              matches ? '' : <ListItemText
                className={props.active === 5 ? classes.listTextActive : classes.listText}
                primary={'خروج'}/>
            }
          </ListItem>
        </Drawer>
        
        <main className={classes.content} style={{marginRight: matches && '8.5%'}}>
          {openLogout &&
            (<AlertDialog title={'حساب کاربری'}
                          detail={'آیا میخواهید از حساب کاربری خود خارج شوید ؟'}
                          onClose={() => setOpenLogout(false)}
                          onSubmit={onSubmitLogout}
            />)
          }
          
          {props.children}
        </main>
      </div>
    </ThemeProvider>
  );
}

export default StudentAppBar
