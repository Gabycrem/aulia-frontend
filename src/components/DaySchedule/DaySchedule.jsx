import "./DaySchedule.css";

const DEFAULT_HOURS = [
  "08:00",
  "09:00",
  "10:00",
  "11:00",
  "12:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
];

function DaySchedule({
  selectedDate,
  items = [],
  hours = DEFAULT_HOURS,
  onSelectItem,
}) {
  const itemsByTime = items.reduce((acc, item) => {
    if (!acc[item.time]) {
      acc[item.time] = [];
    }

    acc[item.time].push(item);

    return acc;
  }, {});

  return (
    <aside className="day-schedule">
      <header className="day-schedule-header">
        <h2>Día seleccionado</h2>
        <p>{selectedDate}</p>
      </header>

      <ul className="day-schedule-list">
        {hours.map((hour) => {
          const hourItems = itemsByTime[hour] || [];

          return (
            <li key={hour} className="day-schedule-slot">
              <strong>{hour}</strong>

              <div className="day-schedule-slot-content">
                {hourItems.length === 0 ? (
                  <span className="day-schedule-empty">Libre</span>
                ) : (
                  hourItems.map((item) => (
                    <button
                      key={`${item.source}-${item.sourceId || item.id}`}
                      type="button"
                      className="day-schedule-event"
                      onClick={() => onSelectItem?.(item)}
                    >
                      <span>{item.title}</span>
                      {item.description && <small>{item.description}</small>}
                    </button>
                  ))
                )}
              </div>
            </li>
          );
        })}
      </ul>
    </aside>
  );
}

export default DaySchedule;