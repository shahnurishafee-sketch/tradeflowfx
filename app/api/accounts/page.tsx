"use client";

import AccountsTable from "../components/AccountsTable";

export default function AccountsPage() {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6">Accounts</h2>
      <div className="bg-[#161b22] p-6 rounded-xl shadow-lg border border-[#1f2937]">
        <AccountsTable />
      </div>
    </div>
  );
}
