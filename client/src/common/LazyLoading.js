import React, { Suspense } from "react";


const LazyLoading = (importFunc , {fallback = null}) => {
    const LazyComponent = React.lazy(importFunc);
    return props => (
        <Suspense fallback={fallback}>
            <LazyComponent {...props} />
        </Suspense>
    );
};

LazyLoading.defaultProps = {
    fallback: null 
}


export default LazyLoading;