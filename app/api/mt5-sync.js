export default async function handler(req, res) {
  const { account_id, broker, balance, equity, trades } = req.body;
  await supabase.from("accounts").upsert({ account_id, broker, balance, equity });
  await supabase.from("trades").upsert(trades);
  res.status(200).json({ success: true });
}
