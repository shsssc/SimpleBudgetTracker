import React from 'react';
import Grid from "@material-ui/core/Grid";
import Skeleton from "@material-ui/lab/Skeleton";
import { makeStyles} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    root: {
        height: '100%',
        width: '100%'
    },
   progress:{
       width: '100%',
   },
   text:{
        marginTop:8,
   }

}));

export default function LoadingList(props) {
    const classes = useStyles();
    return (

        <Grid container justify={"center"} className={classes.root}>
            <Grid item className={classes.progress}>
                <Skeleton variant="text" className={classes.text}/>
                <Skeleton variant="rect" width={"100%"} height={120}/>
                <Skeleton variant="text" className={classes.text}/>
                <Skeleton variant="rect" width={"100%"} height={120}/>
                <Skeleton variant="text" className={classes.text}/>
                <Skeleton variant="rect" width={"100%"} height={120}/>
            </Grid>

        </Grid>
    );
}