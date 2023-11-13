import React, { useEffect, useState } from 'react';
import APIService from '../api/APIService';

interface Dive {
    id: number;
    date: string;
    gear_set: any;
    location: string;
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
    dive_number: number;
}

function Dives() {

    const [dives, setDives] = useState<Dive[]>([])

    useEffect(() => {
        APIService.fetchData("/dives")
            .then(dives => setDives(dives))
    }, [])

    function diveList(dives: Dive[]) {
        return dives.map((dive, index) =>
            <tr key={index}>
                <td key={`${index}-num`}>{dive.dive_number}</td>
                <td key={`${index}-date`}>{dive.date}</td>
                <td key={`${index}-location`}>{dive.location}</td>
                <td key={`${index}-site`}>{dive.site}</td>
                <td key={`${index}-water`}>{dive.water}</td>
                <td key={`${index}-depth`}>{dive.depth}</td>
                <td key={`${index}-time`}>{dive.time}</td>
            </tr>
        )
    }

    return (<>
        <h1>Hello</h1>

        <table>
            <thead>
                <th>
                    <td>Dive Log</td>
                </th>
            </thead>
            <tbody>
                <tr>
                    <td>Number</td>
                    <td>Date</td>
                    <td>Location</td>
                    <td>Site</td>
                    <td>Water</td>
                    <td>Depth</td>
                    <td>Time</td>
                </tr>
                {diveList(dives)}
            </tbody>
        </table>
    </>
    );
}

export default Dives;
