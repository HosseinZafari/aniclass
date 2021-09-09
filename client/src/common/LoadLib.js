import React from 'react'

const LoadLib = (target , firsComponent , secondComponent) => {
  switch (target) {
    case 'student' :
      return React.lazy(() => firsComponent)
    case 'teacher' :
      return React.lazy(() => secondComponent)
    default:
      return React.lazy(() => secondComponent)
  }
}


export default LoadLib