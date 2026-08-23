import { useNavigate } from "react-router-dom";

const Dashboard = () => {
    const navigate = useNavigate();

    return (
        <main className="dashboard-page">

            <div className="dashboard-container">

                {/* HEADER */}
                <header className="dashboard-header">

                    <div className="dashboard-logo">
                        <img
                            src="https://scontent.fcgy2-2.fna.fbcdn.net/v/t1.15752-9/775468126_1793367781697550_3767041847597317415_n.png?stp=dst-png&cstp=mx532x469&ctp=s532x469&_nc_cat=103&ccb=1-7&_nc_sid=9f807c&_nc_eui2=AeEKTnmoEB20Fs5gE6WYWTxBd_QaoqEL1HV39BqioQvUdc9ZjhsVKyPy19OQYcSyO20Y_14PqMHIf2M01vrRKE4U&_nc_ohc=fK0ygs4SALUQ7kNvwEhUgQl&_nc_oc=Adr97yUKqKQuY-Rb-Lpj__Sjoqm7YY75sVczdULR8n8AbUyhy3oVy9DJ-YO_YUPfnTE&_nc_zt=23&_nc_ht=scontent.fcgy2-2.fna&_nc_ss=7a2a8&oh=03_Q7cD6AFmBhmkMTNembwVy95XQOYfaHONnpCT7udBE1IJnmNvHg&oe=6AB20956"
                            alt="GuimarasGo Logo"
                        />
                    </div>

                    <button
                        type="button"
                        className="menu-button"
                        onClick={() =>
                            alert("Menu will be added soon.")
                        }
                    >
                        ☰
                    </button>

                </header>

                {/* WELCOME SECTION */}
                <section className="welcome-section">

                    <h1>
                        Welcome to GuimarasGo
                    </h1>

                    <p>
                        Your Gateway to Island Adventures
                    </p>

                    <button
                    type="button"
                className="book-button"
                onClick={() => navigate("/book-trip")}
                    >
                Book a Trip
                </button>

                </section>

                {/* QUICK ACTIONS */}
                <section className="quick-actions">

                    <button
                        type="button"
                        className="feature-card"
                        onClick={() =>
                            navigate("/bookings")
                        }
                    >
                        <span className="feature-icon">
                            🎫
                        </span>

                        <span className="feature-title">
                            My Bookings
                        </span>

                        <span className="feature-description">
                            View your reservations
                        </span>
                    </button>

                    <button
                        type="button"
                        className="feature-card"
                        onClick={() =>
                            navigate("/trips")
                        }
                    >
                        <span className="feature-icon">
                            ⛴️
                        </span>

                        <span className="feature-title">
                            Available Trips
                        </span>

                        <span className="feature-description">
                            Find your next trip
                        </span>
                    </button>

                </section>

                {/* RECENT BOOKINGS */}
                <section className="recent-section">

                    <div className="section-heading">

                        <h2>
                            Recent Bookings
                        </h2>

                        <button
                            type="button"
                            className="view-all-button"
                            onClick={() =>
                                navigate("/bookings")
                            }
                        >
                            View All
                        </button>

                    </div>

                    <div className="empty-bookings">

                        <div className="empty-icon">
                            🎫
                        </div>

                        <h3>
                            No recent bookings
                        </h3>

                        <p>
                            Your recent ferry bookings
                            will appear here.
                        </p>

                    </div>

                </section>

                {/* BOTTOM NAVIGATION */}
                <nav className="bottom-navigation">

                    <button
                        type="button"
                        className="nav-item active"
                        onClick={() =>
                            navigate("/dashboard")
                        }
                    >
                        <span>⌂</span>
                        <small>Home</small>
                    </button>

                    <button
                        type="button"
                        className="nav-item"
                        onClick={() =>
                            navigate("/trips")
                        }
                    >
                        <span>⌕</span>
                        <small>Search</small>
                    </button>

                    <button
                        type="button"
                        className="nav-item"
                        onClick={() =>
                            navigate("/bookings")
                        }
                    >
                        <span>🎫</span>
                        <small>Tickets</small>
                    </button>

                    <button
                        type="button"
                        className="nav-item"
                        onClick={() =>
                            navigate("/profile")
                        }
                    >
                        <span>◯</span>
                        <small>Profile</small>
                    </button>

                </nav>

            </div>

            {/* DASHBOARD CSS */}
            <style>{`

                * {
                    box-sizing: border-box;
                }

                .dashboard-page {
                    min-height: 100vh;
                    background: #f7f8fa;
                    font-family: Arial, Helvetica, sans-serif;
                    padding-bottom: 90px;
                }

                .dashboard-container {
                    width: 100%;
                    max-width: 1100px;
                    margin: 0 auto;
                    min-height: 100vh;
                    background: #ffffff;
                }

                /* HEADER */

                .dashboard-header {
                    height: 80px;
                    padding: 0 30px;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    border-bottom: 1px solid #eeeeee;
                }

                .dashboard-logo img {
                    width: 130px;
                    height: auto;
                    display: block;
                }

                .menu-button {
                    width: 45px;
                    height: 45px;
                    border: none;
                    background: transparent;
                    font-size: 28px;
                    cursor: pointer;
                }

                /* WELCOME */

                .welcome-section {
                    text-align: center;
                    padding: 65px 25px 45px;
                }

                .welcome-section h1 {
                    margin: 0;
                    font-size: clamp(32px, 5vw, 52px);
                    color: #222222;
                    font-weight: 800;
                }

                .welcome-section p {
                    margin: 15px 0 30px;
                    color: #666666;
                    font-size: 18px;
                }

                .book-button {
                    border: none;
                    padding: 16px 45px;
                    border-radius: 10px;
                    background: #f28c28;
                    color: white;
                    font-size: 17px;
                    font-weight: 700;
                    cursor: pointer;
                    transition: 0.2s ease;
                }

                .book-button:hover {
                    transform: translateY(-2px);
                }

                /* QUICK ACTIONS */

                .quick-actions {
                    display: grid;
                    grid-template-columns: repeat(2, 1fr);
                    gap: 20px;
                    padding: 0 30px 45px;
                }

                .feature-card {
                    min-height: 160px;
                    padding: 25px;
                    border: 1px solid #eeeeee;
                    border-radius: 18px;
                    background: white;
                    text-align: left;
                    cursor: pointer;
                    display: flex;
                    flex-direction: column;
                    align-items: flex-start;
                    justify-content: center;
                    transition: 0.2s ease;
                    box-shadow: 0 5px 20px rgba(0, 0, 0, 0.05);
                }

                .feature-card:hover {
                    transform: translateY(-3px);
                    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.09);
                }

                .feature-icon {
                    font-size: 28px;
                    margin-bottom: 10px;
                }

                .feature-title {
                    font-size: 20px;
                    font-weight: 700;
                    color: #222222;
                }

                .feature-description {
                    margin-top: 5px;
                    color: #777777;
                    font-size: 14px;
                }

                /* RECENT BOOKINGS */

                .recent-section {
                    padding: 0 30px 100px;
                }

                .section-heading {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    margin-bottom: 20px;
                }

                .section-heading h2 {
                    margin: 0;
                    font-size: 24px;
                    color: #222222;
                }

                .view-all-button {
                    border: none;
                    background: transparent;
                    color: #f28c28;
                    font-weight: 700;
                    cursor: pointer;
                }

                .empty-bookings {
                    padding: 45px 20px;
                    border: 1px dashed #dddddd;
                    border-radius: 16px;
                    text-align: center;
                }

                .empty-icon {
                    font-size: 35px;
                    margin-bottom: 10px;
                }

                .empty-bookings h3 {
                    margin: 5px 0;
                    color: #333333;
                }

                .empty-bookings p {
                    margin: 5px 0;
                    color: #888888;
                    font-size: 14px;
                }

                /* BOTTOM NAVIGATION */

                .bottom-navigation {
                    position: fixed;
                    bottom: 0;
                    left: 50%;
                    transform: translateX(-50%);
                    width: 100%;
                    max-width: 1100px;
                    height: 75px;
                    display: grid;
                    grid-template-columns: repeat(4, 1fr);
                    background: white;
                    border-top: 1px solid #eeeeee;
                    z-index: 100;
                }

                .nav-item {
                    border: none;
                    background: transparent;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    gap: 4px;
                    color: #888888;
                    cursor: pointer;
                }

                .nav-item span {
                    font-size: 23px;
                }

                .nav-item small {
                    font-size: 12px;
                }

                .nav-item.active {
                    color: #f28c28;
                    font-weight: 700;
                }

                /* MOBILE */

                @media (max-width: 600px) {

                    .dashboard-header {
                        padding: 0 20px;
                    }

                    .welcome-section {
                        padding-top: 50px;
                    }

                    .quick-actions {
                        grid-template-columns: 1fr;
                        padding-left: 20px;
                        padding-right: 20px;
                    }

                    .recent-section {
                        padding-left: 20px;
                        padding-right: 20px;
                    }

                    .dashboard-logo img {
                        width: 110px;
                    }

                }

            `}</style>

        </main>
    );
};

export default Dashboard;