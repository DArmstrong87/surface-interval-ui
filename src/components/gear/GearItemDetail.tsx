import React, { useState, useEffect } from "react";
import APIService from "../../api/APIService";
import { GearItem, GearItemServiceInterval } from "../../interfaces";
import { useParams, useNavigate } from "react-router-dom";

function GearItemDetail() {
    const navigate = useNavigate();
    const { gearItemId } = useParams();
    const [gearItem, setGearItem] = useState<GearItem | null>(null);
    const [gearItemServiceInterval, setGearItemServiceInterval] = useState<GearItemServiceInterval | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(true);

        fetchGearItemAndServiceInterval();
    }, [gearItemId]);

    const fetchGearItemAndServiceInterval = async () => {
        try {
            const [gearItem, gearItemServiceInterval] = await Promise.all([
                APIService.fetchData<GearItem>(`/gear-items/${gearItemId}`),
                APIService.fetchData<GearItemServiceInterval>(`/gear-item-service-intervals/${gearItemId}`),
            ]);
            setGearItem(gearItem);
            setGearItemServiceInterval(gearItemServiceInterval);
        } catch (error) {
            console.warn("Error fetching gear item:", error);
            setGearItem(null);
            setGearItemServiceInterval(null);
        } finally {
            setIsLoading(false);
        }
    };

    const deleteGearItem = () => {
        if (window.confirm("Are you sure you want to delete this gear item?")) {
            APIService.deleteData(`/gear-items/${gearItemId}`)
                .then(() => {
                    navigate("/gear");
                })
                .catch((error) => console.warn("Error deleting gear item:", error));
        }
    };

    return (
        <>
            {isLoading && <p>Loading...</p>}

            {!isLoading && gearItem && (
                <>
                    <div>
                        <h1>Gear Item Detail</h1>
                        <h2>{gearItem.name}</h2>
                        <p>Type: {gearItem.gear_type?.name || gearItem.custom_gear_type?.name || "Unknown Type"}</p>

                        {gearItem.service_tracking && gearItemServiceInterval && (
                            <>
                                <h3>Service Tracking</h3>
                                <p>Purchase Date: {gearItemServiceInterval.purchase_date}</p>

                                {gearItem.days_since_last_service > 0 ? (
                                    <p>This item is overdue for service by {gearItem.days_since_last_service} days</p>
                                ) : (
                                    <p>Days until next service: {gearItem.due_for_service_days}</p>
                                )}

                                {gearItem.dives_since_last_service > 0 ? (
                                    <p>This item is overdue for service by {gearItem.dives_since_last_service} dives</p>
                                ) : (
                                    <p>Dives until next service: {Math.abs(gearItem.due_for_service_dives)}</p>
                                )}
                            </>
                        )}
                    </div>
                    <button onClick={deleteGearItem}>Delete</button>
                </>
            )}

            {!isLoading && !gearItem && <p>No gear item found.</p>}
        </>
    );
}

export default GearItemDetail;
