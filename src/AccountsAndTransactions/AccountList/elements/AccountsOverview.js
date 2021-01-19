import React from 'react';

import {makeStyles} from '@material-ui/core/styles';
import ListItemText from "@material-ui/core/ListItemText";
import {intToMoney} from "../../../utils/utils";
import ListItem from "@material-ui/core/ListItem";
import {Typography} from "@material-ui/core";
import {getTotalBalance} from "../../utils/utils";
import ChevronRight from '@material-ui/icons/ChevronRight';

const useStyles = makeStyles(theme => ({
    listItem: {
        width: '250px',
        'white-space': 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis'
    },

    balance: {
        'text-align': 'right',
        paddingRight:5
    },
}));

export default function AccountsOverview(props) {
    const classes = useStyles();
    const accounts = props.accounts;
    const onSelect = props.onSelect;


    let totalBalance = getTotalBalance(accounts);

    return (
        <ListItem key={`item-all-accounts`} button onClick={()=>onSelect('all_accounts')}>
            <ListItemText className={classes.listItem} primary={<Typography variant='h5'> All accounts</Typography>}/>
            <ListItemText className={classes.balance}
                          primary={
                              <Typography variant='h6' color='textSecondary'> {intToMoney(totalBalance)}</Typography>
                          }/>
            <ChevronRight color='action'/>
        </ListItem>
    );
}
