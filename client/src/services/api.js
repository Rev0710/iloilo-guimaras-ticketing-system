// =========================================================
// API SERVICE
// =========================================================

import axios from "axios";

// =========================================================
// API BASE URL
// =========================================================

const API_BASE_URL =
    import.meta.env.VITE_API_BASE_URL ||
    "http://localhost:5000/api";


// =========================================================
// AXIOS INSTANCE
// =========================================================

const api = axios.create({

    baseURL: API_BASE_URL,

    headers: {
        "Content-Type": "application/json"
    }

});


// =========================================================
// REQUEST INTERCEPTOR
// =========================================================
//
// Automatically attach the correct JWT.
//
// Priority:
// 1. Staff token
// 2. Admin token
// 3. General user token
//

api.interceptors.request.use(

    (config) => {

        const staffToken =
            localStorage.getItem(
                "staffToken"
            );

        const adminToken =
            localStorage.getItem(
                "adminToken"
            );

        const userToken =
            localStorage.getItem(
                "token"
            );


        const token =
            staffToken ||
            adminToken ||
            userToken;


        if (token) {

            config.headers.Authorization =
                `Bearer ${token}`;

        }


        return config;

    },

    (error) => {

        return Promise.reject(error);

    }

);


// =========================================================
// RESPONSE INTERCEPTOR
// =========================================================

api.interceptors.response.use(

    (response) => {

        return response;

    },

    (error) => {

        const status =
            error.response?.status;


        // =============================================
        // UNAUTHORIZED
        // =============================================

        if (status === 401) {

            const staffToken =
                localStorage.getItem(
                    "staffToken"
                );

            const adminToken =
                localStorage.getItem(
                    "adminToken"
                );

            const userToken =
                localStorage.getItem(
                    "token"
                );


            // -----------------------------------------
            // STAFF SESSION
            // -----------------------------------------

            if (staffToken) {

                localStorage.removeItem(
                    "staffToken"
                );

                localStorage.removeItem(
                    "staff"
                );

                if (
                    window.location.pathname !==
                    "/staff-login"
                ) {

                    window.location.href =
                        "/staff-login";

                }

            }

            // -----------------------------------------
            // ADMIN SESSION
            // -----------------------------------------

            else if (adminToken) {

                localStorage.removeItem(
                    "adminToken"
                );

                localStorage.removeItem(
                    "adminData"
                );

                if (
                    window.location.pathname !==
                    "/admin-login"
                ) {

                    window.location.href =
                        "/admin-login";

                }

            }

            // -----------------------------------------
            // NORMAL USER SESSION
            // -----------------------------------------

            else if (userToken) {

                localStorage.removeItem(
                    "token"
                );

                localStorage.removeItem(
                    "user"
                );

                if (
                    window.location.pathname !==
                    "/login"
                ) {

                    window.location.href =
                        "/login";

                }

            }

        }


        return Promise.reject(
            error
        );

    }

);


export default api;