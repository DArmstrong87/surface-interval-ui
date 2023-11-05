import React, { useEffect, useState } from 'react';
import APIService from '../api/APIService';

interface Dive {
    id: number;
    date: string;
    gear_set: any;
    country_state: string;
    site: string;
    water: string;
    depth: number;
    time: number;
    description: string;
    start_pressure: number;
    end_pressure: number;
    tank_vol: number;
    air_consumption: number;
    favorite: boolean;
}

function Dives() {

    const [dives, setDives] = useState<Dive[]>([])

    useEffect(() => {
        APIService.fetchData("/dives")
            .then(dives => setDives(dives))
    }, [])

    function diveList(dives: Dive[]) {
        return dives.map((dive, index) =>
            <li key={index} style={{ color: "white" }} >{dive.site}</li>
        )
    }

    return (<>
        <h1 style={{ color: "white" }}>Hello</h1>
        <ul>
            {diveList(dives)}
        </ul>
    </>
    );
}

export default Dives;
