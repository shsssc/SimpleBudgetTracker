import React from 'react';
import Grid from '@material-ui/core/Grid';
import {makeStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import TextField from "@material-ui/core/TextField";
import Input from '@material-ui/core/Input';
import Select from '@material-ui/core/Select';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import ListItem from '@material-ui/core/ListItem'
import Divider from '@material-ui/core/Divider';
import Collapse from '@material-ui/core/Collapse';
import useMediaQuery from '@material-ui/core/useMediaQuery';

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
    },
    controlLabel: {
        height: '100%'
    },
    formInput: {
        color: theme.palette.primary.dark
    },

    label: {
        //position:'relative',
        //top:0
    }

}));

export default function FilterComponent(props) {
    const [open, setOpen] = React.useState(false);

    const from = props.from;
    const groupBy = props.groupBy;
    const to = props.to;
    const setFrom = props.onFromChange;
    const setTo = props.onToChange;
    const setGroupBy = props.onGroupByChange;

    const largeVersion = useMediaQuery('(min-width:1020px)');

    const classes = useStyles();
    if (!largeVersion)
        return (
            <div>
                <ListItem button dense onClick={() => (setOpen(o => !o))}>
                    <Grid container justify='center'>
                        <Typography component='span'>{from === '' ? 'Big Bang' : from} to {to === '' ? 'Now' : to},
                            by {groupBy}
                        </Typography>
                        {open ? <ExpandLess/> : <ExpandMore/>}
                    </Grid>
                </ListItem>

                <Collapse in={open} timeout="auto" unmountOnExit>
                <Divider component='hr' variant={"middle"}/>
                    <Grid container className={classes.root} spacing={2} justify='center'>

                        <Grid item>
                            <FormControlLabel
                                control={<TextField
                                    margin='dense'
                                    type="date"
                                    defaultValue={from}
                                    InputProps={{
                                        className: classes.formInput
                                    }}
                                    onChange={from => setFrom(from.target.value)}
                                />}
                                label="Transactions from &nbsp;"
                                labelPlacement="start"/>
                        </Grid>
                        <Grid item>
                            <FormControlLabel
                                control={
                                    <TextField
                                        className={classes.formInput}
                                        margin='dense'
                                        type="date"
                                        defaultValue={to}
                                        onChange={to =>
                                            setTo(to.target.value)
                                        }
                                        InputProps={{
                                            className: classes.formInput
                                        }}/>}
                                label="to &nbsp;"
                                labelPlacement="start"/>
                        </Grid>
                        <Grid item>
                            <FormControlLabel
                                className={classes.controlLabel}
                                control={<Select
                                    native
                                    input={
                                        <Input className={classes.formInput}/>
                                    }
                                    onChange={e => setGroupBy(e.target.value)}>
                                    <option value='date'>Date</option>
                                    <option value='type'>Type</option>
                                    <option value='name'>Name</option>
                                </Select>}
                                label="grouped by &nbsp;"
                                labelPlacement="start"/>

                        </Grid>
                    </Grid>
                </Collapse>
            </div>
        );
    return (<Grid container className={classes.root} spacing={2} justify='center'>

        <Grid item>
            <FormControlLabel
                control={<TextField
                    margin='dense'
                    type="date"
                    defaultValue={from}
                    InputProps={{
                        className: classes.formInput
                    }}
                    onChange={from => setFrom(from.target.value)}
                />}
                label="Transactions from &nbsp;"
                labelPlacement="start"/>
        </Grid>
        <Grid item>
            <FormControlLabel
                control={
                    <TextField
                        className={classes.formInput}
                        margin='dense'
                        type="date"
                        defaultValue={to}
                        onChange={to =>
                            setTo(to.target.value)
                        }
                        InputProps={{
                            className: classes.formInput
                        }}/>}
                label="to &nbsp;"
                labelPlacement="start"/>
        </Grid>
        <Grid item>
            <FormControlLabel
                className={classes.controlLabel}
                control={<Select
                    native
                    input={
                        <Input className={classes.formInput}/>
                    }
                    onChange={e => setGroupBy(e.target.value)}>
                    <option value='date'>Date</option>
                    <option value='type'>Type</option>
                    <option value='name'>Name</option>
                </Select>}
                label="grouped by &nbsp;"
                labelPlacement="start"/>

        </Grid>
    </Grid>);

}