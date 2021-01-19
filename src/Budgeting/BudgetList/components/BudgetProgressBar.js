import React from 'react';
import LinearProgress from '@material-ui/core/LinearProgress';
import {lighten, makeStyles} from '@material-ui/core/styles';
import {Typography} from "@material-ui/core";
import {formatMoney} from "../../utils/formatMoney";
import {getDatePercentage} from "../../utils/getDatePercentage";

const height = 20;

const useStyles = makeStyles(theme => ({
    root: {
        overflow: 'hidden',
        paddingBottom: 12,
        marginBottom: -12,
        paddingLeft: 16,
        paddingRight: 24,
        marginRight: -16,
        marginLeft: -16
    },
    progressBar: {
        width: '100%',
        overflow: 'hidden',
    },
    fullRoot: {
        height: height,
        backgroundColor: lighten('#d32f2f', 0.4)
    },
    fullBar: {
        backgroundColor: '#d32f2f',
    },
    emptyRoot: {
        height: height,
        backgroundColor: lighten('#4caf50', 0.4),
    },
    emptyBar: {
        backgroundColor: '#4caf50',
    },
    almostFullRoot: {
        height: height,
        backgroundColor: lighten('#ffa000', 0.4),
    },
    almostFullBar: {
        backgroundColor: '#ffa000',
    },
    progressText: {
        position: 'absolute',
        color: 'white',
        transform: 'translateY(-19px)',
        padding: 0,
        paddingLeft: 8,
    },
}));

export default function BudgetProgressBar(props) {
    const classes = useStyles();
    const budget = props.budget;
    const spending = props.spending;
    const showToday = props.showToday;
    const showDatePercentage = props.showDatePercentage;

    const datePercentage = getDatePercentage();
    const progress = Math.min(spending / budget * 100, 100);

    const todayMarkClasses = makeStyles(theme => ({
        todayMark: {
            position: 'relative',
            marginTop: -20,
            height: height,
            width: '100%',
            transform: 'translate(' + datePercentage + '%,0)',
            borderLeft: '2px solid #0000007a',
            overflow: 'hidden'
        },
        todayToolTip: {
            position: 'relative',
            left: -16,
            //top:'1em',
            height: 10,
            color: '#6f6f6f',
            transform: 'translate(' + datePercentage + '%,0)',
        }
    }))();

    return (
        <div className={classes.root}>
            <div className={classes.progressBar}>
                <LinearProgress
                    variant="determinate"
                    value={progress}
                    classes={
                        (progress < 70) ?
                            {root: classes.emptyRoot, bar: classes.emptyBar} :
                            (progress < 100) ?
                                {root: classes.almostFullRoot, bar: classes.almostFullBar} :
                                {root: classes.fullRoot, bar: classes.fullBar}
                    }/>

                <Typography className={classes.progressText}
                            variant="body2"> {formatMoney(spending)} of {formatMoney(budget)} </Typography>
                {(showDatePercentage) ? <div className={todayMarkClasses.todayMark}/> : ''}
            </div>
            {(showToday && showDatePercentage) ?
                <Typography className={todayMarkClasses.todayToolTip}>Today</Typography> : ''}
        </div>
    );
}