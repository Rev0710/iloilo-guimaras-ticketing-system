import { useNavigate } from "react-router-dom";

const LandingPage = () => {
    const navigate = useNavigate();

    return (
        <main className="landing-page">
            <div className="landing-container">

                <div className="landing-logo">
                    <span className="logo-orange">GO</span>
                    <span className="logo-green">.</span>
                </div>

                <p className="landing-welcome">
                    Welcome to
                </p>

                <h1 className="landing-title">
                    GuimarasGo
                </h1>

                <p className="landing-description">
                    Your simple and convenient way to reserve
                    your ferry trip between Iloilo and Guimaras.
                </p>

                <div className="landing-buttons">

                    <button
                        className="primary-button"
                        onClick={() => navigate("/login")}
                    >
                        Sign In
                    </button>

                    <button
                        className="secondary-button"
                        onClick={() => navigate("/register")}
                    >
                        Create an Account
                    </button>

                </div>

                <p className="landing-note">
                    Ferry vehicle reservation made easier.
                </p>

            </div>
        </main>
    );
};

export default LandingPage;