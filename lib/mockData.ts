// lib/mockData.ts
export interface Candle {
  time: string;
  open: number;
  high: number;
  low: number;
  close: number;
}

export const generateMockHistory = (): Candle[] => {
  const data: Candle[] = [];
  let basePrice = 1823.50;
  let currentDate = new Date(2023, 0, 1);

  for (let i = 0; i < 300; i++) {
    const change = (Math.random() - 0.48) * 15;
    const open = basePrice;
    const close = basePrice + change;
    const high = Math.max(open, close) + Math.random() * 8;
    const low = Math.min(open, close) - Math.random() * 8;
    
    const timeString = currentDate.toISOString().split('T')[0];

    data.push({
      time: timeString,
      open: parseFloat(open.toFixed(2)),
      high: parseFloat(high.toFixed(2)),
      low: parseFloat(low.toFixed(2)),
      close: parseFloat(close.toFixed(2))
    });

    basePrice = close;
    currentDate.setDate(currentDate.getDate() + 1);
  }
  return data;
};
