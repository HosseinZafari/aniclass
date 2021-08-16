import {Box, createStyles, Grid, makeStyles, Typography} from "@material-ui/core";
import {Link} from "react-router-dom";
import {importFromPublic} from "../../common/Useful";

const Styles = makeStyles({
  root: {
    marginTop: 10 ,
    marginBottom: 10
  } ,
  imageCard: {
    borderRadius: 10,
    height: '100%',
    width: '100%',
    position: 'absolute',
    right: 0,
    top: 0,
    opacity: .8,
    zIndex: -1
  },
  titleCard: {
    left: 15,
    top: 15,
    position: 'absolute',
    fontSize: 20
  },
  textCard: {
    right: 15,
    bottom: 15,
    backgroundColor: '#f0f0f0',
    padding: 8,
    borderRadius: 4,
    position: 'absolute',
    fontSize: 15
  },
  linkCard: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    transition: '.5s linear',
    '&:hover': {
      filter: 'saturate(0%)'
    }
  }
})

const DashboardCard = (props) => {
  const classes = Styles()
  
  return (
    <Grid item xs={12} sm={6} className={classes.root}>
      <Box bgcolor={'transparent'}
           position={'relative'}
           borderRadius={10}
           boxShadow={'0 1px 10px #e0e0e0'}
           width={'95%'}
           height={300}
      >
        <Link to={props.link ? props.link : ''} className={classes.linkCard}>
          <img src={props.image} className={classes.imageCard} style={props.link ? {} : {opacity: .2}} alt={'homework'}/>
          <Typography component={'h1'} color={'primary'} className={classes.titleCard}>
            <strong>{props.title}</strong>
          </Typography>
          {
            props.text &&
            <Typography component={'h1'} color={'secondary'} className={classes.textCard}>
              <strong>{props.text}</strong>
            </Typography>
          }
        </Link>
      </Box>
    </Grid>
  )
}

export default DashboardCard