import React from 'react';
import Paper from '@material-ui/core/Paper';
import {makeStyles} from "@material-ui/core";

import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';
import BudgetList from "./BudgetList/BudgetList";
import {Route} from "react-router-dom";

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

export default function Budgeting(props) {
    const classes = useStyles();

    const [showTransactions, setShowTransactions] = React.useState(false);
    return (

        <div className={classes.root}>
            <div className={classes.heightFixed}>
                <Breadcrumbs aria-label="Breadcrumb" className={classes.breadcrumbs}>
                    <Link color="inherit" href="#">
                        AppName
                    </Link>
                    <Link href="#" onClick={(e) => setShowTransactions(false)}
                          color={!showTransactions ? "textPrimary" : 'textSecondary'}>
                        Budgets
                    </Link>
                    {showTransactions ? <Link
                        color="textPrimary"
                        href="#"
                        aria-current="page"
                    >
                        Transactions
                    </Link> : ''}
                </Breadcrumbs>
            </div>
            <Paper className={classes.heightFill}>
                <Route path="/budgets/:selectedMonth?" component={BudgetList}/>
            </Paper>
        </div>
    );
}