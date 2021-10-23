import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardHeader,
  CircularProgress,
  Collapse,
  Fade,
  Grid,
  Grow,
  IconButton,
  makeStyles,
  Paper,
  Slide,
  Typography,
  Zoom,
} from '@material-ui/core'
import StudentAppBar from '../../component/AppBars/StudentAppBar'
import { importFromPublic } from '../../common/Useful'
import DashboardCard from '../../component/Cards/DashboardCard'
import { CloudUpload, ExpandMore, Share } from '@material-ui/icons'
import { grey } from '@material-ui/core/colors'
import ClassItemCard from '../../component/Cards/ClassItemCard'
import React, { useEffect, useState } from 'react'
import { reserveClassApi, searchClass, unReserveClassStudent } from '../../apis/AuthApi'
import SimpleSnackbar from '../../component/Notify/SimpleSnackbar'
import { setBatch } from 'react-redux/lib/utils/batch'
import { Alert, AlertTitle } from '@material-ui/lab'
import Config from '../../common/Config'
import ReserveDialog from '../../component/Dialogs/ReserveDialog'
import RegisterDialog from '../../component/Dialogs/RegisterDialog'
import TeacherAppBar from '../../component/AppBars/TeacherAppBar'

const Styles = makeStyles((theme) => ({
  root: {},
  
}))

let page = 0
let lastId = 0
let currentKeyword = ''

const Search = () => {
  const classes = Styles()
  const [items, setItems] = useState([])
  const [department, setDepartment] = useState(-1)
  const [province, setProvince] = useState(-1)
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword , setShowPassword]   = useState( false)
  const [selectedId   , setSelectedId]     = useState( -1)
  
  const [isError, setIsError] = useState({
    msg: '',
    show: false
  })
  
  useEffect(() => {
    syncData()
  }, [])
  
  const syncData = async () => {
    //  get department
    //  province
    //  page
    
  }
  
  const firstPage = async (value) => {
    // clear
    setIsLoading( true)
    setItems([])
    page = 1
    lastId = 0
    currentKeyword = value
    
    try {
      const result = await searchClass(department , province,  page , value, lastId)
      if (result.data) {
        const newRows = result.data.rows.map(row => {
          row.isRegisterd = false
          return row
        })
        
        setItems(newRows)
        console.log(newRows)
        page = 2
        lastId = result.data.rows[result.data.rows.length - 1].class_id
      }
    } catch (error) {
      errorHandler(error)
    } finally {
      setIsLoading(false)
    }
  
  }
  
  const getPage = async (value) => {
    setIsLoading(true)
    try {
      const result = await searchClass(department, province, page , value , lastId)
      if (result.data) {
        setItems([...items , ...result.data.rows])
        page += 1
        lastId = result.data.rows[result.data.rows.length - 1].class_id
      }
    } catch (error) {
      errorHandler(error)
    } finally {
      setIsLoading(false)
    }
  }
  
  const reserveClass = async (id , password) => {
    try {
      console.log('id' , id)
      console.log('password' , password)
      const result = await reserveClassApi(id , password)
      if(result.data) {
        let targetItem = items.filter((value) => value.class_id === id)
        let newItems   = items.filter((value) => value.class_id !== id)
        targetItem[0].isRegisterd = true
        setItems([...newItems , ...targetItem])
        console.log(items)
      }
    } catch (err) {
      console.log(err.response.data)
    }
  }
  
  const errorHandler = (error) => {
    if (error.response) {
      const data = error.response.data
      if (data.code !== 422 && data.code < 500) {
        setIsError({
          msg: data.msg,
          show: true
        })
      } else {
        setIsError({
          msg: 'لطفا اطلاعات را صحیح وارد نمایید.',
          show: true
        })
      }
    } else {
      setIsError({
        msg: 'مشکلی در برقراری ارتباط به وجود آمده',
        show: true
      })
    }
  }
  
  return (
    <StudentAppBar backgroundSrc={'images/homework3-min.jpg'}
                   searchPanel={true}
                   active={2}
                   title={'جستجو'}
                   submitSearch={firstPage}
    >
      {isError.show && (<SimpleSnackbar message={isError.msg} onClose={() => setIsError({
        msg: '',
        show: false
      })} color={'error'}/>)}
      
      {
        <ReserveDialog
          onClose={() => setShowPassword(false)}
          open={showPassword.show}
          onSend={(value) => reserveClass(value)}
        />
      }
      <Grid direction={'column'} container>
        
        {isLoading && (
          <Grid container direction={'row'} justifyContent={'center'}
                style={{ marginBottom: '10px' }}>
            <Grid item justifyContent={'center'} direction={'row'} xs={12}
                  style={{ textAlign: 'center' }}>
              <Slide in={true}>
                <CircularProgress color={'secondary'} size={25}/>
              </Slide>
            </Grid>
          </Grid>
        )}
        <Fade in={true}>
          <Grid justifyContent={items.length === 0 ? 'center' : 'space-between'}
                textAlign={'center'}
                direction={'row'}
                container>
  
            {
              items.length > 0 && items.map(item =>
                <ClassItemCard link={`${Config.baseUrl}/lesson/${item.class_id}`}
                               title={item.title}
                               university={item.university_name}
                               department={item.department}
                               detail={item.description}
                               onReserveClick={(id) => {
                                 setSelectedId(item.class_id)
                                 if (item.password) {
                                   setShowPassword(true)
                                 } else {
                                   reserveClass(item.class_id ,'')
                                 }
                               }}
                               isRegisterd={item.isRegisterd}
                               id={item.class_id}
                               teacher={item.teacher_name + ' ' + item.teacher_family}
                />)
            }
            
            {
              items.length === 0 && (
                <Grid item direction={'row'} style={{ textAlign: 'center' }} xs={4} lg={2}>
                  <Alert severity="info" style={{ height: '70px' }}>
                    <AlertTitle>هشدار</AlertTitle>
                    هیچ موردی برای نمایش نداریم!
                  </Alert>
                </Grid>
              )
            }
            
            {
              items.length !== 0 && (
                <Grid item justifyContent={'center'} style={{ position: 'relative' }} xs={12}>
                  <Button variant={'outlined'}
                          color={'primary'}
                          size={'small'}
                          endIcon={<CloudUpload/>}
                          style={{
                            margin: 'auto',
                            position: 'absolute',
                            right: '45%'
                          }}
                          onClick={(v) => getPage(currentKeyword)}
                  >
                    بارگذاری بیشتر
                  </Button>
                </Grid>
              )
            }
          
          </Grid>
        </Fade>
      </Grid>
    </StudentAppBar>
  )
}

export default Search
