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

const ClassItemCard = ({title , link , subTitle , university , department , detail , id , noRegister = false}) => {
  const classes = Styles()
  const [expanded , setExpanded] = useState(false)
  const [notify , setNotify] = useState(false)
  const history = useHistory()
  
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
      {notify && <SimpleSnackbar isShow={notify} setIsShow={setNotify} message={'لینک مورد نظر با موفقیت کپی شد.'}/>}
      <Card className={classes.root}>
        <CardHeader
          title={' عنوان درس : کلاس اخلاق اسلامی 2'}
          subheader={'دپارتمان : فنی مهندسی'}
          action={
            <IconButton aria-label={'share'} style={{marginRight: 10}} onClick={copyLink}>
              <Share color={'secondary'}/>
            </IconButton>
          }
        />
        
        <CardContent>
          <div className={classes.cardContent}>
            <Typography component={'h2'}>
              واحد دانشگاه : پسران کرج فنی حرفه ای
            </Typography>
            
            <Typography component={'h2'}>
              مدرس : موسی گلزاری پور
            </Typography>
          </div>
        </CardContent>
        
        <Divider />
        
        <CardActions>
          <Button variant={"contained"} color={'primary'} onClick={onDetailClick}>
            جزییات
          </Button>
          {!noRegister && (
            <Button variant={"outlined"} color={'primary'} >
              ثبت نام
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
              لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان
              گرافیک
              است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط
              فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد،
              کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و متخصصان را می
              طلبد، تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی،
              و
              فرهنگ پیشرو در زبان فارسی ایجاد کرد، در این صورت می توان امید داشت که تمام و دشواری
              موجود در ارائه راهکارها، و شرایط سخت تایپ به پایان رسد و زمان مورد نیاز شامل حروفچینی
              دستاوردهای اصلی، و جوابگوی سوالات پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار
              گیرد.
            </Typography>
          
          </CardContent>
        </Collapse>
      </Card>
    </Grid>
  )
}


export default ClassItemCard