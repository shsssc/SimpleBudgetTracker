import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import List from '@material-ui/core/List'

import BudgetListItem from './BudgetListItem'
import ListSubheader from "@material-ui/core/ListSubheader";
import Typography from "@material-ui/core/Typography";

const useStylesFacebook = makeStyles({
    root: {
        paddingTop: 0,
        paddingBottom: 0
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
});

const clone = obj => JSON.parse(JSON.stringify(obj));

export default function BudgetingListList(props) {


    const classes = useStylesFacebook();

    const showDatePercentage = props.showDatePercentage;

    const [selected, setSelected] = React.useState(-1);
    const [budgetObj, setBudgetObj] = [props.budget, props.setBudget];
    const getSpendingByCategory = props.getSpendingByCategory;

    const makeOnClick = id => () => {
        selected === id ? setSelected(-1) : setSelected(id)
    };


    const makeSetBudget = type => subtype => newBudget => setBudgetObj(old => {
        if (newBudget < 0) newBudget = 0;
        let currentTotal = 0;
        for (let st in old[type]) {
            if (st !== 'Overall')
                currentTotal += old[type][st];
        }
        if (subtype !== 'Overall') {
            if (old[type].Overall && newBudget - old[type][subtype] + currentTotal > old[type].Overall)
                newBudget = old[type].Overall + old[type][subtype] - currentTotal;
            (old[type][subtype] = newBudget);
            return clone(old);
        }

        if (currentTotal > newBudget) newBudget = currentTotal;
        (old[type][subtype] = newBudget);
        return clone(old);
    });
    const makeOnDelete = type => subtype => () => setBudgetObj(old => {
            (delete old[type][subtype]);
            if (Object.keys(old[type]).length === 0) delete old[type];
            return clone(old)
        }
    );

    let result = Object.keys(budgetObj).map((type) => (
        Object.keys(budgetObj[type]).length !== 0 &&
        <li key={`section-${type}`} className={classes.listSection}>
            <ul className={classes.ul}>
                <ListSubheader className={classes.subheader}> <Typography>{`${type}`}</Typography> </ListSubheader>
                {Object.keys(budgetObj[type]).map(
                    subtype =>
                        <BudgetListItem key={subtype} type={subtype} subtype={''}
                                        spending={getSpendingByCategory(type)(subtype)}
                                        budget={budgetObj[type][subtype]}
                                        setBudget={
                                            makeSetBudget(type)(subtype)
                                        }
                                        onDelete={makeOnDelete(type)(subtype)}
                                        onClick={makeOnClick(type + '-' + subtype)}
                                        open={type + '-' + subtype === selected}
                                        showDatePercentage={showDatePercentage}/>)}</ul>
        </li>));

    if (result.length === 0) return (
        <Typography align="center"><br/>You don't have any budget rule.QAQ</Typography>
    );

    return (
        <List className={classes.root}>
            {result}
        </List>);
};