import "./assets/css/App.css";
// components
import Landing from "./components/Landing";
// logo
import Logo from "./assets/img/bitcoin.png";
function App() {
  return (
    <section className="app-container">
      <div className="logoContainer">
        <img src={Logo} alt="bitcoin" />
      </div>
      <Landing />
    </section>
  );
}

export default App;
