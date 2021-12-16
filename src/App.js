import { NavLink } from "react-router-dom";
import "./styles/App.css";

function App(props) {
  return (
    <div className="nav-bar">
      <nav>
        <NavLink
          to="/home"
          className={({ isActive }) => (isActive ? "active" : "inactive")}
        >
          Home
        </NavLink>
        <NavLink
          to="/products"
          className={({ isActive }) => (isActive ? "active" : "inactive")}
        >
          Products
        </NavLink>
        <NavLink
          to="/cart"
          className={`notification ${({ isActive }) =>
            isActive ? "active" : "inactive"}`}
        >
          <span>Cart</span>
          <span className="badge">{props.quantityDisplay}</span>
        </NavLink>
      </nav>
    </div>
  );
}

export default App;