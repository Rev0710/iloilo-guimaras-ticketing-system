// Destination: client/src/services/bookingService.js
//
// ASSUMPTION: These endpoint paths (/bookings, /bookings/recent, etc.)
// are guesses based on standard REST conventions and your file names
// (bookingController.js, bookingRoutes.js). Please verify them against
// your actual server/routes/bookingRoutes.js and adjust the paths below
// if they don't match.

import api from "./api";

const bookingService = {
  // Create a new booking (motorcycle reservation)
  createBooking: async (bookingData) => {
    const response = await api.post("/bookings", bookingData);
    return response.data;
  },

  // Get all bookings for the logged-in passenger
  getMyBookings: async () => {
    const response = await api.get("/bookings/my-bookings");
    return response.data;
  },

  // Get the most recent bookings, used on the Dashboard (defaults to 2)
  getRecentBookings: async (limit = 2) => {
    const response = await api.get(`/bookings/recent?limit=${limit}`);
    return response.data;
  },

  // Get full details for a single booking
  getBookingById: async (bookingId) => {
    const response = await api.get(`/bookings/${bookingId}`);
    return response.data;
  },

  // Cancel a booking
  cancelBooking: async (bookingId) => {
    const response = await api.patch(`/bookings/${bookingId}/cancel`);
    return response.data;
  },
};

export default bookingService;