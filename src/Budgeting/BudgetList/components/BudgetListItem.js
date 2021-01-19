import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid'
import {Typography} from "@material-ui/core";
import {ListItem} from "@material-ui/core";
import {Collapse} from "@material-ui/core";
import {Divider} from "@material-ui/core";

import {ButtonGroup, Button} from "@material-ui/core";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import TextField from "@material-ui/core/TextField";
import InputAdornment from '@material-ui/core/InputAdornment'

import DeleteIcon from '@material-ui/icons/Delete';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faFileInvoiceDollar} from "@fortawesome/free-solid-svg-icons/faFileInvoiceDollar";

import BudgetProgressBar from './BudgetProgressBar'

import {formatMoney} from "../../utils/formatMoney";

const useStyles = makeStyles(theme => ({
    root: {},
    li: {
        display: 'block',
        paddingBottom: theme.spacing(2),
        paddingLeft: theme.spacing(3),
        paddingRight: theme.spacing(2)
    },
    budgetOpt: {
        paddingTop: theme.spacing(2),
        paddingBottom: theme.spacing(1),
    },
    input: {
        width: '100px',
        paddingRight: theme.spacing(3)
    },
    rightIcon: {
        marginLeft: theme.spacing(1),
        [theme.breakpoints.down('sm')]: {
            marginLeft: 0
        },
    },
    buttonText: {
        [theme.breakpoints.down('sm')]: {
            display: "none"
        },
    },
    text: {
        paddingLeft: 0,
        paddingRight: 8,
    }
}));

export default function BudgetListItems(props) {
    const [budget, setBudget] = [props.budget, props.setBudget];
    const type = props.type;
    const subtype = props.subtype;
    const spending = props.spending;
    const datePercentage = props.datePercentage;
    const showDatePercentage = props.showDatePercentage;

    const onClick = props.onClick;
    const onDelete = props.onDelete;
    const open = props.open;


    const classes = useStyles();

    return (
        <div className={classes.root} key={type + '-' + subtype}>
            <ListItem className={classes.li} button onClick={onClick}>
                <Grid container justify="center" className={classes.text}>
                    <Grid item xs={8}>
                        <Typography>{type} <b>{subtype}</b></Typography> </Grid>
                    <Grid item xs={4}><Typography
                        align="right">{
                        (spending > budget) ? `${formatMoney(spending - budget)} over` :
                            `${formatMoney(budget - spending)} left`
                    }</Typography></Grid> </Grid>
                <BudgetProgressBar spending={spending} budget={budget} datePercentage={datePercentage}
                                   showDatePercentage={showDatePercentage}/> </ListItem>
            <Collapse in={open} unmountOnExit mountOnEnter>
                <Divider variant='middle'/>
                <Grid container className={classes.budgetOpt} justify="center">
                    <Grid item>
                        <FormControlLabel
                            control={<TextField
                                margin='dense'
                                type="number"
                                defaultValue={budget}
                                onChange={(e) => {
                                    //e.target.value = Math.max(0, e.target.value);
                                    setBudget(Number(e.target.value))
                                }}
                                className={classes.input}
                                InputProps={{
                                    startAdornment: <InputAdornment position="start">$</InputAdornment>,
                                }}
                                onBlur={(e) => e.target.value = budget}
                            />}
                            label="Budget: &nbsp;"
                            labelPlacement="start"/> </Grid>
                    <Grid item>
                        <ButtonGroup variant="outlined" color="primary" size="medium"
                                     aria-label="Full width outlined button group">
                            <Button onClick={onDelete}>
                                <Typography variant="button" className={classes.buttonText}> delete budget</Typography>
                                <DeleteIcon className={classes.rightIcon}/></Button>
                            <Button>
                                <Typography variant="button" className={classes.buttonText}> transactions </Typography>
                                <span className={classes.rightIcon}> <FontAwesomeIcon icon={faFileInvoiceDollar}
                                                                                      size='lg'
                                                                                      fixedWidth/>
                                </span></Button></ButtonGroup></Grid> </Grid> </Collapse>
            <Divider component="hr"/></div>
    );
}