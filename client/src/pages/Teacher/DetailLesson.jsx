import {
  Box,
  Grid,
  makeStyles,
  Slide,
  Typography,
  useMediaQuery,
} from "@material-ui/core";
import {useParams} from 'react-router-dom'
import {MainTheme} from "../../Themes";
import SessionTable from "../../component/Tables/Teacher/SessionTable";
import TeacherAppBar from "../../component/AppBars/TeacherAppBar";
import { useEffect, useState } from 'react'
import { getClassById, getSessionsOfClass } from '../../apis/AuthApi'

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


const DetailLesson = (props) => {
  const {id} = useParams()
  const {navigation} = props.location.state
  const classes = Styles()
  const lg = useMediaQuery(theme => (theme.breakpoints.down('lg')))
  const md = useMediaQuery(theme => (theme.breakpoints.down('md')))
  const [sessions , setSessions] = useState([])
  
  const [classInfo , setClassInfo] = useState({
    title: 'در حال بارگذری...',
    description: 'در حال بارگذری...',
    department_name: 'در حال بارگذری...',
    teacher_name: 'در حال بارگذری...',
    teacher_family: 'در حال بارگذری...',
    university_name: 'در حال بارگذری...'
  })
  
  useEffect( () => {
    syncDetailLesson()
  } , [])
  
  const syncDetailLesson = async () => {
    try {
      const result = await getClassById(id)
      if(result.data.class) {
        setClassInfo(result.data.class)
        await syncSessions()
      }
    } catch (error) {
      console.log(error)
    }
  }
  
  const syncSessions = async () => {
    try {
      const result = await getSessionsOfClass(id)
      if(result.data.sessions) {
        setSessions(result.data.sessions)
      }
    } catch(error) {
      console.log(error)
    }
  }
  
  return (
    <TeacherAppBar active={navigation} title={'جزییات کلاس'} detailLesson={true}>
      
      <Slide in={true}>
        <Grid container justifyContent={'space-between'} style={{position: 'relative'}}>
          
          
          <Box component={Grid} boxShadow={2} item xs={12} md={6} className={classes.detailLayout} style={{position: md && 'initial' , marginRight: md && 0}} >
            <Grid container className={classes.mainDetailLayout}>
              <Grid item container justifyContent={'space-between'} alignItems={'baseline'}
                    className={classes.header} direction={'row'} xs={12}>
                <Typography className={classes.title}>
                  {classInfo.title}
                </Typography>
                <Typography className={classes.subTitle}>
                  {` مدرس : ${classInfo.teacher_name + '' + classInfo.teacher_family}`}
                </Typography>
              </Grid>
              
              <Grid item className={classes.description} xs={12} container
                    justifyContent={'space-between'} direction={'row'}>
                <Grid item sx={6} style={{marginLeft: 15 , marginTop: 5 }}>
                  <Typography>
                    {` عنوان دپارتمان : ${classInfo.department_name}`}
                  </Typography>
                </Grid>
                <Grid item sx={6}  style={{marginTop: 5}}>
                  <Typography>
                    {` آموزشگاه : ${classInfo.university_name}`}
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
                {classInfo.description}
              </Grid>
            </Grid>
          
          </Box>
          
          <Grid item xs={12} md={5}  style={{marginTop: md && 10 , marginBottom: md && 10}}>
            <SessionTable rows={sessions} />
          </Grid>
        </Grid>
      </Slide>
    
    </TeacherAppBar>
  )
}


export default DetailLesson
