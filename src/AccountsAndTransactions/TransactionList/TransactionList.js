import React from 'react';
import TransactionListList from './elements/TransactionListList'
import TransactionListHeader from "./elements/TransactionListHeader";
import Divider from "@material-ui/core/Divider";
import {makeStyles} from '@material-ui/core/styles';
import FilterComponent from './elements/FilterComponent'
import {groupData, uniqueData} from "../../utils/utils";
import {genAllAccounts} from "../utils/utils";

const useStyles = makeStyles(theme => ({
    root: {
        height: '100%',
        flexDirection: 'column',
        flexFlow: "column nowrap",
        display: "flex",
        width: '100%',
    },
    heightFixed: {
        flex: "none"
    },
    heightFill: {
        flex: "auto",
        overflowY: 'scroll'
    }
}));

const initFromTo = function () {
    const day1 = new Date();
    const day0 = new Date();

    day0.setDate(day0.getDate() - 30);
    const date_to_string = (date) => {
        {
            const dd = String(date.getDate()).padStart(2, '0');
            const mm = String(date.getMonth() + 1).padStart(2, '0');
            const yyyy = date.getFullYear();
            return yyyy + '-' + mm + '-' + dd;
        }
    };
    return [date_to_string(day0), date_to_string(day1)];
};


export default function TransactionList(props) {
    const classes = useStyles();
    const [initFrom, initTo] = initFromTo();
    const [from, setFrom] = React.useState(initFrom);
    const [to, setTo] = React.useState(initTo);
    const [groupBy, setGroupBy] = React.useState('date');
    const groupIndex = groupBy || 'date';

    if (!props.transactions || !props.selectedAccount || !props.accounts) return (null);

    const transactions = props.transactions;
    const accounts = props.accounts;
    const selected_account_id = props.selectedAccount;
    let selected_account;
    if (selected_account_id === 'all_accounts') {
        selected_account = genAllAccounts(accounts);
    } else {
        selected_account = accounts.filter(a => a.account_id === selected_account_id);
        if (selected_account.length === 0) return null;
        selected_account = selected_account[0];
    }
    const accountName = selected_account.name || 'N/A';
    const accountBalance = selected_account.balances.current || 'N/A';
    const subtype = selected_account.subtype || "N/A";


    //remove duplicate transaction
    const uniqueTransactions = uniqueData('transaction_id')(transactions);

    //select account id
    const filteredTransactions = uniqueTransactions
        //filter account id
        .filter((trans) =>
            selected_account_id === 'all_accounts' ||
            trans.account_id === selected_account_id)
        //filter date range
        .filter(trans =>
            (from === '' || trans.date >= from) && (to === '' || trans.date <= to))
        //provide missing fields
        .map((t) => ({
            name: t.name,
            date: t.date,
            id: t.transaction_id,
            type: t.category[0] + " - " + (t.category[1] || t.category[0]),
            amount: t.amount,
            location: t.location,
            tags: t.tags || [],
            comments: t.comments || ""
        }))
        //sort with date
        .sort((l, r) => {
            if (l.date < r.date) return -1; else return 1;
        });

    //grouping
    const groupedTransactions = groupData(groupIndex)(filteredTransactions);

    return (
        <div className={classes.root}>
            <div className={classes.heightFixed}>
                <TransactionListHeader accountName={accountName} accountType={subtype}
                                       balance={accountBalance}/>
                <Divider component={'hr'}/>
                <FilterComponent
                    from={from} to={to} groupBy={groupBy} onFromChange={setFrom} onToChange={setTo}
                    onGroupByChange={setGroupBy}
                />
                <Divider component={'hr'}/>
            </div>
            <div className={classes.heightFill}>
                <TransactionListList className={classes.heightFill} transactions={groupedTransactions}
                                     showDate={groupIndex !== 'date'}
                                     showType={groupIndex !== 'type'}/>
            </div>
        </div>)
}