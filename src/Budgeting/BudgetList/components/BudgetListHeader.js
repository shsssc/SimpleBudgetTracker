import React from 'react';
import Grid from '@material-ui/core/Grid';
import {makeStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import BudgetProgressBar from './BudgetProgressBar'
import ButtonDatePicker from '../../utils/ButtonDatePicker';
import DateFnsUtils from "@date-io/date-fns";
import {formatMoney} from "../../utils/formatMoney";
import {useMediaQuery} from "@material-ui/core";
import BudgetAddButtonModel from "./BudgetAddButtonModel";


const useStyles = makeStyles(theme => ({
    root: {
        paddingLeft: 24,
        paddingRight: 24,
        paddingTop: 8,
        paddingBottom: 16
    },
    month: {
        height: '100%',
        //marginBottom: 0,
    },
    moneyLeft: {
        height: '100%',
        //marginBottom: 0,
    },
    pickerButton: {},

}));

const formatDateToMonthYear = function (d) {
    const dateFns = new DateFnsUtils();
    return dateFns.format(d, 'MMM yyyy');
};

export default function BudgetListHeader(props) {

    const [selectedDate, setDate] = [props.month, props.setMonth];

    const totalBudget = props.totalBudget;
    const spending = props.spending;
    const showDatePercentage = props.showDatePercentage;
    const budget = props.budget;
    const setBudget = props.setBudget;

    const classes = useStyles();

    const minDate = props.minDate;
    const maxDate = props.maxDate;

    const desktop = useMediaQuery('(min-width:740px)');

    return (
        <div className={classes.root}>
            <Grid container spacing={1}>
                <Grid item xs={6}>
                    <Grid item xs>
                        <Typography component={'span'} gutterBottom variant={desktop ? "h4" : "h5"}
                                    className={classes.month}>
                            {formatDateToMonthYear(selectedDate)}</Typography>
                        <span className={classes.pickerButton}><
                            ButtonDatePicker value={selectedDate} onChange={setDate}
                                             minDate={minDate}
                                             maxDate={maxDate}/></span> </Grid> </Grid>
                <Grid item xs={6}>
                    <Typography className={classes.moneyLeft} gutterBottom variant={desktop ? "h4" : "h5"}
                                align={"right"}
                                color={'textSecondary'}>
                        {(spending > totalBudget) ? `${formatMoney(spending - totalBudget)} over` :
                            `${formatMoney(totalBudget - spending)} left`}</Typography> </Grid>
                <Grid item xs={12}>
                    <BudgetAddButtonModel budget={budget} setBudget={setBudget}/> </Grid>
                <Grid xs={12} item>
                    <BudgetProgressBar budget={totalBudget} spending={spending} showToday
                                       showDatePercentage={showDatePercentage} /> </Grid>
            </Grid></div>
    )
}