import {Slide, Snackbar} from "@material-ui/core";
import {Alert} from "@material-ui/lab";
import {useState} from "react";

const SimpleSnackbar = ({
                          message = 'test',
                          duration = 4_000,
                          show = true,
                          color = 'success',
                          transitionComponent = Slide,
                          onClose ,
                        }) => {
  
  return (
    <Snackbar open={show} onClose={() => onClose()} autoHideDuration={duration}
              TransitionComponent={transitionComponent}>
      <Alert onClose={() => onClose()} severity={color}>
        {message}
      </Alert>
    </Snackbar>
  )
}


export default SimpleSnackbar
