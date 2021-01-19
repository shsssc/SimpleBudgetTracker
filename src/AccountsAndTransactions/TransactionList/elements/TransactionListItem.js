import React from 'react';

import {makeStyles} from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import WorkIcon from '@material-ui/icons/Work';
import Icon from '@material-ui/core/Icon'
import Collapse from '@material-ui/core/Collapse';
import Divider from '@material-ui/core/Divider'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faExchangeAlt} from "@fortawesome/free-solid-svg-icons";

import ChipsArray from './ChipsArray'
import TransactionListItemMap from './TransactionListItemMap'
import {debounce, sendData} from "../../../utils/utils";

const useStyles = makeStyles(theme => ({

    listItem: {
        width: '250px',
        'white-space': 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis'
    },

    amountTransaction: {
        'text-align': 'right'
    },

}));

const TypeIcon = props => {
    if (props.type.search("Food") !== -1)
        return <Icon>restaurant</Icon>;
    if (props.type.search("Parking") !== -1)
        return <Icon>local_parking</Icon>;
    if (props.type.search("Gas") !== -1)
        return <Icon>local_gas_station</Icon>;
    if (props.type.search("Travel") !== -1)
        return <Icon>train</Icon>;
    if (props.type.search("Shops") !== -1)
        return <Icon>local_grocery_store</Icon>;
    if (props.type.search("Transfer") !== -1 || props.type.search("Payment") !== -1)
        return <FontAwesomeIcon icon={faExchangeAlt}/>;
    if (props.type.search("Recreation") !== -1) {
        return <Icon>fitness_center</Icon>
    }
    return <WorkIcon/>
};

const makeChange = item => name => debounce(value => {

    sendData('http://127.0.0.1:3001/api/transactions/' + item.id + '/' + name, {
        value: value
    })
        .catch(e => console.log(e));
    item[name] = value;
}, 1000);

const TransactionListItem = React.memo(TransactionListItem1);

export default TransactionListItem;

function TransactionListItem1(props) {
    const classes = useStyles();
    let item = props.item;
    let open = props.open;
    const changeFunctionBuilder = makeChange(item);
    const commentsChange = changeFunctionBuilder("comments");
    const tagChange = changeFunctionBuilder("tags");
    let toggleCollapse = props.toggleState(item.id);
    let includeDate = props.showDate;
    let includeType = props.showType;
    return (
        <div>
            <ListItem dense button onClick={toggleCollapse}>
                <ListItemAvatar>
                    <Avatar>
                        <TypeIcon type={item.type}/>
                    </Avatar>
                </ListItemAvatar>
                <ListItemText primary={item.name}
                              secondary={(includeType) ? item.type : (includeDate) ? item.date : undefined}
                              className={classes.listItem}/>
                <ListItemText className={classes.amountTransaction}
                              secondary={(includeDate && includeType) ? item.date : undefined}>${item.amount}</ListItemText>
            </ListItem>
            <Collapse in={open} timeout="auto" unmountOnExit>
                <List component="ul" disablePadding>
                    <Divider variant={"middle"}/>
                    <ListItem className={classes.nested}>

                        <Grid container justify="center">
                            <Grid item xs={12}><Typography color={'textSecondary'}>Location: </Typography></Grid>
                            <Grid item xs={12}> <TransactionListItemMap item={item}/> </Grid>
                        </Grid>

                    </ListItem>
                    <Divider variant={"middle"}/>
                    <ListItem className={classes.nested}>
                        <Grid container>
                            <Grid item xs={12}><Typography color={'textSecondary'}>Tags: </Typography></Grid>
                            <Grid item xs={12}><ChipsArray defaultValue={item.tags}
                                                           onChange={(val => tagChange(val))}/></Grid>
                        </Grid>
                    </ListItem>
                    <Divider variant={"middle"}/>
                    <ListItem className={classes.nested}>
                        <Grid container>
                            <Grid item xs={12}><Typography color={'textSecondary'}>Split with: </Typography></Grid>
                            <Grid item xs={12}><ChipsArray/></Grid>
                        </Grid>
                    </ListItem>
                    <Divider variant={"middle"}/>
                    <ListItem className={classes.nested}>
                        <Grid container justify="center" alignItems="center">
                            <Grid item xs={12}><Typography color={'textSecondary'}>Comments: </Typography></Grid>
                            <Grid item xs={12}>
                                <TextField fullWidth margin={"normal"} placeholder="Enter Comments Here" multiline
                                           defaultValue={item.comments}
                                           onChange={event=>(commentsChange)(event.target.value)}/>
                            </Grid>
                        </Grid>
                    </ListItem>

                </List>

            </Collapse>

        </div>
    )
}