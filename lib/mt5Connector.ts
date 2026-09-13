import axios from "axios";

export async function syncMT5Account(data: any) {
  try {
    const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/mt5-sync`, data);
    return res.data;
  } catch (err) {
    console.error("MT5 sync failed:", err);
    return null;
  }
}
