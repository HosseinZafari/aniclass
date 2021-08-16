import {
  AppBar,
  createStyles,
  Drawer,
  IconButton, ListItem, ListItemIcon, ListItemText,
  makeStyles,
  Toolbar,
  Typography, useMediaQuery
} from "@material-ui/core";
import {ChevronRight, Dashboard, ExitToApp, RateReview, Search, Settings} from "@material-ui/icons";

const drawerWidth = 85
const MenuNavigation = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column'
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
  const matches = useMediaQuery(theme => theme.breakpoints.down('xs'))
  
  return (
    <div className={classes.root}>
      <AppBar className={classes.appbar} position={'static'} color={'white'}>
        <Toolbar variant={'dense'} className={classes.toolbar}>
          <Typography component={"h1"} align={'center'} className={classes.title} noWrap>
            داشبورد
          </Typography>
        </Toolbar>
      </AppBar>
      
      <Drawer variant={'permanent'} className={classes.drawer}>
        <ListItem button key={"صفحه اصلی"} className={classes.listItem}>
          <ListItemIcon className={classes.listIcon}>
            <Dashboard color={"inherit"}/>
          </ListItemIcon>
          {
            matches ? '' : <ListItemText className={classes.listText} primary={'صفحه اصلی'}/>
          }
        </ListItem>
        <ListItem button key={"جستجو"} className={classes.listItem}>
          <ListItemIcon className={classes.listIcon}>
            <Search color={"inherit"}/>
          </ListItemIcon>
          {
            matches ? '' : <ListItemText className={classes.listText} primary={'جستجو'}/>
          }
        </ListItem>
        <ListItem button key={"درس من"} className={classes.listItem}>
          <ListItemIcon className={classes.listIcon}>
            <RateReview color={"inherit"}/>
          </ListItemIcon>
          {
            matches ? '' : <ListItemText className={classes.listText} primary={'درس من'}/>
          }
        </ListItem>
        <ListItem button key={"تنظیمات"} className={classes.listItem}>
          <ListItemIcon className={classes.listIcon}>
            <Settings color={"inherit"}/>
          </ListItemIcon>
          {
            matches ? '' : <ListItemText className={classes.listText} primary={'تنظیمات'}/>
          }
        </ListItem>
        <ListItem button key={"خروج"} className={classes.listItem}>
          <ListItemIcon className={classes.listIcon}>
            <ExitToApp color={"inherit"}/>
          </ListItemIcon>
          {
            matches ? '' : <ListItemText className={classes.listText} primary={'خروج'}/>
          }
        </ListItem>
      </Drawer>
      
      <main className={classes.content}>
        {props.children}
      </main>
    </div>
  );
}

export default StudentAppBar