import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {useEffect} from "react";

const useStyles = makeStyles(theme => ({
    map: {
        height: "45vh"
    }
}));


    const parse_location = function (item) {
    if (!item.location) return undefined;
    let location_obj = item.location;

    if (location_obj.lat) {
        return {lat: location_obj.lat, lng: location_obj.lon};
    }
    if (location_obj.address) {
        return `${location_obj.address}, ${location_obj.city}, ${location_obj.region}`
    }
    return undefined;
};

export default function TransactionListItemMap(props){
    const classes = useStyles();
    let item = props.item;
    let position = parse_location(item);
    let mapref = React.createRef();
    useEffect(() => {
            // The location of Uluru
            if (!position) return;
            // The map, centered at Uluru
            let map = new global.google.maps.Map(
                mapref.current, {zoom: 12, center: position});
            // The marker, positioned at Uluru
            new global.google.maps.Marker({position: position, map: map});
    },[position,mapref]);
    if (position) return (<div ref={mapref} className={classes.map}>Not Avaliable</div>);
    return (
        <div>Not Avaliable</div>
    );
}