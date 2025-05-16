import SI_splash from "./images/SI_splash.png";
import "./App.css";

function Home() {
    return (
        <div className="App">
            <header className="App-header" style={{ backgroundColor: "white" }}>
                <img src={SI_splash} alt="logo" style={{ maxWidth: "fit-content" }} />
            </header>
        </div>
    );
}

export default Home;
