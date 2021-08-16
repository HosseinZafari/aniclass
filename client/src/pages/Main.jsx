import {
  Box,
  Grid, Grow,
  makeStyles, Typography, Zoom,
} from "@material-ui/core";
import StudentAppBar from "../component/AppBars/StudentAppBar";
import {importFromPublic} from "../common/Useful";
import {Link} from "react-router-dom";
import DashboardCard from "../component/Cards/DashboardCard";

const Styles = makeStyles((theme) => ({
  root: {},
}));


const Main = () => {
  const classes = Styles()
  
  return (
    <StudentAppBar active={1} title={'صفحه اصلی'}>
      <Grow in={true}>
        <Grid justifyContent={'space-between'} textAlign={'center'} direction={'row'} container>
          <DashboardCard image={importFromPublic('images/homework1-min.jpg')}
                         title='کلاس های من'
                         link={'/class/'}
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
      </Grow>
    </StudentAppBar>
  )
}

export default Main