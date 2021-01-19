import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import Divider from "@material-ui/core/Divider";
import CardContent from "@material-ui/core/CardContent";
import {Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip} from "recharts";
import React from "react";
import {makeStyles} from "@material-ui/core";

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

const COLORS = ['#D500F9', '#0088FE', '#00C49F', '#FFBB28', '#ff8042'];

const getAmountByCategory = transactions => {
    const categoryAmount = {};
    transactions.forEach(a => {
        if (!categoryAmount[a.category[0]]) categoryAmount[a.category[0]] = 0;
        categoryAmount[a.category[0]] += a.amount;
    });
    return Object.keys(categoryAmount)
        .map(key => ({
            name: key,
            value: Math.round(categoryAmount[key])
        })).filter(i => i.value > 1)
        .sort((a, b) => a.value > b.value);
};

const SpendingPieChartCard = props =>{
    const classes = useStyles();
    const amountByCategory = getAmountByCategory(props.transactions);
    return ( <Card className={classes.card}>
        <CardHeader title="Spending by Category" titleTypographyProps={{color: "textSecondary"}}/>
        <Divider light/>
        <CardContent className={classes.content}>
            <ResponsiveContainer>
                <PieChart>
                    <Pie data={amountByCategory}
                         dataKey={"value"}
                         innerRadius={60}
                         outerRadius={80}
                         fill="#8884d8"
                         paddingAngle={5}
                         label={(a, b) => `$${new Intl.NumberFormat('en').format(a.payload.value)}`}>
                        {
                            amountByCategory.map((entry, index) => <Cell key={index} dataKey={index}
                                                                         fill={COLORS[index % COLORS.length]}/>)
                        }
                    </Pie>
                    <Legend/>
                    <Tooltip formatter={(value) => '$' + (new Intl.NumberFormat('en').format(value))}/>
                </PieChart>
            </ResponsiveContainer>
        </CardContent>
    </Card>);
};
export default SpendingPieChartCard;