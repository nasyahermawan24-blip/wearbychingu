export default function DashboardHome() {
  return (
    <div className="space-y-8">

      <div>
        <h1 className="text-4xl font-bold text-pink-500">
          Dashboard
        </h1>

        <p className="text-gray-400 mt-2">
          Welcome back, Administrator 👋
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">

        <div className="rounded-2xl bg-zinc-900 border border-pink-500/20 p-6">
          <p className="text-gray-400">
            Total Categories
          </p>

          <h2 className="text-4xl font-bold text-pink-500 mt-3">
            0
          </h2>
        </div>

        <div className="rounded-2xl bg-zinc-900 border border-pink-500/20 p-6">
          <p className="text-gray-400">
            Total Products
          </p>

          <h2 className="text-4xl font-bold text-pink-500 mt-3">
            0
          </h2>
        </div>

        <div className="rounded-2xl bg-zinc-900 border border-pink-500/20 p-6">
          <p className="text-gray-400">
            Total Orders
          </p>

          <h2 className="text-4xl font-bold text-pink-500 mt-3">
            0
          </h2>
        </div>

      </div>

      <div className="rounded-2xl bg-zinc-900 border border-pink-500/20 p-6">

        <h2 className="text-2xl font-bold text-pink-500 mb-6">
          Quick Menu
        </h2>

        <div className="grid md:grid-cols-2 gap-4">

          <div className="rounded-xl bg-zinc-800 p-5 hover:border hover:border-pink-500 transition">
            📂 Manage Categories
          </div>

          <div className="rounded-xl bg-zinc-800 p-5 hover:border hover:border-pink-500 transition">
            👕 Manage Products
          </div>

          <div className="rounded-xl bg-zinc-800 p-5 hover:border hover:border-pink-500 transition">
            📦 Orders
          </div>

          <div className="rounded-xl bg-zinc-800 p-5 hover:border hover:border-pink-500 transition">
            👥 Customers
          </div>

        </div>

      </div>

      <div className="rounded-2xl bg-zinc-900 border border-pink-500/20 p-6">

        <h2 className="text-2xl font-bold text-pink-500 mb-6">
          Recent Activity
        </h2>

        <ul className="space-y-3 text-gray-300">

          <li>• Belum ada aktivitas.</li>

        </ul>

      </div>

    </div>
  );
}