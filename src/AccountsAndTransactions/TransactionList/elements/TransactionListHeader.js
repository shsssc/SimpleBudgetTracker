import React from 'react';
import Grid from '@material-ui/core/Grid';
import {makeStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import {intToMoney} from "../../../utils/utils";


const useStyles = makeStyles(theme => ({
    root: {
        paddingLeft: 15,
        paddingRight: 15,
        paddingTop: 10,
        paddingBottom: 2
    },
    accountName: {
        marginBottom: 0,
    },

}));

export default function TransactionListHeader(props) {
    const classes = useStyles();
    return (
        <div className={classes.root}>

            <Grid container spacing={1}>
                <Grid item xs={6}>
                    <Grid item xs>
                        <Typography gutterBottom variant="h5" className={classes.accountName} noWrap>
                            {props.accountName}
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                            {props.accountType}
                        </Typography>
                    </Grid>
                </Grid>
                <Grid item xs={6}>
                    <Typography gutterBottom variant="h4" align={"right"} color={'textSecondary'}>
                        {intToMoney(props.balance)}
                    </Typography>
                </Grid>
            </Grid>
        </div>
    )
}