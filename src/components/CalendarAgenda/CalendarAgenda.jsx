import DaySchedule from "../DaySchedule/DaySchedule";
import "./CalendarAgenda.css";

const WEEK_DAYS = ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"];

function toDateKey(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

function getMonthLabel(date) {
  return date.toLocaleDateString("es-AR", {
    month: "long",
    year: "numeric",
  });
}

function getSelectedDateLabel(date) {
  return date.toLocaleDateString("es-AR", {
    weekday: "long",
    day: "2-digit",
    month: "2-digit",
  });
}

function getCalendarDays(currentMonth) {
  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();

  const firstDayOfMonth = new Date(year, month, 1);
  const lastDayOfMonth = new Date(year, month + 1, 0);

  const firstWeekDay = (firstDayOfMonth.getDay() + 6) % 7;
  const totalDays = lastDayOfMonth.getDate();

  const days = [];

  for (let i = 0; i < firstWeekDay; i += 1) {
    days.push(null);
  }

  for (let day = 1; day <= totalDays; day += 1) {
    days.push(new Date(year, month, day));
  }

  return days;
}

function CalendarAgenda({
  currentMonth,
  selectedDate,
  items = [],
  selectedDayItems = [],
  onSelectDate,
  onPreviousMonth,
  onNextMonth,
  onSelectItem,
}) {
  const monthDays = getCalendarDays(currentMonth);
  const selectedDateKey = toDateKey(selectedDate);

  const eventsByDate = items.reduce((acc, item) => {
    if (!acc[item.date]) {
      acc[item.date] = [];
    }

    acc[item.date].push(item);

    return acc;
  }, {});


  return (
    <div className="calendar-agenda">
      <div className="calendar-agenda-main">
        <div className="calendar-agenda-toolbar">
          <h2>{getMonthLabel(currentMonth)}</h2>

          <div className="calendar-agenda-controls">
            <button type="button" onClick={onPreviousMonth}>
              {"<"}
            </button>
            <button type="button" onClick={onNextMonth}>
              {">"}
            </button>
          </div>
        </div>

        <div className="calendar-agenda-weekdays">
          {WEEK_DAYS.map((day) => (
            <span key={day}>{day}</span>
          ))}
        </div>

        <div className="calendar-agenda-grid">
          {monthDays.map((date, index) => {
            if (!date) {
              return (
                <span
                  key={`empty-${index}`}
                  className="calendar-agenda-empty-day"
                />
              );
            }

            const dateKey = toDateKey(date);
            const isSelected = dateKey === selectedDateKey;
            const hasEvents = Boolean(eventsByDate[dateKey]?.length);

            return (
              <button
                key={dateKey}
                type="button"
                className={`calendar-agenda-day ${
                  isSelected ? "calendar-agenda-day-selected" : ""
                }`}
                onClick={() => onSelectDate(date)}
              >
                <span>{date.getDate()}</span>
                {hasEvents && <small>{eventsByDate[dateKey].length}</small>}
              </button>
            );
          })}
        </div>
      </div>

      <DaySchedule
        selectedDate={getSelectedDateLabel(selectedDate)}
        items={selectedDayItems}
        onSelectItem={onSelectItem}
      />
    </div>
  );
}

export default CalendarAgenda;