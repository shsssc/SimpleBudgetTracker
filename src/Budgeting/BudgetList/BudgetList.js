import React from 'react';

import BudgetingListList from './components/BudgetingListList'

import {exampleBudgetObj} from "../test/testData";
import {makeStyles} from "@material-ui/core";
import Divider from "@material-ui/core/Divider";
import BudgetListHeader from './components/BudgetListHeader';
import DateFnsUtils from "@date-io/date-fns";
import testTransactions from '../../sampleData/testTransactions'
import {
    getDateRange,
    getMonthRange,
    getOverallSpending,
    getSpendingByCategory,
    getSpendingCategories,
    getTotalBudget
} from "../utils/utils";


const dateFns = new DateFnsUtils();
const useStyles = makeStyles(theme => ({
    root: {
        height: '100%',
        flexDirection: 'column',
        flexFlow: "column nowrap",
        display: "flex",
        width: '100%',
        paddingTop: theme.spacing(1)
    },
    heightFixed: {
        flex: "none"
    },
    heightFill: {
        flex: "auto",
        overflowY: 'scroll'
    }

}));

const getYearMonth = date => {

    return dateFns.format(date, 'yyyy-MM');
};

const getThisMonth = () => getYearMonth(new Date());

export default function BudgetList(props) {
    const classes = useStyles();

    const thisMonth = getThisMonth();
    const selectedMonth =
        (props.match.params.selectedMonth
            && dateFns.parse(props.match.params.selectedMonth, 'yyyy-MM'))
        || new Date();

    const setMonth = m => {
        props.history.push(`/budgets/${dateFns.format(m, 'yyyy-MM')}`);
    };

    const [budgetObj, setBudgetObj] = React.useState(exampleBudgetObj);

    const showDatePercentage = thisMonth === getYearMonth(selectedMonth);

    const transactions = testTransactions().transactions.transactions;
    const [minDate, maxDate] = getDateRange(transactions);

    const totalBudget = getTotalBudget(budgetObj);

    const [monthBegin, monthEnd] = getMonthRange(selectedMonth);
    const filteredTransactions = transactions.filter((t) => t.date >= monthBegin && t.date <= monthEnd);

    const amountByCategory = getSpendingCategories(filteredTransactions);
    const OverallSpending = getOverallSpending(budgetObj)(amountByCategory);
    return (
        <div className={classes.root}>
            <div className={classes.heightFixed}>
                <BudgetListHeader totalBudget={totalBudget} spending={OverallSpending}
                                  month={selectedMonth} setMonth={setMonth} showDatePercentage={showDatePercentage}
                                  minDate={minDate} maxDate={maxDate} budget={budgetObj} setBudget={setBudgetObj}/>
                <Divider component={'hr'}/>
            </div>
            <div className={classes.heightFill}>
                <BudgetingListList budget={budgetObj} setBudget={setBudgetObj}
                                   showDatePercentage={showDatePercentage}
                                   getSpendingByCategory={getSpendingByCategory(amountByCategory)}/>
            </div>
        </div>);
};