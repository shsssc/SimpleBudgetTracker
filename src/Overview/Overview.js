import React from 'react';
import {Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis,} from 'recharts';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import {makeStyles} from "@material-ui/core";

import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";
import AccountOverviewCard from "../AccountsAndTransactions/AccountOverviewCard";
import TransactionOverviewCard from "../AccountsAndTransactions/TransactionOverviewCard";
import BudetingOverviewCard from "../Budgeting/BudgetingOverviewCard";

import getTestData from "../sampleData/testTransactions"
import {exampleBudgetObj} from "../Budgeting/test/testData";
import SpendingPieChartCard from "../Visualization/SpendingPieChartCard";

const useStyles = makeStyles(theme => ({
    container: {
        width: '100%'
    },
    content: {
        width: '100%',
        height: 300,
    },
    card: {
        margin: theme.spacing(1),
    }
}));



const Overview = props => {

    const classes = useStyles();
    const testData = getTestData();

    const getAmountByMonth = transactions => {
        const mouthAmount = {};
        transactions.forEach(a => {
            const inx = a.date.substr(0,7);
            if (!mouthAmount[inx]) mouthAmount[inx] = 0;
            mouthAmount[inx] += a.amount;
        });
        return Object.keys(mouthAmount)
            .map(key => ({
                name: key,
                value: Math.round(mouthAmount[key])
            }));
    };

    const data = getAmountByMonth(testData.transactions.transactions);
    return (
        <Grid container className={classes.container}>
            <Grid item xs={12} md={4}>
                <AccountOverviewCard accounts={testData.transactions.accounts}/>
            </Grid>
            <Grid item xs={12} md={4}>
                <TransactionOverviewCard transactions={testData.transactions.transactions}/>
            </Grid>

            <Grid item xs={12} md={4}>
                <BudetingOverviewCard transactions={testData.transactions.transactions} budget={exampleBudgetObj}/>
            </Grid>

            <Grid item xs={12} md={8}>
                <Card className={classes.card}>
                    <CardHeader title="Monthly Spending" titleTypographyProps={{color: "textSecondary"}}/>
                    <Divider light/>
                    <CardContent className={classes.content}>
                        <ResponsiveContainer>
                            <BarChart data={data}>
                                <XAxis dataKey="name"/>
                                <YAxis/>
                                <Tooltip/>
                                <Bar type="monotone" dataKey="value" fill="#e64a19"/>

                            </BarChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={12} md={4}>
                <SpendingPieChartCard transactions={testData.transactions.transactions}/>
            </Grid>
        </Grid>
    )
        ;
};

export default Overview;