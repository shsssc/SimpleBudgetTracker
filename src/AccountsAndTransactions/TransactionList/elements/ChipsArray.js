import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        //justifyContent: 'center',
        flexWrap: 'wrap',
        padding: theme.spacing(0.5),
    },
    chip: {
        margin: theme.spacing(0.5),
    },
    input: {
        width: "2cm"
    }
}));

export default function ChipsArray(props) {
    const classes = useStyles();
    let initVal = props.defaultValue || [];
    let onChange = props.onChange || (() => undefined);
    const [chipData, setChipData] = React.useState(initVal);

    let newTagValue = "";

    const handleDelete = chipToDelete => () => {
        setChipData(chips => {
            let result = chips.filter(chip => chip.key !== chipToDelete.key);
            onChange(result);
            return result;
        });
    };

    return (
        <div className={classes.root}>
            {chipData.map(data => {

                return (
                    <Chip
                        key={data.key}
                        label={data.label}
                        onDelete={handleDelete(data)}
                        className={classes.chip}
                    />
                );
            })}
            <TextField margin={"dense"} placeholder="+ tag" className={classes.input} onKeyDown={function (e) {
                if (e.keyCode === 13) {
                    setChipData(
                        (Chips) => {
                            let result = Chips.concat({key: Chips.length, label: newTagValue});
                            onChange(result);
                            return result;
                        });
                    e.target.value = "";
                }
            }} onChange={val=>
                newTagValue = val.target.value
            }/>
        </div>
    );
}
