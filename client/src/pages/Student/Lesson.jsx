import {
  Fade, Grid,
  makeStyles, Paper, Slide, Typography, Zoom,
} from "@material-ui/core";
import StudentAppBar from "../../component/AppBars/StudentAppBar";
import ClassItemCard from "../../component/Cards/ClassItemCard";
import {useEffect} from "react";

const Styles = makeStyles((theme) => ({
  root: {
  
  
  },
  
}));


const Search = () => {
  const classes = Styles()
  
  useEffect(()=> {
  
  },[])
  
  return (
    <StudentAppBar backgroundSrc={'images/homework1-min.jpg'} active={3} title={'کلاس های دنبال شده'}>
        <Fade in={true}>
          <Grid justifyContent={'space-between'}
                textAlign={'center'}
                direction={'row'}
                container>
           
              <ClassItemCard
                id={1}
                noRegister={true}
                link={'https://google.com'}/>
            
              <ClassItemCard
                noRegister={true}
                id={1002}
                link={'https://uncox.com'}/>
            
          </Grid>
        </Fade>
    </StudentAppBar>
  )
}

export default Search