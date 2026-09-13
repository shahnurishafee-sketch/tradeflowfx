"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function Journal() {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [pairFilter, setPairFilter] = useState("");
  const [dateFilter, setDateFilter] = useState("");
  const [tagFilter, setTagFilter] = useState("");

  const [newEntry, setNewEntry] = useState({
    pair: "",
    date: "",
    note: "",
    tags: "",
  });

  const [editingId, setEditingId] = useState(null);

  // Fetch journal entries from Supabase
  const loadEntries = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("journal_entries")
      .select("*")
      .order("date", { ascending: false });

    if (!error) setEntries(data);
    setLoading(false);
  };

  useEffect(() => {
    loadEntries();
  }, []);

  // Add new entry
  const handleAdd = async () => {
    if (!newEntry.pair || !newEntry.date || !newEntry.note) return;

    const tagsArray = newEntry.tags
      ? newEntry.tags.split(",").map((t) => t.trim())
      : [];

    const { error } = await supabase.from("journal_entries").insert([
      {
        pair: newEntry.pair,
        date: newEntry.date,
        note: newEntry.note,
        tags: tagsArray,
      },
    ]);

    if (!error) {
      setNewEntry({ pair: "", date: "", note: "", tags: "" });
      loadEntries();
    }
  };

  // Edit entry
  const handleEdit = (entry) => {
    setEditingId(entry.id);
    setNewEntry({
      pair: entry.pair,
      date: entry.date,
      note: entry.note,
      tags: entry.tags.join(", "),
    });
  };

  // Save edited entry
  const handleSave = async () => {
    const tagsArray = newEntry.tags
      ? newEntry.tags.split(",").map((t) => t.trim())
      : [];

    const { error } = await supabase
      .from("journal_entries")
      .update({
        pair: newEntry.pair,
        date: newEntry.date,
        note: newEntry.note,
        tags: tagsArray,
      })
      .eq("id", editingId);

    if (!error) {
      setEditingId(null);
      setNewEntry({ pair: "", date: "", note: "", tags: "" });
      loadEntries();
    }
  };

  // Delete entry
  const handleDelete = async (id) => {
    await supabase.from("journal_entries").delete().eq("id", id);
    loadEntries();
  };

  // Filters
  const filteredEntries = entries.filter((e) => {
    const matchesSearch = e.note.toLowerCase().includes(search.toLowerCase());
    const matchesPair = pairFilter ? e.pair === pairFilter : true;
    const matchesDate = dateFilter ? e.date === dateFilter : true;
    const matchesTag = tagFilter
      ? e.tags.some((t) => t.toLowerCase().includes(tagFilter.toLowerCase()))
      : true;

    return matchesSearch && matchesPair && matchesDate && matchesTag;
  });

  return (
    <div className="bg-slate-900 rounded-xl shadow border border-slate-800 p-6">
      <h3 className="text-xl font-bold text-slate-100 mb-6">Trade Journal</h3>

      {/* Filters */}
      <div className="grid grid-cols-5 gap-4 mb-6">
        <input
          type="text"
          placeholder="Search notes..."
          className="bg-slate-800 text-slate-200 p-2 rounded"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          className="bg-slate-800 text-slate-200 p-2 rounded"
          value={pairFilter}
          onChange={(e) => setPairFilter(e.target.value)}
        >
          <option value="">All Pairs</option>
          <option value="XAUUSD">XAUUSD</option>
          <option value="NAS100">NAS100</option>
          <option value="BTCUSD">BTCUSD</option>
        </select>

        <input
          type="date"
          className="bg-slate-800 text-slate-200 p-2 rounded"
          value={dateFilter}
          onChange={(e) => setDateFilter(e.target.value)}
        />

        <input
          type="text"
          placeholder="Tag filter (e.g. CHoCH)"
          className="bg-slate-800 text-slate-200 p-2 rounded"
          value={tagFilter}
          onChange={(e) => setTagFilter(e.target.value)}
        />

        <button
          onClick={() => {
            setSearch("");
            setPairFilter("");
            setDateFilter("");
            setTagFilter("");
          }}
          className="bg-cyan-600 hover:bg-cyan-700 text-white px-4 py-2 rounded"
        >
          Clear Filters
        </button>
      </div>

      {/* Add / Edit Entry */}
      <div className="bg-slate-800 p-4 rounded-lg mb-6">
        <h4 className="text-slate-100 font-semibold mb-3">
          {editingId ? "Edit Entry" : "Add New Entry"}
        </h4>

        <div className="grid grid-cols-4 gap-4 mb-3">
          <input
            type="text"
            placeholder="Pair"
            className="bg-slate-700 text-slate-200 p-2 rounded"
            value={newEntry.pair}
            onChange={(e) => setNewEntry({ ...newEntry, pair: e.target.value })}
          />

          <input
            type="date"
            className="bg-slate-700 text-slate-200 p-2 rounded"
            value={newEntry.date}
            onChange={(e) => setNewEntry({ ...newEntry, date: e.target.value })}
          />

          <input
            type="text"
            placeholder="Tags (comma separated)"
            className="bg-slate-700 text-slate-200 p-2 rounded"
            value={newEntry.tags}
            onChange={(e) => setNewEntry({ ...newEntry, tags: e.target.value })}
          />

          <input
            type="text"
            placeholder="Note"
            className="bg-slate-700 text-slate-200 p-2 rounded"
            value={newEntry.note}
            onChange={(e) => setNewEntry({ ...newEntry, note: e.target.value })}
          />
        </div>

        <button
          onClick={editingId ? handleSave : handleAdd}
          className="bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded"
        >
          {editingId ? "Save Changes" : "Add Entry"}
        </button>
      </div>

      {/* Entries */}
      <div className="space-y-4">
        {loading && <p className="text-slate-400">Loading...</p>}

        {!loading &&
          filteredEntries.map((e) => (
            <div
              key={e.id}
              className="bg-slate-800 p-4 rounded-lg border border-slate-700 hover:border-cyan-500 transition"
            >
              <div className="flex justify-between text-slate-400 text-sm mb-2">
                <span>{e.date}</span>
                <span>{e.pair}</span>
              </div>

              <p className="text-slate-200 mb-3">{e.note}</p>

              {/* Tags */}
              <div className="flex gap-2 mb-3">
                {e.tags.map((t, i) => (
                  <span
                    key={i}
                    className="bg-slate-700 text-slate-300 px-2 py-1 rounded text-xs"
                  >
                    {t}
                  </span>
                ))}
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => handleEdit(e)}
                  className="text-cyan-400 hover:text-cyan-300 text-sm"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(e.id)}
                  className="text-red-400 hover:text-red-300 text-sm"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}

        {!loading && filteredEntries.length === 0 && (
          <p className="text-slate-500 text-center py-6">No journal entries found.</p>
        )}
      </div>
    </div>
  );
}
