import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader, Collapse, Divider,
  Grid,
  IconButton, makeStyles,
  Typography
} from "@material-ui/core";
import {ExpandMore, Share} from "@material-ui/icons";
import {useState} from "react";
import clsx from "clsx";
import {MainTheme} from "../../Themes";
import {copyToClipboard} from "../../common/Useful";
import SimpleSnackbar from "../Notify/SimpleSnackbar";
import {Link, useHistory} from "react-router-dom";
import AlertDialog from '../Dialogs/AlertDialog'
import ReserveDialog from '../Dialogs/ReserveDialog'

const Styles = makeStyles((theme) => ({
  item: {
  } ,
  root: {
    boxShadow: '0px 0px 5px 0px #e5e5e5',
    maxWidth: '100%' ,
    marginRight: 5 ,
    marginLeft: 5 ,
    marginBottom: '10px' ,
  },
  cardContent: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    flexWrap: 'wrap'
  },
  expand: {
    transform: 'rotate(0deg)' ,
    transition: '.4s ease all'
  } ,
  expandOpen: {
    transform: 'rotate(180deg)',
  },
}));

const ClassItemCard = ({title , link  , university , department , detail , id , teacher , onUnReserveClick , hasPassword , onReserveClick , isRegisterd = false , noRegister = false , isTeacher = false}) => {
  const classes = Styles()
  const [expanded , setExpanded] = useState(false)
  const [notify , setNotify] = useState(false)
  const history = useHistory()
  const [openUnReserve , setOpenUnReserve] = useState(false)
  const [openReserve , setOpenReserve] = useState(false)
  const [openPassword , setOpenPassword] = useState(false)
  
  
  const copyLink = () => {
    copyToClipboard(link, () => {
      setNotify(true)
    })
  }
  
  const onDetailClick = (v) => {
    history.push(`/lesson/${id}`  , {
       navigation: 3
    })
  }
  
  return (
    <Grid item md={4} className={classes.item}>
      {openUnReserve &&  (<AlertDialog title={'حساب کاربری'}
                    detail={'آیا شما واقعا میخواهید این کار انجام شود ؟'}
                    onClose={() => setOpenUnReserve(false)}
                    onSubmit={(v) => {
                      setOpenUnReserve(false)
                      onUnReserveClick(id)
                    }}
      />)
      }
      {openReserve && (<AlertDialog title={'حساب کاربری'}
                      detail={'آیا شما می خواهید ثبت نام کنید ؟'}
                      onClose={() => setOpenReserve(false)}
                      onSubmit={(v) => {
                        setOpenReserve(false)
                        onReserveClick(id)
                      }}
        />)
      }
      
      {notify && <SimpleSnackbar onClose={() => setNotify(false)} message={'لینک مورد نظر با موفقیت کپی شد.'}/>}
      <Card className={classes.root}>
        <CardHeader
          title={title}
          subheader={` دپارتمان : ${department} `}
          action={
            <IconButton aria-label={'share'} style={{marginRight: 10}} onClick={copyLink}>
              <Share color={'secondary'}/>
            </IconButton>
          }
        />
        
        <CardContent>
          <div className={classes.cardContent}>
            <Typography component={'h2'}>
              {` آموزشکده : ${university}`}
            </Typography>
            
            <Typography component={'h2'}>
              {` مدرس : ${teacher}`}
            </Typography>
          </div>
        </CardContent>
        
        <Divider />
        
        <CardActions>
          <Button variant={"contained"} color={'primary'} onClick={onDetailClick}>
            جزییات
          </Button>
          {noRegister && !isRegisterd && !isTeacher &&(
            <Button variant={"text"} onClick={(v) => setOpenUnReserve(true)} >
              لغو ثبت نام
            </Button>
          )}
          
          {noRegister && isTeacher && (
            <Button variant={"text"} onClick={(v) => setOpenUnReserve(true)} >
              حذف کلاس
            </Button>
          )}
          
          {!noRegister && !isRegisterd && !isTeacher &&(
            <Button variant={"outlined"} color={'primary'} onClick={(v) => setOpenReserve(true)} >
              ثبت نام
            </Button>
          )}
          
          {isRegisterd && !isTeacher && (
            <Button disabled={true} variant={"outlined"} color={'primary'} >
              ثبت نام شده
            </Button>
          )}
          
          <IconButton color={'primary'}  style={{marginRight: 'auto'}} className={clsx(classes.expand ,{[classes.expandOpen]: expanded})} onClick={() => {
            setExpanded(!expanded)
          }} aria-label={'show more'} aria-expanded={expanded}>
            <ExpandMore/>
          </IconButton>
        </CardActions>
        
        <Collapse in={expanded} timeout={'auto'} unmountOnExit>
          <CardContent>
            <Typography component={'h1'} style={{color: MainTheme.palette.primary.main , fontSize: 18 , fontWeight: 900}}>
              توضیحات
            </Typography>
            
            <Typography component={'p'} style={{textAlign: 'justify'}}>
              {detail}
            </Typography>
          
          </CardContent>
        </Collapse>
      </Card>
    </Grid>
  )
}


export default ClassItemCard
