import DashboardLayout from "../../../layouts/DashboardLayout/DashboardLayout";
import Card from "../../../components/Card/Card";
import PageToolbar from "../../../components/PageToolbar/PageToolbar";
import CalendarAgenda from "../../../components/CalendarAgenda/CalendarAgenda";
import useGabAgenda from "../../../hooks/Gabinete/useGabAgenda";
import "./GabAgenda.css";

function GabAgenda() {
  const {
    currentMonth,
    selectedDate,
    monthItems,
    selectedDayItems,
    loading,
    error,
    handleSelectDate,
    handlePreviousMonth,
    handleNextMonth,
    handleSelectItem,
  } = useGabAgenda();

  return (
    <DashboardLayout role="gab">
      <section className="gab-agenda">
        <PageToolbar title="Agenda" />

        {loading && <p>Cargando agenda...</p>}

        {error && <p className="gab-agenda-error">{error}</p>}

        {!loading && (
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
        )}
      </section>
    </DashboardLayout>
  );
}

export default GabAgenda;