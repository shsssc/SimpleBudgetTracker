// @ts-nocheck
import React, {useState} from "react";
import DateFnsUtils from "@date-io/date-fns"; // choose your lib
import {DatePicker, MuiPickersUtilsProvider} from "@material-ui/pickers";
import {makeStyles, withStyles} from "@material-ui/core";
import Textfield from '@material-ui/core/TextField'
import IconButton from '@material-ui/core/IconButton';
import CalendarToday from '@material-ui/icons/CalendarToday';

const StyledTextfiled = withStyles({
    root: {
        width: 0,
        display: 'none',
    },
})(Textfield);

const useStyles = makeStyles(theme => ({
   icon:{
       marginTop:-12,
       marginBottom:-2,
       paddingBottom:12
   }
}));

function ButtonDatePicker(props) {

    const [isOpen, setIsOpen] = useState(false);

    const value=props.value;
    const onChange=props.onChange;
    const minDate = props.minDate||('2000-01-01');
    const maxDate = props.maxDate||('2100-01-01');
    return (
        <span>
            <IconButton className={useStyles().icon} href="#" onClick={() => setIsOpen(true)}>
                <CalendarToday/>
            </IconButton>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <DatePicker
                    views={["year", "month"]}
                    value={value}
                    onChange={onChange
                    }
                    TextFieldComponent={StyledTextfiled}
                    open={isOpen}
                    onOpen={() => setIsOpen(true)}
                    onClose={() => setIsOpen(false)}
                    minDate={minDate}
                    maxDate={maxDate}
                />
            </MuiPickersUtilsProvider>
        </span>
    );
}

export default ButtonDatePicker;