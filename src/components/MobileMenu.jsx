import { FaBars } from "react-icons/fa";

function MobileMenu({ onClick }) {
  return (
    <button className="mobile-menu-btn" onClick={onClick}>
      <FaBars />
    </button>
  );
}

export default MobileMenu;