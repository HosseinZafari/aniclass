import StudentAppBar from "../../component/AppBars/StudentAppBar";
import {
  Box,
  Grid,
  Grow,
  makeStyles,
  Slide,
  Typography,
  useMediaQuery,
  Zoom
} from "@material-ui/core";
import {useParams} from 'react-router-dom'
import {MainTheme} from "../../Themes";
import SessionTable from "../../component/Tables/SessionTable";

const Styles = makeStyles((theme) => ({
  detailLayout: {
    zIndex: 9,
    background: '#fff',
  },
  mainDetailLayout: {
    width: '100%',
    background: MainTheme.palette.primary.main,
    paddingBottom: 15,
    borderRadius: '5px 5px 0 0',
    paddingRight: 8,
    paddingLeft: 8,
    paddingTop: 15
  },
  header: {},
  title: {
    fontSize: 18,
    fontWeight: 900,
    color: '#fff',
    marginRight: 10 ,
    marginLeft: 10 ,
  },
  subTitle: {
    color: '#fff',
    fontSize: 12,
    marginLeft: 10 ,
    marginRight: '4%'
  },
  description: {
    background: '#fff',
    padding: 8,
    borderRadius: 4,
    marginTop: 10,
    color: MainTheme.palette.secondary.main
  },
  moreDesc: {
    padding: 8,
    marginTop: 10,
    zIndex: 99,
    
  },
  sessionLayout: {}
}))

const rows = () => {
  return [
    {title: 'جلسه اول سیستم عامل' , time: '20:00' , date: '1400/7/5' , link: 'https://google.com/'},
    {title: 'جلسه اول سیستم عامل' , time: '20:00' , date: '1400/7/5' , link: 'https://google.com/'},
    {title: 'جلسه اول سیستم عامل' , time: '20:00' , date: '1400/7/5' , link: 'https://google.com/'},
    {title: 'جلسه اول سیستم عامل' , time: '20:00' , date: '1400/7/5' , link: 'https://google.com/'},
  ]
}

const DetailLesson = (props) => {
  const {id} = useParams()
  const {navigation} = props.location.state
  const classes = Styles()
  const lg = useMediaQuery(theme => (theme.breakpoints.down('lg')))
  const md = useMediaQuery(theme => (theme.breakpoints.down('md')))
  
  
  return (
    <StudentAppBar active={navigation} title={'جزییات کلاس'}>
      
      <Slide in={true}>
        <Grid container justifyContent={'space-between'} style={{position: 'relative'}}>
          
          
          <Box component={Grid} boxShadow={2} item xs={12} md={6} className={classes.detailLayout} style={{position: md && 'initial' , marginRight: md && 0}} >
            <Grid container className={classes.mainDetailLayout}>
              <Grid item container justifyContent={'space-between'} alignItems={'baseline'}
                    className={classes.header} direction={'row'} xs={12}>
                <Typography className={classes.title}>
                  کلاس سیستم عامل 2
                </Typography>
                <Typography className={classes.subTitle}>
                  مدرس : موسی گلزاری پور
                </Typography>
              </Grid>
              
              <Grid item className={classes.description} xs={12} container
                    justifyContent={'space-between'} direction={'row'}>
                <Grid item sx={6} style={{marginLeft: 15 , marginTop: 5 }}>
                  <Typography>
                    عنوان دپارتمان : فنی مهندسی
                  </Typography>
                </Grid>
                <Grid item sx={6}  style={{marginTop: 5}}>
                  <Typography>
                    دانشگاه : آموزشگاه شهید بهشتی کرج
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            
            <Grid container direction={'column'} className={classes.moreDesc}>
              <Grid item xs={12}
                    style={{fontSize: 18, fontWeight: 900, color: MainTheme.palette.primary.main}}>
                توضیحات
              </Grid>
              
              <Grid item xs={12} style={{
                fontSize: 14,
                fontWeight: 300,
                textAlign: 'justify',
                lineHeight: 2,
                margin: 8
              }}>
                لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان
                گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و
                برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی
                می باشد، کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و
                متخصصان را می طلبد، تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی
                الخصوص طراحان خلاقی، و فرهنگ پیشرو در زبان فارسی ایجاد کرد، در این صورت می توان امید
                داشت که تمام و دشواری موجود در ارائه راهکارها، و شرایط سخت تایپ به پایان رسد و زمان
                مورد نیاز شامل حروفچینی دستاوردهای اصلی، و جوابگوی سوالات پیوسته اهل دنیای موجود
                طراحی اساسا مورد استفاده قرار گیرد.
              </Grid>
            </Grid>
          
          </Box>
          
          <Grid item xs={12} md={5}  style={{marginTop: 5}}>
            <SessionTable rows={rows()} />
          </Grid>
        </Grid>
      </Slide>
    
    </StudentAppBar>
  )
}


export default DetailLesson