"use client";

import {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  Search,
  Users,
  ShoppingBag,
  DollarSign,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import {
  getCustomersWithAggregates,
  getCustomerStats,
} from "@/services/customer.service";

import {
  CustomerAggregate,
  CustomerStats,
} from "@/types/customer";


export default function CustomerTable() {

  const [customers, setCustomers] =
    useState<CustomerAggregate[]>([]);

  const [stats, setStats] =
    useState<CustomerStats | null>(null);


  const [loading, setLoading] =
    useState(true);


  const [search, setSearch] =
    useState("");


  const [page, setPage] =
    useState(1);


  const pageSize = 10;


  async function loadCustomers() {

    try {

      setLoading(true);


      const [
        customerStats,
        customerData,
      ] = await Promise.all([

        getCustomerStats(),

        getCustomersWithAggregates(
          search,
          page,
          pageSize
        ),

      ]);


      setStats(customerStats);

      setCustomers(
        customerData.customers
      );


    } catch (error) {

      console.error(
        "Customer loading error:",
        error
      );


    } finally {

      setLoading(false);

    }

  }



  useEffect(() => {

    loadCustomers();

  }, [page]);



  useEffect(() => {

    const timer =
      setTimeout(() => {

        setPage(1);

        loadCustomers();

      }, 400);



    return () =>
      clearTimeout(timer);


  }, [search]);




  const totalPages =
    useMemo(() => {

      if (!stats)
        return 1;


      return Math.max(
        1,
        Math.ceil(
          stats.total_customers /
          pageSize
        )
      );


    }, [stats]);




  const currency =
    new Intl.NumberFormat(
      "id-ID",
      {
        style: "currency",
        currency: "IDR",
        maximumFractionDigits: 0,
      }
    );



  if (loading) {

    return (

      <div className="
        py-20
        text-center
        text-gray-400
      ">

        Loading customer...

      </div>

    );

  }



  return (

    <section className="space-y-8">


      {/* STATISTIC CARD */}

      <div className="
        grid
        gap-6
        sm:grid-cols-2
        xl:grid-cols-4
      ">


        <StatCard

          title="Total Customer"

          value={
            stats?.total_customers ?? 0
          }

          icon={
            <Users size={28}/>
          }

        />


        <StatCard

          title="Active Customer"

          value={
            stats?.active_customers ?? 0
          }

          icon={
            <ShoppingBag size={28}/>
          }

        />


        <StatCard

          title="Total Orders"

          value={
            stats?.total_orders ?? 0
          }

          icon={
            <ShoppingBag size={28}/>
          }

        />


        <StatCard

          title="Revenue"

          value={
            currency.format(
              stats?.total_revenue ?? 0
            )
          }

          icon={
            <DollarSign size={28}/>
          }

        />


      </div>




      {/* SEARCH */}

      <div className="
        flex
        items-center
        gap-3
        rounded-3xl
        border
        border-pink-900/30
        bg-zinc-950
        p-5
      ">


        <Search
          className="text-gray-400"
          size={20}
        />


        <input

          value={search}

          onChange={(e)=>
            setSearch(
              e.target.value
            )
          }


          placeholder="
            Search customer...
          "


          className="
            flex-1
            bg-transparent
            text-white
            outline-none
            placeholder:text-gray-500
          "

        />


      </div>






      {/* TABLE */}

      <div className="
        overflow-x-auto
        rounded-3xl
        border
        border-pink-900/30
        bg-zinc-950
      ">


        <table className="
          min-w-full
        ">


          <thead>

            <tr className="
              border-b
              border-pink-900/30
            ">


              <th className="
                p-4
                text-left
                text-gray-400
              ">
                Customer
              </th>


              <th className="
                p-4
                text-left
                text-gray-400
              ">
                Email
              </th>


              <th className="
                p-4
                text-left
                text-gray-400
              ">
                Phone
              </th>


              <th className="
                p-4
                text-left
                text-gray-400
              ">
                Orders
              </th>


              <th className="
                p-4
                text-left
                text-gray-400
              ">
                Spending
              </th>


            </tr>

          </thead>




          <tbody>


            {customers.length === 0 ? (

              <tr>

                <td
                  colSpan={5}
                  className="
                    p-8
                    text-center
                    text-gray-500
                  "
                >

                  No customer found.

                </td>


              </tr>


            ) : (


              customers.map(
                (customer)=>(

                <tr

                  key={
                    customer.id
                  }


                  className="
                    border-b
                    border-pink-900/20
                    hover:bg-pink-950/10
                  "

                >


                  <td className="
                    p-4
                    text-white
                  ">

                    {
                      customer.full_name ??
                      "-"
                    }

                  </td>


                  <td className="
                    p-4
                    text-gray-300
                  ">

                    {
                      customer.email ??
                      "-"
                    }

                  </td>


                  <td className="
                    p-4
                    text-gray-300
                  ">

                    {
                      customer.phone ??
                      "-"
                    }

                  </td>



                  <td className="
                    p-4
                    text-white
                  ">

                    {
                      customer.total_orders
                    }

                  </td>



                  <td className="
                    p-4
                    font-semibold
                    text-pink-400
                  ">

                    {
                      currency.format(
                        customer.total_spending
                      )
                    }


                  </td>


                </tr>


              ))


            )}


          </tbody>


        </table>


      </div>





      {/* PAGINATION */}

      <div className="
        flex
        items-center
        justify-between
      ">


        <button

          disabled={
            page === 1
          }


          onClick={()=>
            setPage(
              page - 1
            )
          }


          className="
            rounded-xl
            bg-zinc-900
            p-3
            text-white
            disabled:opacity-40
          "

        >

          <ChevronLeft/>

        </button>




        <span className="
          text-gray-400
        ">

          Page {page} / {totalPages}

        </span>




        <button

          disabled={
            page === totalPages
          }


          onClick={()=>
            setPage(
              page + 1
            )
          }


          className="
            rounded-xl
            bg-zinc-900
            p-3
            text-white
            disabled:opacity-40
          "

        >

          <ChevronRight/>

        </button>


      </div>



    </section>

  );

}





function StatCard({

  title,

  value,

  icon,

}: {

  title:string;

  value:string|number;

  icon:React.ReactNode;

}) {


  return (

    <div className="
      rounded-3xl
      border
      border-pink-900/30
      bg-zinc-950
      p-6
    ">


      <div className="
        flex
        items-center
        justify-between
      ">


        <div>

          <p className="
            text-xs
            uppercase
            text-gray-500
          ">

            {title}

          </p>


          <h2 className="
            mt-3
            text-3xl
            font-bold
            text-white
          ">

            {value}

          </h2>


        </div>



        <div className="
          rounded-2xl
          bg-pink-500/10
          p-4
          text-pink-400
        ">

          {icon}

        </div>


      </div>


    </div>

  );

}