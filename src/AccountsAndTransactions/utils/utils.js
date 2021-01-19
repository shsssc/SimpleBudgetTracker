export const makeClickHandler = onSelect => account_id => _ => onSelect(account_id);
export const getTotalBalance = accounts => accounts.reduce(
    (accu, acct) => accu + acct.balances.current * ((acct.subtype === 'credit card') ? -100 : 100), 0) / 100;
export const genAllAccounts = (accounts) => ({
    account_id: 'all_accounts',
    name: 'All accounts',
    balances: {current: getTotalBalance(accounts)},
    subtype: 'all accounts'
});