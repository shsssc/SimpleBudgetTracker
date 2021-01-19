import React from 'react';
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import {Grid, makeStyles, Typography} from "@material-ui/core";
import {intToMoney, sendData} from "../utils/utils";
import Divider from "@material-ui/core/Divider";


const useStyles = makeStyles(theme => ({
    root: {
        padding: theme.spacing(2),
        height: '100%'
    },
    numAccount: {
        height: '100%'
    },
    account: {
        paddingTop: 8
    },
    bankName: {
        paddingBottom: 8
    },
    card: {
        marginBottom: theme.spacing(2),
        marginTop: theme.spacing(2)
    },
    breakText: {
        [theme.breakpoints.down('sm')]: {
            display: 'none'
        },
    }
}));

const CredentialCard = props => {
    const accounts = props.accounts || [];
    const numAccounts = accounts.length;
    const classes = useStyles();
    const bankName = props.bankName;
    return (
        <Card className={classes.card}>
            <CardContent>
                <Grid container justify="center" alignItems="flex-end" className={classes.bankName}>
                    <Grid item xs={7}>
                        <Typography variant='h5' noWrap>{bankName}</Typography>
                    </Grid>
                    <Grid item xs={5}>
                        <Typography variant='h6' align="right"
                                    color="textSecondary">
                            {numAccounts} {numAccounts > 1 ? "Accounts" : "Account"}</Typography></Grid></Grid>
                <Divider/>
                {accounts.map(acct =>
                    <Grid container key={acct.name} className={classes.account}><Grid item xs={8}><Typography
                        noWrap>{acct.name} (...{acct.mask})</Typography></Grid>
                        <Grid item xs={4}><Typography align="right"
                                                      color="textSecondary"> {intToMoney(acct.current_balance / 100)}</Typography></Grid>
                    </Grid>
                )}
            </CardContent>
            <CardActions>
                <Button size="small" color={"primary"} onClick={props.onDelete}>remove</Button>
            </CardActions>
        </Card>
    );
};

export default function Credentials(props) {

    const classes = useStyles();

    //const credentials = props.credentials || [testCredential];
    const [credentials, setCredentials] = React.useState([]);

    React.useEffect(() => {
        sendData('http://127.0.0.1:3001/api/credential', {}, 'GET')
            .then(result => setCredentials(result.result))
            .catch(e => console.log(e));
    }, []);

    const makeOnDelete = (item_id) => () =>
        sendData('http://127.0.0.1:3001/api/credential', {item_id: item_id}, 'DELETE')
            .then(
                setCredentials(
                    credentials => credentials.filter(x => x.item_id !== item_id)
                ))
            .catch(e => console.log(e));

    const handler = global.Plaid.create({
        clientName: 'Plaid Quickstart',
        countryCodes: ['US'],
        env: 'sandbox',
        key: '73d8207746f3b2bb1f4b7906f7ef34',
        product: ['transactions'],
        webhook: 'https://requestb.in',
        language: 'en',
        onSuccess: function (public_token, metadata) {
            sendData('http://127.0.0.1:3001/api/credential', metadata)
                .then(d => (setCredentials(c => c.concat(d))))
                .catch(e => console.log(e));
        },
    });

    return (
        <div className={classes.root}>
            <Grid container>
                <Grid item xs={8}>
                    <Typography variant={"h4"}>Credentials</Typography>
                </Grid>
                <Grid item container xs={4} justify={"flex-end"} alignItems={"flex-end"}>
                    <Grid item>
                        <Button href='#' size="medium" variant="outlined"
                                onClick={() => handler.open()}><span>+&nbsp;</span><span>Add</span><span
                            className={classes.breakText}>&nbsp;Credential</span></Button>
                    </Grid>
                </Grid>
            </Grid>
            {
                (credentials.length !== 0
                    && credentials.map(credential =>
                        <CredentialCard
                            key={credential.item_id}
                            bankName={credential.institution}
                            accounts={credential.accounts}
                            onDelete={makeOnDelete(credential.item_id)}/>))
                || <Typography variant={"h5"} align={'center'}>No credential</Typography>
            }

        </div>);
};