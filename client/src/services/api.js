// =========================================================
// API SERVICE
// =========================================================

import axios from "axios";

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
            ) ||
            sessionStorage.getItem(
                "staffToken"
            );

        const adminToken =
            localStorage.getItem(
                "adminToken"
            ) ||
            sessionStorage.getItem(
                "adminToken"
            );

        const userToken =
            localStorage.getItem(
                "token"
            ) ||
            sessionStorage.getItem(
                "token"
            );


        // Keep each role's token isolated from the other roles.
        // This prevents an old staff token from being sent to
        // an admin endpoint (and vice versa).
        const pathname =
            window.location.pathname;

        let token;

        if (pathname.startsWith("/staff")) {
            token = staffToken;
        } else if (pathname.startsWith("/admin")) {
            token = adminToken;
        } else {
            token =
                staffToken ||
                adminToken ||
                userToken;
        }


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
                ) ||
                sessionStorage.getItem(
                    "staffToken"
                );

            const adminToken =
                localStorage.getItem(
                    "adminToken"
                ) ||
                sessionStorage.getItem(
                    "adminToken"
                );

            const userToken =
                localStorage.getItem(
                    "token"
                ) ||
                sessionStorage.getItem(
                    "token"
                );

            const pathname =
                window.location.pathname;


            // -----------------------------------------
            // STAFF SESSION
            // -----------------------------------------

            if (
                pathname.startsWith("/staff") &&
                staffToken
            ) {

                localStorage.removeItem(
                    "staffToken"
                );

                sessionStorage.removeItem(
                    "staffToken"
                );

                localStorage.removeItem(
                    "staff"
                );

                if (
                    pathname !==
                    "/staff/login"
                ) {

                    window.location.href =
                        "/staff/login";

                }

            }

            // -----------------------------------------
            // ADMIN SESSION
            // -----------------------------------------

            else if (
                pathname.startsWith("/admin") &&
                adminToken
            ) {

                localStorage.removeItem(
                    "adminToken"
                );

                localStorage.removeItem(
                    "adminData"
                );

                sessionStorage.removeItem(
                    "adminToken"
                );

                sessionStorage.removeItem(
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

                sessionStorage.removeItem(
                    "token"
                );

                sessionStorage.removeItem(
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