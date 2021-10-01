import {Grid, makeStyles, Slide} from "@material-ui/core";
import DashboardCard from "../../component/Cards/DashboardCard";
import {importFromPublic} from "../../common/Useful";
import TeacherAppBar from "../../component/AppBars/TeacherAppBar";
import { useEffect, useState } from 'react'
import { getClassReservedCount, getClassReservedTeacherCount } from '../../apis/AuthApi'

const Styles = makeStyles((theme) => ({
  root: {},
}));

const Main = () => {
  const classes = Styles()
  const [countReserved , setCountReserved] = useState(0)
  
  useEffect( ()=> {
    syncData()
  } , [])
  
  async function syncData() {
    try {
      const result = await getClassReservedTeacherCount()
      console.log(result.data.count)
      setCountReserved(result.data.count)
    } catch (error) {
      console.log(error)
    }
  }
  
  return (
    <TeacherAppBar active={1} title={'صفحه اصلی'}>
      <Slide in={true}>
        <Grid justifyContent={'space-between'} textAlign={'center'} direction={'row'} container>
          <DashboardCard image={importFromPublic('images/homework1-min.jpg')}
                         title='کلاس های ایجاد شده'
                         link={'/lesson/'}
                         text={`تعداد کلاس های ایجاد شده : (${countReserved})`}/>
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
    </TeacherAppBar>
  )
}


export default Main
