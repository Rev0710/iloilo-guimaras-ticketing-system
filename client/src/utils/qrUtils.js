// =========================================================
// QR CODE UTILITIES
// =========================================================
//
// This file contains helper functions for creating and
// reading the data stored inside a passenger ticket QR code.
//
// The QR code should NOT contain sensitive information such
// as passwords or payment credentials.
//
// For the ferry ticket, we use the bookingReference as the
// main identifier. The Staff Scanner can then use this
// reference to retrieve the complete booking from MongoDB.
//


// =========================================================
// CREATE QR DATA
// =========================================================

export const createQRData = (booking) => {

    if (!booking) {
        throw new Error(
            "Booking information is required."
        );
    }

    if (!booking.bookingReference) {
        throw new Error(
            "Booking reference is required."
        );
    }

    return JSON.stringify({

        type: "FERRY_TICKET",

        bookingReference:
            booking.bookingReference

    });
};


// =========================================================
// PARSE QR DATA
// =========================================================

export const parseQRData = (qrText) => {

    if (!qrText) {
        return null;
    }

    try {

        const data =
            JSON.parse(qrText);


        // Make sure this is our ferry ticket QR

        if (
            data.type !==
            "FERRY_TICKET"
        ) {
            return null;
        }


        // Make sure booking reference exists

        if (
            !data.bookingReference
        ) {
            return null;
        }


        return {

            type:
                data.type,

            bookingReference:
                data.bookingReference

        };

    } catch (error) {

        console.error(
            "QR parsing error:",
            error
        );

        return null;
    }
};


// =========================================================
// GET BOOKING REFERENCE FROM QR
// =========================================================

export const getBookingReferenceFromQR = (
    qrText
) => {

    const data =
        parseQRData(qrText);


    if (!data) {
        return null;
    }


    return data.bookingReference;
};


// =========================================================
// CHECK IF QR IS A VALID FERRY TICKET
// =========================================================

export const isValidQR = (qrText) => {

    const data =
        parseQRData(qrText);


    return (
        data !== null &&
        !!data.bookingReference
    );
};