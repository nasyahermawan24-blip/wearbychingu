import ReportClient from "@/components/admin/ReportClient";

import {
  getReportStats,
  getRecentSales,
  getRevenueComparison,
} from "@/services/report.service";

import {
  getRevenueChart,
  getStatusChart,
  getTopProducts,
} from "@/services/chart.service";

export default async function ReportsPage() {

  const [
    stats,
    sales,
    comparison,
    revenueChart,
    statusChart,
    topProducts,
  ] = await Promise.all([
    getReportStats(),
    getRecentSales(),
    getRevenueComparison(),
    getRevenueChart(),
    getStatusChart(),
    getTopProducts(),
  ]);

  return (

    <section className="space-y-8">

      <div>

        <h1 className="text-4xl font-bold text-white">
          Sales Report
        </h1>

        <p className="mt-2 text-gray-400">
          Monitor revenue, customer transactions, and sales performance.
        </p>

      </div>

      <ReportClient
        stats={stats}
        sales={sales}
        comparison={comparison}
        revenueChart={revenueChart}
        statusChart={statusChart}
        topProducts={topProducts}
      />

    </section>

  );

}