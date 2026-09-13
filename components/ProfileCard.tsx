export default function ProfileCard() {
  return (
    <div className="bg-white rounded-xl shadow border border-gray-200 p-6 mb-6">
      <div className="flex items-center gap-4">
        <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 text-xl">
          👤
        </div>

        <div>
          <h3 className="text-xl font-bold">Your Profile</h3>
          <p className="text-gray-500 text-sm">Manage your personal information</p>
        </div>
      </div>

      <div className="mt-6 space-y-4">
        <div>
          <label className="text-gray-700 text-sm">Full Name</label>
          <input
            type="text"
            placeholder="John Doe"
            className="w-full mt-1 px-3 py-2 rounded-lg border border-gray-300 bg-white"
          />
        </div>

        <div>
          <label className="text-gray-700 text-sm">Email</label>
          <input
            type="email"
            placeholder="you@example.com"
            className="w-full mt-1 px-3 py-2 rounded-lg border border-gray-300 bg-white"
          />
        </div>

        <div>
          <label className="text-gray-700 text-sm">Country</label>
          <input
            type="text"
            placeholder="United Arab Emirates"
            className="w-full mt-1 px-3 py-2 rounded-lg border border-gray-300 bg-white"
          />
        </div>
      </div>
    </div>
  );
}
