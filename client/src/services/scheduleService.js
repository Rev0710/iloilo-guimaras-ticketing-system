// Destination: client/src/services/scheduleService.js
//
// ASSUMPTION: These endpoint paths (/routes, /schedules) are guesses
// based on your file names (routeController.js, scheduleController.js,
// routeRoutes.js, scheduleRoutes.js). Please verify against your actual
// server routes and adjust if they don't match.

import api from "./api";

const scheduleService = {
  // Get all active ferry routes (used on the Dashboard + Search page)
  getRoutes: async () => {
    const response = await api.get("/routes");
    return response.data;
  },

  // Get available schedules/trips for a specific route + date
  getSchedulesByRoute: async (routeId, date) => {
    const response = await api.get("/schedules", {
      params: { routeId, date },
    });
    return response.data;
  },

  // Get a single schedule's details (e.g. for vehicle-slot availability)
  getScheduleById: async (scheduleId) => {
    const response = await api.get(`/schedules/${scheduleId}`);
    return response.data;
  },
};

export default scheduleService;