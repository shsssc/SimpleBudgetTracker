import CardHeader from "@material-ui/core/CardHeader";
import Divider from "@material-ui/core/Divider";
import CardContent from "@material-ui/core/CardContent";
import {makeStyles, Typography} from "@material-ui/core";
import BudgetProgressBar from "./BudgetList/components/BudgetProgressBar";
import Card from "@material-ui/core/Card";
import React from "react";
import DateFnsUtils from "@date-io/date-fns";
import {getMonthRange, getOverallSpending, getSpendingCategories, getTotalBudget} from "./utils/utils";

const useStyles = makeStyles(theme => ({
    content: {
        width: '100%',
        height: 300,
    },
    card: {
        margin: theme.spacing(1),
    },
    budgetTitle: {
        paddingTop: theme.spacing(3),
        paddingBottom: 0,
    },
    budgetText: {
        paddingBottom: theme.spacing(2),
    },
    budgetCardContent: {
        [theme.breakpoints.down('sm')]: {
            height: 200,
        }
    }
}));
const dateFns = new DateFnsUtils();
const getMonthYear = function () {
    return dateFns.format(new Date(), 'MMM yyyy');
};

const getRemainingDaysThisMonth = function () {
    const today = new Date();
    const last = dateFns.endOfMonth(new Date());
    return last.getDate() - today.getDate() + 1;
}

const BudetingOverviewCard = props => {
    const budgetObj = props.budget;
    const transactions = props.transactions;

    const [monthBegin, monthEnd] = getMonthRange(new Date());
    const filteredTransactions = transactions.filter((t) => t.date >= monthBegin && t.date <= monthEnd);

    const amountByCategory = getSpendingCategories(filteredTransactions);
    const overallSpending = getOverallSpending(budgetObj)(amountByCategory);
    const totalBudget = getTotalBudget(budgetObj);


    const classes = useStyles();

    return (<Card className={classes.card}>
        <CardHeader title="Budgets" titleTypographyProps={{color: "textSecondary"}}/>
        <Divider light/>
        <CardContent className={classes.content + ' ' + classes.budgetCardContent}>
            <Typography className={classes.budgetTitle} variant={'h5'} align={'center'}>
                {getMonthYear()}</Typography>
            <Typography className={classes.budgetText} variant={'subtitle1'} align={'center'}>
                You have ${Math.round(totalBudget-overallSpending)} left for the next {getRemainingDaysThisMonth()} days</Typography>

            <BudgetProgressBar budget={totalBudget} spending={overallSpending} showToday showDatePercentage/>
        </CardContent>
    </Card>);
}

export default BudetingOverviewCard;