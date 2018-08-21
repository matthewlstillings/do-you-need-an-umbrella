export const setExtendedCast = (forecast) => ({
    type: 'EXTENDED_CAST',
    forecast
});

export const clearExtendedCast = (forecast) => ({
    type: 'CLEAR_EC',
    forecast
});