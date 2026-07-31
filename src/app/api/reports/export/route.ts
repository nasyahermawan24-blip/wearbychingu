import { NextResponse } from "next/server";

import { createSupabaseServerClient } from "@/lib/supabase-server";


interface OrderExport {

  id: number;

  total: number;

  status: string;

  created_at: string;


  profiles:
    {
      full_name: string | null;
    }[] | null;


  products:
    {
      name: string | null;
    }[] | null;


  payments:
    {
      payment_method: string | null;
    }[] | null;

}



export async function GET() {


  const supabase =
    await createSupabaseServerClient();



  const {
    data,
    error,
  } = await supabase
    .from("orders")
    .select(`
      id,
      total,
      status,
      created_at,

      profiles:user_id(
        full_name
      ),

      order_items(
        product_name
      ),

      payments(
        payment_method
      )

    `)
    .order(
      "created_at",
      {
        ascending:false,
      }
    );



  if(error){

    return NextResponse.json(
      {
        error:error.message,
      },
      {
        status:500,
      }
    );

  }



  const orders =
    (data ?? []) as unknown as OrderExport[];



  const header = [

    "Order ID",

    "Customer",

    "Product",

    "Payment",

    "Total",

    "Status",

    "Date",

  ];



  const rows =
    orders.map(
      (item)=>{


        const customer =
          item.profiles?.[0]
          ?.full_name ??
          "-";



        const product =
          item.products?.[0]
          ?.name ??
          "-";



        const payment =
          item.payments?.[0]
          ?.payment_method ??
          "-";



        return [

          item.id,

          customer,

          product,

          payment,

          item.total,

          item.status,

          item.created_at,

        ];


      }
    );




  const csv = [

    header.join(","),

    ...rows.map(
      row =>
        row
        .map(
          value =>
            `"${String(value)
            .replace(/"/g,'""')}"`
        )
        .join(",")
    ),

  ].join("\n");





  return new NextResponse(
    csv,
    {

      headers:{

        "Content-Type":
          "text/csv;charset=utf-8",


        "Content-Disposition":
          'attachment; filename="wearbychingu-report.csv"',


      },

    }
  );


}