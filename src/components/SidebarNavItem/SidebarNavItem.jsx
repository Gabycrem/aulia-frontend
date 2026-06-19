import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./SidebarNavItem.css";

function SidebarNavItem({ item }) {
  const navigate = useNavigate();
  const location = useLocation();

  const hasChildren = Array.isArray(item.children) && item.children.length > 0;
  const groupIsActive = hasChildren
    ? item.children.some((child) => location.pathname === child.path)
    : false;

  const [isOpen, setIsOpen] = useState(groupIsActive);

  function isActivePath(path) {
    return location.pathname === path;
  }

  function handleClick() {
    if (item.disabled) {
      return;
    }

    if (hasChildren) {
      setIsOpen((currentIsOpen) => !currentIsOpen);
      return;
    }

    navigate(item.path);
  }

  function handleChildClick(child) {
    if (child.disabled) {
      return;
    }

    navigate(child.path);
  }

  return (
    <div className="sidebar-nav-group">
      <button
        type="button"
        className={`sidebar-nav-item ${
          isActivePath(item.path) ? "active" : ""
        } ${groupIsActive ? "active" : ""} ${
          item.disabled ? "sidebar-nav-item-disabled" : ""
        }`}
        onClick={handleClick}
        disabled={item.disabled}
        title={item.disabledReason || undefined}
      >
        <span>{item.label}</span>

        {hasChildren && (
          <span className="sidebar-nav-chevron">
            {isOpen ? "▲" : "▼"}
          </span>
        )}
      </button>

      {hasChildren && isOpen && (
        <div className="sidebar-nav-children">
          {item.children.map((child) => (
            <button
              key={child.path}
              type="button"
              className={`sidebar-nav-child ${
                isActivePath(child.path) ? "active" : ""
              } ${child.disabled ? "sidebar-nav-child-disabled" : ""}`}
              onClick={() => handleChildClick(child)}
              disabled={child.disabled}
              title={child.disabledReason || undefined}
            >
              {child.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default SidebarNavItem;