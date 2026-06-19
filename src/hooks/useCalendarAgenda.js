import { useMemo, useState } from "react";

function toDateKey(date) {
  return date.toISOString().slice(0, 10);
}

function isSameMonth(date, currentMonth) {
  return (
    date.getFullYear() === currentMonth.getFullYear() &&
    date.getMonth() === currentMonth.getMonth()
  );
}

function useCalendarAgenda(items = [], initialDate = new Date("2026-05-31T12:00:00")) {
  const [selectedDate, setSelectedDate] = useState(initialDate);
  const [currentMonth, setCurrentMonth] = useState(
    new Date(initialDate.getFullYear(), initialDate.getMonth(), 1)
  );

  const monthItems = useMemo(() => {
    return items.filter((item) => {
      if (!item.date) {
        return false;
      }

      return isSameMonth(new Date(`${item.date}T12:00:00`), currentMonth);
    });
  }, [items, currentMonth]);

  const selectedDateKey = toDateKey(selectedDate);

  const selectedDayItems = useMemo(() => {
    return items.filter((item) => item.date === selectedDateKey);
  }, [items, selectedDateKey]);

  function handleSelectDate(date) {
    setSelectedDate(date);

    if (!isSameMonth(date, currentMonth)) {
      setCurrentMonth(new Date(date.getFullYear(), date.getMonth(), 1));
    }
  }

  function handlePreviousMonth() {
    setCurrentMonth((current) => {
      const previousMonth = new Date(
        current.getFullYear(),
        current.getMonth() - 1,
        1
      );

      setSelectedDate(previousMonth);

      return previousMonth;
    });
  }

  function handleNextMonth() {
    setCurrentMonth((current) => {
      const nextMonth = new Date(
        current.getFullYear(),
        current.getMonth() + 1,
        1
      );

      setSelectedDate(nextMonth);

      return nextMonth;
    });
  }

  function handleSelectItem() {
    return;
  }

  return {
    currentMonth,
    selectedDate,
    monthItems,
    selectedDayItems,
    handleSelectDate,
    handlePreviousMonth,
    handleNextMonth,
    handleSelectItem,
  };
}

export default useCalendarAgenda;