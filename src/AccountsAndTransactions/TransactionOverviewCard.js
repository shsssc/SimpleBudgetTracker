import CardHeader from "@material-ui/core/CardHeader";
import Divider from "@material-ui/core/Divider";
import CardContent from "@material-ui/core/CardContent";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Card from "@material-ui/core/Card";
import React from "react";
import {makeStyles} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
    card: {
        margin: theme.spacing(1),
    },
    listItemText: {
        width: 100,
        overflow: 'hidden',
        textOverflow: 'ellipsis',
    },
    transactionListItem: {
        padding: theme.spacing(1),
        paddingTop: 2,
        paddingBottom: 2
    },
    transactionListHead: {},
    transactionDate: {
        flex: 'none',
        width: 56
    },
    transactionAmount: {
        flex: 'none',
        width: 80,
        textAlign: 'right',
    },
    transactionContent: {
        paddingTop: 0,
        paddingBottom: 0,
        width: '100%',
        height: 300,
    },
}));

const TransactionOverviewCard = (props) => {
    const recentTransactions = props.transactions.slice(0, 5);
    const date2Month = s=>{
        const date = new Date(s)
        const month = date.toLocaleString('default', { month: 'short' });
        return month;
    }

    const classes = useStyles();
    return (
        <Card className={classes.card}>
            <CardHeader className={classes.transactionListHead} title="Recent Transactions"
                        titleTypographyProps={{color: "textSecondary"}}/>
            <Divider light/>
            <CardContent className={classes.transactionContent}>
                <List dense>
                    {recentTransactions.map(transaction => (
                        <div key={transaction.transaction_id}>
                            <ListItem className={classes.transactionListItem}>
                                <ListItemText className={classes.transactionDate} primary={date2Month(transaction.date)} secondary={transaction.date.substr(8)}/>
                                <ListItemText primary={transaction.name} secondary={transaction.category}
                                              primaryTypographyProps={{noWrap: true}}
                                              secondaryTypographyProps={{noWrap: true}}
                                              className={classes.listItemText}/>
                                <ListItemText primary={"$"+transaction.amount} className={classes.transactionAmount}
                                              primaryTypographyProps={{align: 'right'}}/>
                            </ListItem>
                            <Divider light/>
                        </div>
                    ))}
                </List>
            </CardContent>
        </Card>
    );
}
export default TransactionOverviewCard;