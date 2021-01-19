import DateFnsUtils from "@date-io/date-fns";
const dateFns = new DateFnsUtils();
const d = new Date();
export const getDatePercentage = () => 99.5 * (d - dateFns.startOfMonth(d)) / (
    dateFns.endOfMonth(d) - dateFns.startOfMonth(d));