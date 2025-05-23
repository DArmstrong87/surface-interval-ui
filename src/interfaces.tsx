export interface LoginForm {
    email: string;
    password: string;
}

interface AirConsumption {
    most_efficient: {
        cu_ft_min: number;
        ltrs_min: number;
    };
    least_efficient: {
        cu_ft_min: number;
        ltrs_min: number;
    };
    average: {
        cu_ft_min: number;
        ltrs_min: number;
    };
}

export interface Diver {
    id: number;
    user: {
        first_name: string;
        last_name: string;
        username: string;
    };
    units: string;
    total_dives: number;
    most_recent_dive: string;
    deepest_dive: number | null;
    longest_dive: number | null;
    shortest_dive: number | null;
    most_logged_specialty: {
        specialty_name: string;
        count: number;
    };
    air_consumption: AirConsumption | null;
}

export interface DiverProfileProps {
    diver: Diver | undefined;
}

export interface Dive {
    id: number;
    date: string;
    gear_set: GearSet;
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

export type Dives = Array<Dive>;

export interface GearType {
    id: number;
    name: string;
}

export interface CustomGearType {
    id: number;
    name: string;
    diver: {
        id: number;
        name: string;
    };
}

export interface GearItem {
    id: number;
    gear_type: {
        id: number;
        name: string;
    };
    custom_gear_type: {
        id: number;
        name: string;
    } | null;
    name: string;
    service_tracking: boolean;
    service_interval: GearItemServiceInterval | null;
    service_history: GearItemServiceHistory[];
    dives_since_last_service: number;
    days_since_last_service: number;
    due_for_service_days: number;
    due_for_service_dives: number;
}

export interface GearSet {
    id: number;
    name: string;
    weight: number;
    gear_items: GearItem[];
}

export interface GearItemService {
    purchaseDate: string;
    serviceDate: string;
    diveInterval: number;
    dayInterval: number;
}

export interface GearItemServiceHistory {
    id: number;
    gear_item: GearItem;
    service_date: string;
}

export interface GearItemServiceInterval {
    id: number;
    gear_item: GearItem;
    purchase_date: string;
    dive_interval: number;
    day_interval: number;
}

export interface NewGearItemServiceInterval {
    id: number;
    gearItemId: number;
    purchaseDate: string;
    lastServiceDate: string | null;
    diveInterval: number;
    dayInterval: number;
}
