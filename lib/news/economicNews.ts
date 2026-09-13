import axios from "axios";

export async function fetchEconomicNews() {
  const res = await axios.get("https://nfs.faireconomy.media/ff_calendar_thisweek.json");
  return res.data;
}
