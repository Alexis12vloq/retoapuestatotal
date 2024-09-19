import axios from 'axios';

const API_URL_CUSTOMER = 'http://localhost:3002'; // URL del backend
const API_URL_FLIGHTS = 'http://localhost:3002'; // URL del backend
const API_URL_PAYMENT = 'http://localhost:3003'; // URL del backend


export const getFlights = async() => {
    const response = await axios.get(`${API_URL_FLIGHTS}/flights`);
    return response.data;
};

export const getFlightDetails = async(flightId) => {
    const response = await axios.get(`${API_URL_FLIGHTS}/flights/${flightId}`);
    return response.data;
};

export const bookFlight = async(flightId, passengerInfo) => {
    const response = await axios.post(`${API_URL_FLIGHTS}/reservations`, {
        flightId,
        ...passengerInfo,
    });
    return response.data;
};

export const processPayment = async(paymentDetails) => {
    const response = await axios.post(`${API_URL_PAYMENT}/payments`, {
        ...paymentDetails,
    });
    return response.data;
};

export const getPaymentDetails = async(paymentId) => {
    const response = await axios.get(`${API_URL_PAYMENT}/payments/${paymentId}`);
    return response.data;
};

export const getReservationDetails = async(reservationId) => {
    const response = await axios.get(`${API_URL_FLIGHTS}/reservations/${reservationId}`);
    return response.data;
};