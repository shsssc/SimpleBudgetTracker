import React from 'react';

import {makeStyles} from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListSubheader from '@material-ui/core/ListSubheader';
import Typography from '@material-ui/core/Typography'

import TransactionListItem from './TransactionListItem'
import Divider from "@material-ui/core/Divider";
import {ListItem, ListItemText} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        //height:'calc(100vh-1px)',
        backgroundColor: theme.palette.background.paper,
    },
    listSection: {
        backgroundColor: 'inherit',
    },
    ul: {
        backgroundColor: 'inherit',
        padding: 0,
    },
    amountTransaction: {
        'text-align': 'right'
    },
    subheader: {
        backgroundColor: '#dfdfdf',
        paddingTop: 2,
        paddingBottom: 2,
    },
}));


export default function TransactionListList(props) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(-1);

    let toggle_state = React.useCallback(id => () => {
        setOpen((open) => open === id ? undefined : id);
    }, []);
    let transactions = props.transactions;
    let result = Object.keys(transactions).map((date) => (
        <li key={`section-${date}`} className={classes.listSection}>
            <ul className={classes.ul}>
                <ListSubheader className={classes.subheader}> <Typography>{`${date}`}</Typography> </ListSubheader>
                <ul className={classes.ul}>
                    {(transactions[date]).map((item, i) => (
                        <li key={item.id}>
                            {((i !== 0) ? <Divider component={'hr'}/> : undefined)}
                            <TransactionListItem item={item} open={item.id === open} toggleState={toggle_state}
                                                 showDate={props.showDate} showType={props.showType}/>
                        </li>
                    ))}
                </ul>
            </ul>
        </li>));
    return (

        <List className={classes.root} subheader={<li/>} component={'ul'}>
            {(result).length === 0 ? <ListItem><ListItemText> No Transaction Found</ListItemText></ListItem> : result}
        </List>
    );
}