import "./PageToolbar.css";

function PageToolbar({ title, children, className = "" }) {
  return (
    <div className={`page-toolbar ${className}`}>
      <h2>{title}</h2>
      {children && <div className="page-toolbar-actions">{children}</div>}
    </div>
  );
}

export default PageToolbar;
