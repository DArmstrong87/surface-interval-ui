import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import APIService from '../../api/APIService';
import { Dive } from '../../interfaces';



function Dives() {

    const navigate = useNavigate();
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
        <h1>Dive Log</h1>

        <button onClick={() => navigate('logDive')}>Log Dive</button>

        <table>
            <thead>
                <tr>
                    <th>
                        Dive Log
                    </th>
                </tr>
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
