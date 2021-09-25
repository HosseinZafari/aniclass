import {
  Box,
  Grid, Grow,
  makeStyles, Slide, Typography, Zoom,
} from "@material-ui/core";
import {importFromPublic} from "../../common/Useful";
import DashboardCard from "../../component/Cards/DashboardCard";
import TeacherAppBar from "../../component/AppBars/TeacherAppBar";
import StudentAppBar from '../../component/AppBars/StudentAppBar'

const Styles = makeStyles((theme) => ({
  root: {},
}));


const Main = () => {
  const classes = Styles()
  console.log('testttt')
  
  return (
    <StudentAppBar active={1} title={'صفحه اصلی'}>
      <Slide in={true}>
        <Grid justifyContent={'space-between'} textAlign={'center'} direction={'row'} container>
          <DashboardCard image={importFromPublic('images/homework1-min.jpg')}
                         title='کلاس های من'
                         link={'/lesson/'}
                         text='تعداد کلاس های ثبت نام شده : (10)'/>
          <DashboardCard image={importFromPublic('images/homework4-min.jpg')}
                         link={'/session/'}
                         title='جلسات'/>
          <DashboardCard image={importFromPublic('images/homework2-min.jpg')}
                         link={'/search/'}
                         title='جستجو'/>
          <DashboardCard image={importFromPublic('images/homework3-min.jpg')}
                         title='تکالیف'
                         text={'بزودی'}/>
          <DashboardCard image={importFromPublic('images/homework5-min.jpg')}
                         title='آزمون'
                         text={'بزودی'}/>
        </Grid>
      </Slide>
    </StudentAppBar>
  )
}

export default Main
