import Button from '@material-ui/core/Button'
import Create from '@material-ui/icons/Add'
import Modal from '@material-ui/core/Modal';
import {makeStyles} from '@material-ui/core/styles';
import React from "react";
import Paper from "@material-ui/core/Paper";
import {TextField} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";

import {budgetSubCategories} from "../../utils/categories";

const useStyles = makeStyles(theme => ({

    paper: {
        top: `50%`,
        left: `50%`,
        width: 560,
        [theme.breakpoints.down('xs')]: {
            maxWidth: 360
        },
        transform: `translate(-50%, -50%)`,
        position: 'absolute',
        padding: theme.spacing(2, 4, 4),
        outline: 'none',
    },
    createButton: {
        marginTop: -16,
        marginBottom: 4,
    },
    form: {
        paddingTop: 16
    },
    formControl: {},
    subCategoryInput: {
        width: 260
    },

}));

const clone = a => JSON.parse(JSON.stringify(a));

const filterUnusedCategories = function (budget, budgetSubCategories) {
    let filteredBudgetSubCategories = clone(budgetSubCategories);
    for (let i in budget) {
        for (let j in budget[i]) {
            filteredBudgetSubCategories[i] = filteredBudgetSubCategories[i].filter(x => x !== j);
        }
        if (filteredBudgetSubCategories[i].length === 0) delete filteredBudgetSubCategories[i];
    }
    return filteredBudgetSubCategories;
};

export default function BudgetAddButtonModel(props) {

    const [budget, setBudget] = [props.budget, props.setBudget];

    const filteredBudgetSubCategories = filterUnusedCategories(budget, budgetSubCategories);
    const filteredBudgetCategories = Object.keys(filteredBudgetSubCategories);


    const [budgetModelOpen, setBudgetModelOpen] = React.useState(false);
    const [selectedCategory, setSelectedCategory] = React.useState(filteredBudgetCategories[0]);
    const [selectedSubCategory, setSelectedSubCategory] = React.useState("");
    const [amount, setAmount] = React.useState(0);
    const [validAmount, setValidAmount] = React.useState([true, ""]);

    const validateAmount = amount => {
        if (amount === "") return [false, "invalid value"];
        amount = Number(amount);
        if (amount < 0) return [false, "budget should be positive"];

        let typeTotal = 0;
        for (let st in budget[selectedCategory]) {
            if (st !== 'Overall')
                typeTotal += budget[selectedCategory][st];
        }
        if (selectedSubCategory === "Overall" && typeTotal > amount)
            return [false, `minimum value is ${typeTotal}`];
        if (selectedSubCategory !== "Overall" &&
            budget[selectedCategory] &&
            budget[selectedCategory].Overall &&
            amount + typeTotal > budget[selectedCategory].Overall)
            return [false, `maximum value is ${budget[selectedCategory].Overall - typeTotal}`];
        return [true, ""];
    };

    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Button variant="outlined" size="small" color="default" className={classes.createButton}
                    onClick={() => setBudgetModelOpen(true)}>
                <Create/> &nbsp;Create New Budget</Button>
            <Modal
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
                open={budgetModelOpen}
                onClose={() => setBudgetModelOpen(false)}
            >
                <Paper elevation={10} className={classes.paper}>
                    <Typography variant={"h5"}>Create New Budget</Typography>
                    <Grid container className={classes.form} spacing={2} alignItems={"center"}>
                        <Grid item>
                            <FormControl variant="standard" className={classes.formControl}>
                                <InputLabel htmlFor="categories-select">
                                    Type
                                </InputLabel>
                                <Select
                                    native
                                    inputProps={{
                                        id: 'categories-select',
                                    }}
                                    value={selectedCategory}
                                    onChange={(e) => {
                                        setSelectedCategory(e.target.value);
                                        setSelectedSubCategory("");
                                        setAmount(0);
                                    }}>
                                    {filteredBudgetCategories.map(c => <option key={c}
                                                                               value={c}>{c}</option>)}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item>
                            <FormControl variant="standard" className={classes.formControl}
                                         disabled={selectedCategory === ""}>
                                <InputLabel htmlFor="subcategories-select">
                                    Subtype
                                </InputLabel>
                                <Select
                                    native
                                    inputProps={{
                                        id: 'subcategories-select',
                                        className: classes.subCategoryInput
                                    }}
                                    value={selectedSubCategory}
                                    onChange={(e) => {
                                        setSelectedSubCategory(e.target.value);
                                        setAmount(0);
                                    }}>
                                    <option value={""}/>
                                    {filteredBudgetSubCategories[selectedCategory] &&
                                    filteredBudgetSubCategories[selectedCategory].map(c =>
                                        <option key={c} value={c}>{c}</option>)}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item>
                            <TextField
                                error={!validAmount[0]}
                                id="amount"
                                label="Amount"
                                helperText={validAmount[1]}
                                value={amount}
                                onChange={e => {
                                    setAmount(Number(e.target.value));
                                    setValidAmount(validateAmount(e.target.value));
                                }}
                                type="number"
                                margin="normal"
                            />
                        </Grid>
                        <Grid item xs={12} container spacing={1}>
                            <Grid item>
                                <Button variant={"outlined"}
                                        onClick={() => {
                                            if (selectedSubCategory === "" ||
                                                selectedCategory === "" ||
                                                amount === "" ||
                                                !validAmount[0]
                                            ) return true;
                                            if (!budget[selectedCategory])
                                                budget[selectedCategory] = {};
                                            budget[selectedCategory][selectedSubCategory] = amount;
                                            setBudget(clone(budget));
                                            setBudgetModelOpen(false);
                                        }}>save</Button> </Grid>
                            <Grid item>
                                <Button variant={"outlined"} onClick={() => setBudgetModelOpen(false)}>cancel</Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </Paper>

            </Modal>
        </div>
    );
}