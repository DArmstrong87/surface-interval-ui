// Function to get timezone in US/Central format
export const getUserTimezone = () => {
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

    // Convert IANA timezone to US/Eastern format for the server side
    const timezoneMap: { [key: string]: string } = {
        "America/New_York": "US/Eastern",
        "America/Chicago": "US/Central",
        "America/Denver": "US/Mountain",
        "America/Phoenix": "US/Arizona",
        "America/Los_Angeles": "US/Pacific",
        "America/Anchorage": "US/Alaska",
        "Pacific/Honolulu": "US/Hawaii",
        "Pacific/Samoa": "US/Samoa",
    };
    return timezoneMap[timezone] || "US/Eastern";
};

export const todaysDate = new Date().toLocaleDateString("en-CA");
