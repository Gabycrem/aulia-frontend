import DashboardLayout from "../../../layouts/DashboardLayout/DashboardLayout";
import Card from "../../../components/Card/Card";
import PageToolbar from "../../../components/PageToolbar/PageToolbar";
import CalendarAgenda from "../../../components/CalendarAgenda/CalendarAgenda";
import useCalendarAgenda from "../../../hooks/useCalendarAgenda";
import { agendaMock } from "../../../data/agendaMock";
import "./GabAgenda.css";

function GabAgenda() {
  const {
    currentMonth,
    selectedDate,
    monthItems,
    selectedDayItems,
    handleSelectDate,
    handlePreviousMonth,
    handleNextMonth,
    handleSelectItem,
  } = useCalendarAgenda(agendaMock);

  return (
    <DashboardLayout role="gab">
      <section className="gab-agenda">
        <PageToolbar title="Agenda" />

        <Card className="gab-agenda-card">
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

export default GabAgenda;