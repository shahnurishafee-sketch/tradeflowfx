import Link from 'next/link';

export default function LandingPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-950 text-white">
      <h1 className="text-4xl font-bold mb-4">Welcome to TradeFlowFX</h1>
      <p className="text-slate-400 mb-8">The Trading Journal That Works For You</p>
      <div className="flex gap-4">
        <Link href="/login" className="px-6 py-3 bg-blue-600 rounded-lg font-medium hover:bg-blue-700">
          Log In
        </Link>
        <Link href="/signup" className="px-6 py-3 bg-slate-800 border border-slate-700 rounded-lg font-medium hover:bg-slate-700">
          Get Started
        </Link>
      </div>
    </div>
  );
}
