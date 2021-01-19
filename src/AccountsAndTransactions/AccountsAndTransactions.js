import React, {useEffect, useState} from 'react';
import TransactionList from './TransactionList/TransactionList.js'
import AccountList from './AccountList/AccountList'
import Paper from '@material-ui/core/Paper';
import {makeStyles} from "@material-ui/core";

import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';

import {Route, Switch} from "react-router-dom";
import LoadingList from "../utils/LoadingList";
import {sendData} from "../utils/utils";
import getTransactionsRaw from '../sampleData/testTransactions'

const useStyles = makeStyles(theme => ({
    root: {
        backgroundColor: theme.palette.background.default,
        height: '100%',
        flexDirection: 'column',
        flexFlow: "column nowrap",
        display: "flex",
    },
    absolute: {
        position: 'absolute',
        width: '100%',
        height: 'calc(100% - 32px)',
    },
    breadcrumbs: {
        paddingTop: 5,
        paddingBottom: 8,
        paddingLeft: theme.spacing(1),
    },
    heightFixed: {
        flex: "none"
    },
    heightFill: {
        flex: "auto",
        overflowY: 'auto'
    },
    inheritHeight: {
        height: '100%',
    }
}));

export default function AccountsAndTransactions(props) {
    const classes = useStyles();
    const [data, setData] = useState(getTransactionsRaw().transactions);
    useEffect(() => {
        sendData('http://127.0.0.1:3001/api/transactions', {}, 'GET')
            .then(result => setData(result.transactions))
            .catch(e => console.log(e));
    }, []);
    const accounts = data && data.accounts;
    const transactions = data && data.transactions;

    const inAccountList = props.match.params.accountID === undefined;

    const AccountSelection = (props) => (
        <div className={classes.inheritHeight}>
            <AccountList accounts={accounts}
                         onSelect={(acct) => {
                             props.history.push(`/transactions/${acct}`)
                         }}/></div>);

    const ShowTransactions = (props) => (
        <div className={classes.inheritHeight}>
            <TransactionList transactions={transactions}
                             selectedAccount={(props.match.params.accountID)}
                             accounts={accounts}/>
        </div>
    );

    return (

        <div className={classes.root}>
            <div className={classes.heightFixed}>

                <Breadcrumbs aria-label="Breadcrumb" className={classes.breadcrumbs}>
                    <Link color="inherit" href="#" onClick={() => props.history.push(`/`)}>
                        AppName
                    </Link>
                    <Link href="#" onClick={(e) => {
                        props.history.push(`/transactions/`);
                    }}
                          color={inAccountList ? "textPrimary" : 'textSecondary'}>
                        Accounts
                    </Link>
                    {!inAccountList ?
                        <Link
                            color="textPrimary"
                            href="#"
                            aria-current="page"
                        >
                            Transactions
                        </Link> : ''}
                </Breadcrumbs>
            </div>
            {!data ? <LoadingList/> :
                <Paper className={classes.heightFill}>
                    <Switch>
                        <Route exact path='/transactions' component={AccountSelection}/>
                        <Route path='/transactions/:accountID' component={ShowTransactions}/>
                    </Switch>
                </Paper>}
        </div>
    );

}