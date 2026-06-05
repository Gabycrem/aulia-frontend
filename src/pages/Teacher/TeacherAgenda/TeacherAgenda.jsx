import DashboardLayout from "../../../layouts/DashboardLayout/DashboardLayout";
import Card from "../../../components/Card/Card";
import PageToolbar from "../../../components/PageToolbar/PageToolbar";
import CalendarAgenda from "../../../components/CalendarAgenda/CalendarAgenda";
import useCalendarAgenda from "../../../hooks/useCalendarAgenda";
import "./TeacherAgenda.css";

function TeacherAgenda() {
  const {
    currentMonth,
    selectedDate,
    monthItems,
    selectedDayItems,
    handleSelectDate,
    handlePreviousMonth,
    handleNextMonth,
    handleSelectItem,
  } = useCalendarAgenda([], new Date());

  return (
    <DashboardLayout role="teacher">
      <section className="teacher-agenda">
        <PageToolbar title="Agenda" />

        <Card className="teacher-agenda-card">
          <CalendarAgenda
            currentMonth={currentMonth}
            selectedDate={selectedDate}
            items={monthItems}
            selectedDayItems={selectedDayItems}
            onSelectDate={handleSelectDate}
            onPreviousMonth={handlePreviousMonth}
            onNextMonth={handleNextMonth}
            onSelectItem={handleSelectItem}
          />
        </Card>
      </section>
    </DashboardLayout>
  );
}

export default TeacherAgenda;