import {
  AppBar,
  createStyles, createTheme,
  Drawer,
  IconButton, ListItem, ListItemIcon, ListItemText,
  makeStyles, MuiThemeProvider,
  Toolbar,
  ThemeProvider,
  Typography, useMediaQuery
} from "@material-ui/core";
import clsx from 'clsx';
import {ChevronRight, Dashboard, ExitToApp, RateReview, Search, Settings} from "@material-ui/icons";
import {DrawerTheme, MainTheme} from "../../Themes";
import {useHistory} from "react-router-dom";

const drawerWidth = 85
const MenuNavigation = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    '& > .MuiListItem-root .MuiTouchRipple-child': {
      backgroundColor: 'red'
    }
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
    color: MainTheme.palette.primary.main ,
    '& > *': {
      fontSize: '12px'
    }
  },
  content: {
    flexGrow: 1,
    display: "flex",
    padding: theme.spacing(2),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: drawerWidth
  }
}));


const StudentAppBar = (props) => {
  const classes = MenuNavigation()
  const history = useHistory()
  const matches = useMediaQuery(theme => theme.breakpoints.down('xs'))
  
  const onMenuItemClick = (link) => {
    history.push(link)
  }
  
  return (
    <ThemeProvider theme={DrawerTheme}>
      <div className={classes.root}>
        <AppBar className={classes.appbar} position={'static'} color={'white'}>
          <Toolbar variant={'dense'} className={classes.toolbar}>
            <Typography component={"h1"} align={'center'} className={classes.title} noWrap>
              {props.title}
            </Typography>
          </Toolbar>
        </AppBar>
        
        <Drawer variant={'permanent'} className={classes.drawer}>
          <ListItem button key={"صفحه اصلی"} className={classes.listItem} onClick={() => onMenuItemClick('/')}>
            <ListItemIcon className={classes.listIcon}>
              <Dashboard color={props.active === 1 ? 'primary' : 'inherit'}/>
            </ListItemIcon>
            {
              matches ? '' : <ListItemText className={props.active === 1 ? classes.listTextActive : classes.listText} primary={'صفحه اصلی'}/>
            }
          </ListItem>
          <ListItem button key={"جستجو"} className={classes.listItem} onClick={() => onMenuItemClick('/search/')}>
            <ListItemIcon className={classes.listIcon}>
              <Search  color={props.active === 2 ? 'primary' : 'inherit'}/>
            </ListItemIcon>
            {
              matches ? '' : <ListItemText className={props.active === 2 ? classes.listTextActive : classes.listText} primary={'جستجو'}/>
            }
          </ListItem>
          <ListItem button key={"درس من"} className={classes.listItem} onClick={() => onMenuItemClick('/class/')}>
            <ListItemIcon className={classes.listIcon}>
              <RateReview color={props.active === 3 ? 'primary' : 'inherit'}/>
            </ListItemIcon>
            {
              matches ? '' : <ListItemText className={props.active === 3 ? classes.listTextActive : classes.listText} primary={'درس من'}/>
            }
          </ListItem>
          <ListItem button key={"تنظیمات"} className={classes.listItem} onClick={() => onMenuItemClick('/setting/')}>
            <ListItemIcon className={classes.listIcon}>
              <Settings color={props.active === 4 ? 'primary' : 'inherit'}/>
            </ListItemIcon>
            {
              matches ? '' : <ListItemText className={props.active === 4 ? classes.listTextActive : classes.listText} primary={'تنظیمات'}/>
            }
          </ListItem>
          <ListItem focusRipple={'red'} button key={"خروج"} className={classes.listItem} onClick={() => onMenuItemClick('/exit/')}>
            <ListItemIcon className={classes.listIcon}>
              <ExitToApp color={props.active === 5 ? 'primary' : 'inherit'}/>
            </ListItemIcon>
            {
              matches ? '' : <ListItemText className={props.active === 5 ? classes.listTextActive : classes.listText} primary={'خروج'}/>
            }
          </ListItem>
        </Drawer>
        
        <main className={classes.content}>
          {props.children}
        </main>
      </div>
    </ThemeProvider>
  );
}

export default StudentAppBar