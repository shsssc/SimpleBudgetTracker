import DateFnsUtils from "@date-io/date-fns";

export const getTotalBudget = function (budgetObj) {
    let result = 0;
    for (let type in budgetObj)
        if (budgetObj[type].Overall !== undefined) result += budgetObj[type].Overall;
        else for (var subtype in budgetObj[type])
            result += budgetObj[type][subtype];
    return result;
};

export const getMonthRange = function (date) {
    const dateFns = new DateFnsUtils();
    const end = dateFns.format(dateFns.endOfMonth(date), 'yyyy-MM-dd');
    const begin = dateFns.format(dateFns.startOfMonth(date), 'yyyy-MM-dd');
    return [begin, end];
};

export const getSpendingCategories = function (transactions) {
    let result = {};
    for (let i in transactions) {
        const item = transactions[i];
        if (!result[item.category[0]])
            result[item.category[0]] = {};
        if (!result[item.category[0]]['Overall'])
            result[item.category[0]]['Overall'] = 0;
        if (item.category.length > 1) {
            if (!result[item.category[0]][item.category[1]]) {
                result[item.category[0]][item.category[1]] = 0;
            }
            result[item.category[0]][item.category[1]] += Math.round(item.amount * 100);
        }
        result[item.category[0]]['Overall'] += Math.round(item.amount * 100);
    }

    for (let i in result) {
        for (let j in result[i])
            result[i][j] /= 100;
    }

    return result;
};

export const getSpendingByCategory = amountByCategory => type => subtype => {
    if (!amountByCategory || !amountByCategory[type] || !amountByCategory[type][subtype]) return 0;
    return Math.round(100 * amountByCategory[type][subtype]) / 100;
};

export const getOverallSpending = budgetObj => amountByCategory => {
    let result = 0;
    for (let i in budgetObj) {
        if (budgetObj[i]['Overall']) result += 100 * getSpendingByCategory(amountByCategory)(i)('Overall');
        else
            for (let j in budgetObj[i]) {
                result += 100 * getSpendingByCategory(amountByCategory)(i)(j);
            }
    }
    return Math.round(result) / 100;
};

export const getDateRange = transactions => {
    //should be on DB
    const minDate = transactions.reduce((accu, t) => t.date < accu ? t.date : accu, transactions[0].date);
    const maxDate = transactions.reduce((accu, t) => t.date > accu ? t.date : accu, transactions[0].date);
    return [minDate, maxDate];
};