import { LinearProgress } from '@material-ui/core'
import { React } from 'react'
import { useSelector } from 'react-redux'
import { selectProgressbarState } from '../redux/reducers/ProgressbarSlice'

const ProgressbarLoader = (props) => {
  const progressbarState = useSelector(selectProgressbarState)
  
  return (
    <>
      {
        progressbarState && <LinearProgress style={{
        width: '100%',
        zIndex: 99999,
        position: 'fixed',
        top: 0,
        right: 0,
        left: 0
        }} color={'secondary'}/>
      }
    </>
  )
  
}

export default ProgressbarLoader
