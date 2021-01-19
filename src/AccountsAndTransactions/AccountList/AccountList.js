import React from 'react';

import AccountListList from './elements/AccountListList'
import AccountsOverview from "./elements/AccountsOverview";
import {makeStyles} from "@material-ui/core";


const useStyles = makeStyles(theme => ({
    root: {
        height: '100%',
        flexDirection: 'column',
        flexFlow: "column nowrap",
        display: "flex",
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

export default function AccountList(props) {
    const classes = useStyles();

    let accounts = props.accounts;
    const onSelect = props.onSelect;

    return (
        <div className={classes.root}>
            <div className={classes.heightFixed}>
                <AccountsOverview accounts={accounts} onSelect={onSelect}/>
            </div>
            <div className={classes.heightFill}>
                <AccountListList accounts={accounts} onSelect={onSelect}/>
            </div>
        </div>
    );
}