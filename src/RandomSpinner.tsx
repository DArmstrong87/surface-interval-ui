import React, { useMemo } from "react";
import octopus from "./images/octopus.png";
import crab from "./images/crab.png";
import starfish from "./images/starfish.png";
import { loadingSpinnerSize } from "./components/Constants";

function RandomSpinner() {
    const spinnerImgList = [crab, octopus, starfish];

    const spinner = useMemo(() => {
        const randomInt = Math.floor(Math.random() * spinnerImgList.length);
        console.log(randomInt);
        return spinnerImgList[randomInt];
    }, []);

    return (
        <>
            <div
                style={{
                    display: "inline-block",
                    animation: "spin 1.2s linear infinite",
                    width: loadingSpinnerSize,
                    height: loadingSpinnerSize,
                }}
            >
                <img
                    src={spinner}
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
        </>
    );
}

export default RandomSpinner;
