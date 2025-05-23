import React from "react";
import octopus_loading from "./images/octo_loading.png";
import { loadingSpinnerSize } from "./components/Constants";

const OctopusSpinner: React.FC<{ size?: number }> = ({ size = loadingSpinnerSize }) => (
    <div
        style={{
            display: "inline-block",
            animation: "spin 1.2s linear infinite",
            width: size,
            height: size,
        }}
    >
        <img
            src={octopus_loading}
            alt="Loading..."
            style={{
                width: "100%",
                height: "100%",
                display: "block",
                borderRadius: "50%",
            }}
        />
        <style>
            {`
            @keyframes spin {
                100% { transform: rotate(360deg); }
            }
        `}
        </style>
    </div>
);

export default OctopusSpinner;
