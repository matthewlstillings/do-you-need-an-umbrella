//Current Weather Actions

export const fetchCity = (city = '') => ({
    type: 'CURRENT_CITY',
    city
});

export const fetchState = (state = '') => ({
    type: 'CURRENT_STATE',
    state
});

export const fetchTemp = (temperature = '') => ({
    type: 'CURRENT_TEMP',
    temperature
});

export const fetchCondition = (condition = '') => ({
    type: 'CURRENT_CONDITION',
    condition
});

export const fetchSun = (sunPosition) => ({
    type: 'CURRENT_SUN',
    sunPosition
});

export const fetchFutureCondition = (condition) => ({
    type: 'FUTURE_CONDITION',
    condition
});