import { NextRequest, NextResponse } from "next/server";

import {
  getReportStats,
  getRecentSales,
} from "@/services/report.service";

import {
  getRevenueChart,
  getStatusChart,
  getTopProducts,
} from "@/services/chart.service";

export async function GET(request: NextRequest) {

  const searchParams = request.nextUrl.searchParams;

  const filter =
    searchParams.get("filter") ?? "30days";

  try {

    const [
      stats,
      sales,
      revenueChart,
      statusChart,
      topProducts,
    ] = await Promise.all([

      getReportStats(filter),

      getRecentSales(filter),

      getRevenueChart(filter),

      getStatusChart(filter),

      getTopProducts(filter),

    ]);

    return NextResponse.json({

      stats,

      sales,

      revenueChart,

      statusChart,

      topProducts,

    });

  } catch (error) {

    console.error(error);

    return NextResponse.json(
      {
        message: "Failed to load reports.",
      },
      {
        status: 500,
      }
    );

  }

}