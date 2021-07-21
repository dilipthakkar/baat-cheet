import React from 'react'
import{Grid} from "@material-ui/core"
const GridItem = (props) => {
    const {children , className , ...rest} = props ; 
    return (
       
            <Grid item className={className} {...rest}>
                {children}
            </Grid>
        
    )
}

export default GridItem
