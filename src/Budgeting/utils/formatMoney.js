export const formatMoney = function (amount) {
    return '$'+Math.round(amount*100)/100;
};