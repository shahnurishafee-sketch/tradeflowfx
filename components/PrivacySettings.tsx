export default function PrivacySettings() {
  return (
    <div className="bg-white rounded-xl shadow border border-gray-200 p-6">
      <h3 className="text-xl font-bold mb-4">Privacy Settings</h3>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-gray-700">Show my profile publicly</span>
          <input type="checkbox" className="w-5 h-5" />
        </div>

        <div className="flex items-center justify-between">
          <span className="text-gray-700">Allow leaderboard visibility</span>
          <input type="checkbox" className="w-5 h-5" />
        </div>

        <div className="flex items-center justify-between">
          <span className="text-gray-700">Share trading stats with community</span>
          <input type="checkbox" className="w-5 h-5" />
        </div>

        <div className="flex items-center justify-between">
          <span className="text-gray-700">Enable AI usage tracking</span>
          <input type="checkbox" className="w-5 h-5" />
        </div>
      </div>

      <div className="mt-6 text-gray-500 text-sm">
        Your privacy preferences help control what information is visible to other traders.
      </div>
    </div>
  );
}
