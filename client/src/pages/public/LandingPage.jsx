import { useNavigate } from "react-router-dom";
import React from "react";

const LandingPage = () => {
    const navigate = useNavigate();

    return (
        <>
            <style>{`
                * {
                    box-sizing: border-box;
                }

                .landing-page {
                    min-height: 100vh;
                    width: 100%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    padding: 30px;
                    background: #f8f9fa;
                    font-family: Arial, Helvetica, sans-serif;
                }

                .landing-container {
                    width: 100%;
                    max-width: 1000px;
                    max-height: 1000px;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    text-align: center;
                    padding: 60px 30px;
                    background: white;
                    border-radius: 20px;
                    box-shadow: 0 10px 35px rgba(0, 0, 0, 0.08);
                }

                .landing-logo {
                    margin-bottom: 30px;
                    font-size: 42px;
                    font-weight: 500;
                    letter-spacing: -2px;
                }

                .logo-orange {
                    color: #f28c28;
                }

                .logo-green {
                    color: #2e8b57;
                }

                .landing-content {
                    width: 100%;
                    max-width: 500px;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                }

                .landing-content h1 {
                    margin: 0;
                    font-size: clamp(42px, 7vw, 76px);
                    line-height: 1.1;
                    font-weight: 800;
                    color: #222;
                }

                .landing-content h2 {
                    margin: 18px 0 0;
                    font-size: clamp(22px, 3vw, 34px);
                    line-height: 1.3;
                    font-weight: 600;
                    color: #2e8b57;
                }

                .landing-content p {
                    max-width: 600px;
                    margin: 25px auto 35px;
                    font-size: 18px;
                    line-height: 1.7;
                    color: #666;
                }

                .landing-content .primary-button {
                    border: none;
                    padding: 15px 40px;
                    border-radius: 10px;
                    background: #f28c28;
                    color: white;
                    font-size: 17px;
                    font-weight: 700;
                    cursor: pointer;
                    transition: 0.2s ease;
                }

                .landing-content .primary-button:hover {
                    transform: translateY(-2px);
                    opacity: 0.9;
                }

                .landing-content .primary-button:active {
                    transform: translateY(0);
                }

                /* TABLET */
                @media (max-width: 768px) {
                    .landing-page {
                        padding: 20px;
                    }

                    .landing-container {
                        min-height: 600px;
                        padding: 45px 25px;
                        border-radius: 20px;
                    }

                    .landing-logo img {
    width: 80px;
    height: auto;
    display: block;
    object-fit: contain;
}

                    .landing-content p {
                        font-size: 10px;
                    }
                }

                /* MOBILE */
                @media (max-width: 480px) {
                    .landing-page {
                        padding: 15px;
                    }

                    .landing-container {
                        min-height: 580px;
                        padding: 40px 20px;
                    }

                    .landing-logo {
                        font-size: 36px;
                        margin-bottom: 30px;
                    }

                    .landing-content h1 {
                        font-size: 42px;
                    }

                    .landing-content h2 {
                        font-size: 21px;
                    }

                    .landing-content p {
                        font-size: 15px;
                        line-height: 1.6;
                        margin-top: 20px;
                    }

                    .landing-content .primary-button {
                        width: 100%;
                        max-width: 280px;
                    }
                }
            `}</style>

            <main className="landing-page">

                <div className="landing-container">

                    <div className="landing-logo">
    <img
        src="https://scontent.fcgy2-2.fna.fbcdn.net/v/t1.15752-9/775468126_1793367781697550_3767041847597317415_n.png?stp=dst-png&cstp=mx532x469&ctp=s532x469&_nc_cat=103&ccb=1-7&_nc_sid=9f807c&_nc_eui2=AeEKTnmoEB20Fs5gE6WYWTxBd_QaoqEL1HV39BqioQvUdc9ZjhsVKyPy19OQYcSyO20Y_14PqMHIf2M01vrRKE4U&_nc_ohc=fK0ygs4SALUQ7kNvwEhUgQl&_nc_oc=Adr97yUKqKQuY-Rb-Lpj__Sjoqm7YY75sVczdULR8n8AbUyhy3oVy9DJ-YO_YUPfnTE&_nc_zt=23&_nc_ht=scontent.fcgy2-2.fna&_nc_ss=7a2a8&oh=03_Q7cD6AFmBhmkMTNembwVy95XQOYfaHONnpCT7udBE1IJnmNvHg&oe=6AB20956"
        alt="Go"
    />
</div>

                    <div className="landing-content">

                        <h1>
                            GuimarasGo
                        </h1>

                        <h2>
                            Your Gateway to Island Adventures
                        </h2>

                        <p>
                            Book your ferry trip easily and
                            enjoy a convenient journey to
                            Guimaras.
                        </p>

                        <button
                            type="button"
                            className="primary-button"
                            onClick={() => navigate("/login")}
                        >
                            Get Started
                        </button>

                    </div>

                </div>

            </main>
        </>
    );
};

export default LandingPage;