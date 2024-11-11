
import React from "react";
export const isComputerDevice = () => {
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;

    // Check for mobile devices
    return /android|iPad|iPhone|iPod|blackberry|iemobile|opera mini/i.test(userAgent);
};
