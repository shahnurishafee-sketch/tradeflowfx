// components/utils/pnlUtils.ts
export function groupTradesByDay(trades) {
  const grouped = {};
  trades.forEach(t => {
    const date = new Date(t.closeTime);
    const key = date.toISOString().split("T")[0];
    if (!grouped[key]) grouped[key] = [];
    grouped[key].push(t);
  });
  return grouped;
}

export function groupTradesByWeek(trades) {
  const grouped = {};
  trades.forEach(t => {
    const date = new Date(t.closeTime);
    const week = getWeekNumber(date);
    if (!grouped[week]) grouped[week] = [];
    grouped[week].push(t);
  });
  return grouped;
}

function getWeekNumber(date) {
  const firstDay = new Date(date.getFullYear(), 0, 1);
  const days = Math.floor((date - firstDay) / (24 * 60 * 60 * 1000));
  return Math.ceil((days + firstDay.getDay() + 1) / 7);
}
