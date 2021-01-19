import React from 'react';

import {makeStyles} from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListSubheader from '@material-ui/core/ListSubheader';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography'
import {intToMoney, groupData} from '../../../utils/utils';
import Divider from "@material-ui/core/Divider";
import ChevronRight from '@material-ui/icons/ChevronRight'

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        //height:'calc(100vh-1px)',
        backgroundColor: theme.palette.background.paper,
    },
    listItem: {
        width: '250px',
        'white-space': 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis'
    },
    listSection: {
        backgroundColor: 'inherit',
    },
    ul: {
        backgroundColor: 'inherit',
        padding: 0,
    },
    balance: {
        'text-align': 'right',
        paddingRight: 5
    },
    subheader: {
        backgroundColor: '#dfdfdf',
        paddingTop: 2,
        paddingBottom: 2,
    },
}));
//todo bankName
export default function AccountListList(props) {
    const accounts = groupData('subtype')(props.accounts);
    const onSelect = props.onSelect;
    const classes = useStyles();
    console.log(accounts);
    let result = Object.keys(accounts).map((type) => (
        <li key={`section-${type}`} className={classes.listSection}>
            <ul className={classes.ul}>
                <ListSubheader className={classes.subheader}> <Typography>{`${type}`}</Typography> </ListSubheader>
                {(accounts[type]).map((account, i) => (
                    <div key={account.account_id}>
                        {((i !== 0) ? <Divider component={'hr'}/> : undefined)}
                        <ListItem key={`item-${account.account_id}`} dense button
                                  onClick={() => onSelect(account.account_id)}>
                            <ListItemText className={classes.listItem} primary={`${account.name}`}
                                          secondary='Bank of America'/>
                            <ListItemText className={classes.balance}
                                          primary={<Typography
                                              variant='h6'
                                              color='textSecondary'> {intToMoney(account.balances.current)}</Typography>}/>
                            <ChevronRight color='action'/>
                        </ListItem></div>                ))}</ul></li>));

    return (
        <List className={classes.root} subheader={<li/>} component={'ul'}>
            {result}
        </List>
    );}