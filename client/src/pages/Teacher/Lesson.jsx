import {
  Fade, Grid,
  makeStyles, Paper, Slide, Typography, Zoom,
} from "@material-ui/core";
import ClassItemCard from "../../component/Cards/ClassItemCard";
import { useEffect, useState } from 'react'
import TeacherAppBar from "../../component/AppBars/TeacherAppBar";
import { getClassCreated, getClassReserved, unReserveClassStudent } from '../../apis/AuthApi'
import Config from '../../common/Config'
import { Alert, AlertTitle } from '@material-ui/lab'

const Styles = makeStyles((theme) => ({
  root: {
  
  
  },
  
}));


const Search = () => {
  const classes = Styles()
  const [items , setItems] = useState(null)
  
  useEffect(()=> {
    syncLesson()
  },[])
  
  const syncLesson = async () => {
    try {
      const result = await getClassCreated()
      if(result.data.rows) {
        setItems(result.data.rows)
      }
    } catch (error) {
      console.log(error)
    }
  }
  async function unReserveClass (id) {
    try {
      // const result = await unReserveClassStudent(id)
      // if(result.data) {
        let newItems = items.filter((value) => value.class_id !== id)
        setItems(newItems)
      // }
    } catch (err) {
      console.log(err)
    }
  }
  
  return (
    <TeacherAppBar backgroundSrc={'images/homework1-min.jpg'} active={3} title={'کلاس های ایجاد شده'} lessonPage={true}>
        <Fade in={true}>
          <Grid justifyContent={items == null ? 'center' : 'space-between'}
                textAlign={'center'}
                direction={'row'}
                container>
  
            {items != null  ? items.map(item => (
              <ClassItemCard
                key={item.id}
                id={item.class_id}
                noRegister={true}
                title={item.class_title}
                onUnReserveClick={(id) => unReserveClass(id)}
                detail={item.description}
                teacher={item.teacher_name + ' ' + item.teacher_family}
                university={item.university_name}
                department={item.department_name}
                link={Config.baseUrl + `/lesson/${item.class_id}`} />
            )) : (
              <Alert severity="warning" style={{height: '100px'}}>
                <AlertTitle>هشدار</AlertTitle>
                شما هیچگونه کلاس ثبت نامی ندارید ، میتوانید به بخش جستجو مراجعه و در کلاس های مورد نظر خود شرکت کنید.
              </Alert>
            )}
            
          </Grid>
        </Fade>
    </TeacherAppBar>
  )
}

export default Search
