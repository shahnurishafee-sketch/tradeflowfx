export default function ContactUs() {
  return (
    <div className="bg-white rounded-xl shadow border border-gray-200 p-6 space-y-4">
      <h2 className="text-xl font-bold">Contact Us</h2>

      <div className="bg-cyan-50 rounded-lg p-4 flex justify-between items-center">
        <div>
          <p className="font-semibold">Email Support</p>
          <p className="text-gray-700">support@tfftrading.com</p>
          <p className="text-gray-400 text-sm">We typically respond within 24 hours</p>
        </div>
        <button className="bg-cyan-400 text-black px-3 py-2 rounded-lg font-semibold">
          Send Email →
        </button>
      </div>

      <div className="flex gap-3">
        <div className="bg-gray-50 rounded-lg p-3 flex-1 text-center">
          <p className="font-semibold text-gray-700">Twitter / X</p>
          <p className="text-gray-400 text-sm">@TFFTrading</p>
        </div>
        <div className="bg-gray-50 rounded-lg p-3 flex-1 text-center">
          <p className="font-semibold text-gray-700">Discord</p>
          <p className="text-gray-400 text-sm">Join Community</p>
        </div>
      </div>

      <div className="bg-gray-50 rounded-lg p-3 flex justify-between items-center">
        <p className="text-green-600 font-semibold">● All Systems Operational</p>
        <p className="text-gray-400 text-sm">Updated just now</p>
      </div>
    </div>
  );
}
