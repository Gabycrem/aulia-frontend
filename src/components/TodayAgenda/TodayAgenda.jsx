import "./TodayAgenda.css";

function TodayAgenda({
  title = "Agenda de hoy",
  items = [],
  emptyMessage = "No hay actividades programadas para hoy",
  onSelectItem,
}) {
  return (
    <div className="today-agenda">
      <h2>{title}</h2>

      {items.length === 0 ? (
        <p className="today-agenda-empty">{emptyMessage}</p>
      ) : (
        <ul className="today-agenda-list">
          {items.map((item) => (
            <li key={`${item.source}-${item.sourceId || item.id}`}>
              <button
                type="button"
                className="today-agenda-item"
                onClick={() => onSelectItem?.(item)}
              >
                <strong>{item.time}</strong>

                <span>
                  {item.title}
                  {item.description ? ` - ${item.description}` : ""}
                </span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default TodayAgenda;