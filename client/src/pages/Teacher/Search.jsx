import {
  Box, Button, Card, CardActionArea, CardActions, CardContent, CardHeader, Collapse, Fade,
  Grid, Grow, makeStyles, Paper, Slide, Typography, Zoom,
} from "@material-ui/core";
import ClassItemCard from "../../component/Cards/ClassItemCard";
import {useEffect} from "react";
import TeacherAppBar from "../../component/AppBars/TeacherAppBar";

const Styles = makeStyles((theme) => ({
  root: {},
  
}));


const Search = () => {
  const classes = Styles()
  
  useEffect(() => {
  
  }, [])
  return (
    <TeacherAppBar backgroundSrc={'images/homework3-min.jpg'} searchPanel={true} active={2}
                   title={'جستجو'}>
      <Fade in={true}>
        <Grid justifyContent={'space-between'}
              textAlign={'center'}
              direction={'row'} w
              container>
          
          <ClassItemCard link={'https://google.com'}/>
          
          <ClassItemCard link={'https://uncox.com'}/>
          
          <ClassItemCard link={'https://7learn.com'}/>
        
        </Grid>
      </Fade>
    </TeacherAppBar>
  )
}

export default Search