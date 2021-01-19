import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import {makeStyles, useTheme} from '@material-ui/core/styles';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {
    faChartBar,
    faChartPie,
    faFileInvoiceDollar,
    faFingerprint,
    faUserFriends
} from '@fortawesome/free-solid-svg-icons'

import AccountsAndTransactions from '../AccountsAndTransactions/AccountsAndTransactions'
import Budgeting from "../Budgeting/Budgeting";
import Credentials from "../Credentials/Credentials";

import {BrowserRouter as Router, Link, Route} from "react-router-dom";
import Overview from "../Overview/Overview";
import {AccountCircle} from "@material-ui/icons";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import {sendData} from "../utils/utils";


const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
    },
    drawer: {
        [theme.breakpoints.up('sm')]: {
            width: drawerWidth,
            flexShrink: 0,
        },
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
    },
    appName: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
        [theme.breakpoints.up('sm')]: {
            display: 'none',
        },
    },
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
        width: drawerWidth,
    },
    content: {
        paddingTop: 60,
        [theme.breakpoints.up('sm')]: {
            paddingTop: 72
        },
        maxHeight: '100vh',
        flexGrow: 1,
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(2),
        paddingBottom: theme.spacing(2),
    },
    iconSpan: {
        display: 'inline-flex',
        color: 'rgba(0, 0, 0, 0.54)',
        minWidth: 56,
        flexShrink: 0

    },
    icon: {
        "fill": "currentColor",
        "width": "1em",
        "height": "1em",
        "display": "inline-block",
        "fontSize": "2rem",
        "transition": "fill 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
        "flexShrink": "0",
        "userSelect": "none"
    },
    noDefault: {
        'color': 'unset',
        textDecoration: 'none'
    }
}));

export default function MainPage(props) {
    const {container} = props;
    const classes = useStyles();
    const theme = useTheme();
    const [mobileOpen, setMobileOpen] = React.useState(false);

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);


    function handleMenu(event) {
        setAnchorEl(event.currentTarget);
    }

    function handleClose() {
        setAnchorEl(null);
    }

    function handleDrawerToggle() {
        setMobileOpen(!mobileOpen);
    }

    const drawer = (
        <div>
            <div className={classes.toolbar}/>
            <Divider/>
            <List>
                <Link to="/" className={classes.noDefault}>
                    <ListItem button key={'Overview'}>
                        <span className={classes.iconSpan}>
                            <FontAwesomeIcon icon={faChartBar} size='lg' fixedWidth/>
                        </span>
                        <ListItemText primary={'Overview'}/>
                    </ListItem>
                </Link>

                <Link to="/transactions" className={classes.noDefault}>
                    <ListItem button key={'Transactions'}>
                        <span className={classes.iconSpan}>
                            <FontAwesomeIcon icon={faFileInvoiceDollar} size='lg' fixedWidth/>
                        </span>
                        <ListItemText primary={'Transactions'}/>
                    </ListItem>
                </Link>
                <Link to="/split" className={classes.noDefault}>
                    <ListItem button key={'Split'}>
                        <span className={classes.iconSpan}>
                            <FontAwesomeIcon icon={faUserFriends} size='lg' fixedWidth/>
                        </span>
                        <ListItemText primary={'Split'}/>

                    </ListItem>
                </Link>
                <Link to="/budgets" className={classes.noDefault}>
                    <ListItem button key={'Budgets'}>
                    <span className={classes.iconSpan}>
                        <FontAwesomeIcon icon={faChartPie} size='lg' fixedWidth/>
                    </span> <ListItemText primary={'Budgets'}/>
                    </ListItem>
                </Link>
                <Link to="/credentials" className={classes.noDefault}>
                    <ListItem button key={'Credentials'}>
                    <span className={classes.iconSpan}>
                        <FontAwesomeIcon icon={faFingerprint} size='lg' fixedWidth/>
                    </span> <ListItemText primary={'Credentials'}/>
                    </ListItem>
                </Link>
            </List>

        </div>
    );

    return (
        <Router>
            <div className={classes.root}>
                <CssBaseline/>
                <AppBar className={classes.appBar}>
                    <Toolbar>
                        <IconButton
                            color="inherit"
                            aria-label="Open drawer"
                            edge="start"
                            onClick={handleDrawerToggle}
                            className={classes.menuButton}
                        >
                            <MenuIcon/>
                        </IconButton>
                        <Typography variant="h6" className={classes.appName}>
                            APP Name Here
                        </Typography>
                        <IconButton
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            color="inherit"
                            onClick={handleMenu}
                        >
                            <AccountCircle/>
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorEl}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={open}
                            onClose={handleClose}
                        >
                            <MenuItem onClick={handleClose}>My account</MenuItem>
                            <MenuItem onClick={() => {
                                sendData('http://127.0.0.1:3001/api/session', {}, 'DELETE').then(
                                    () => props.history.push('/signin'));
                            }}>Log out</MenuItem>
                        </Menu>
                    </Toolbar>
                </AppBar>
                <nav className={classes.drawer} aria-label="Mailbox folders">
                    {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
                    <Hidden smUp implementation="css">
                        <Drawer
                            container={container}
                            variant="temporary"
                            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
                            open={mobileOpen}
                            onClose={handleDrawerToggle}
                            classes={{
                                paper: classes.drawerPaper,
                            }}
                            ModalProps={{
                                keepMounted: true, // Better open performance on mobile.
                            }}
                        >
                            {drawer}
                        </Drawer>
                    </Hidden>
                    <Hidden xsDown implementation="css">
                        <Drawer
                            classes={{
                                paper: classes.drawerPaper,
                            }}
                            variant="permanent"
                            open
                        >
                            {drawer}
                        </Drawer>
                    </Hidden>
                </nav>
                <main className={classes.content}>
                    <Route path="/budgets/" component={Budgeting}/>
                    <Route path="/transactions/:accountID?" component={AccountsAndTransactions}/>
                    <Route path="/credentials" component={Credentials}/>
                    <Route exact path="/" component={Overview}/>
                </main>
            </div>
        </Router>
    );
}
