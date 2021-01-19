import {makeStyles} from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import Divider from "@material-ui/core/Divider";
import CardContent from "@material-ui/core/CardContent";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import {getTotalBalance} from "./utils/utils";
import {intToMoney} from "../utils/utils";
import React from "react";

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
    accountSummaryListItem: {
        paddingTop: 12,
        paddingBottom: 8
    },
    accountsContent: {
        [theme.breakpoints.down('sm')]: {
            height: 300,
        }
    },
    accountLastDivider: {
        /*
        [theme.breakpoints.down('sm')]: {
            display: 'none',
        }*/
    }
}));


const AccountOverviewCard = (props) => {
    const accounts = props.accounts;
    const classes = useStyles();
    return (
        <Card className={classes.card}>
            <CardHeader className={classes.transactionListHead} title="Accounts Summary"
                        titleTypographyProps={{color: "textSecondary"}}/>
            <Divider light/>
            <CardContent className={classes.transactionContent + ' ' + classes.accountsContent}>
                <List>
                    <ListItem className={classes.accountSummaryListItem}>
                        <ListItemText primary={"All accounts"}
                                      primaryTypographyProps={{noWrap: true, variant: 'subtitle1'}}
                                      className={classes.listItemText}/>
                        <ListItemText primary={"$" + getTotalBalance(accounts)}
                                      className={classes.transactionAmount}/>
                    </ListItem>
                    {accounts.map(account => (
                        <div key={account.account_id}>
                            <Divider light/>
                            <ListItem className={classes.accountSummaryListItem}>
                                <ListItemText primary={account.name}
                                              primaryTypographyProps={{noWrap: true, variant: 'subtitle1'}}
                                              className={classes.listItemText}/>
                                <ListItemText primary={intToMoney(account.balances.current)}
                                              className={classes.transactionAmount}/>
                            </ListItem>
                        </div>
                    ))}
                    <Divider light className={classes.accountLastDivider}/>
                </List>
            </CardContent>
        </Card>
    );
}
export default AccountOverviewCard;