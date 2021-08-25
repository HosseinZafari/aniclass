import {Slide, Snackbar} from "@material-ui/core";
import {Alert} from "@material-ui/lab";
import {useState} from "react";

const SimpleSnackbar = ({
                          message = 'test',
                          duration = 4_000,
                          show = false,
                          color = 'success',
                          transitionComponent = Slide,
                          isShow ,
                          setIsShow,
                        }) => {
  
  return (
    <Snackbar open={isShow} onClose={() => setIsShow()} autoHideDuration={duration}
              TransitionComponent={transitionComponent}>
      <Alert onClose={() => setIsShow()} severity={color}>
        {message}
      </Alert>
    </Snackbar>
  )
}


export default SimpleSnackbar