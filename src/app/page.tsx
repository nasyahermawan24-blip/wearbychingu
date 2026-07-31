import Link from "next/link";

import FeaturedProducts from "@/components/dashboard/home/FeaturedProducts";
import TestimonialsSection from "@/components/dashboard/home/TestimonialsSection";

export default function Home() {

  return (

    <>

      <section
        className="
        relative
        min-h-screen
        flex
        items-center
        justify-center
        overflow-hidden
        px-6
        "
      >
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(236,72,153,0.16),_transparent_52%)]" />
        <div className="pointer-events-none absolute bottom-10 left-1/2 h-40 w-40 -translate-x-1/2 rounded-full bg-pink-500/10 blur-3xl" />

        <div
          className="
          text-center
          max-w-3xl
          "
        >

          <h1
            className="
            text-5xl
            md:text-7xl
            font-bold
            "
          >

            Welcome to

            <span
              className="
              block
              text-pink-500
              "
            >

              WearByChingu

            </span>

          </h1>

          <p
            className="
            mt-6
            text-gray-300
            text-lg
            "
          >

            Marketplace produk digital modern
            untuk Baju Rajut Premium dari Bangkok.

          </p>

          <Link
            href="/products"
            className="
            inline-block
            mt-10
            px-8
            py-3
            rounded-full
            bg-pink-500
            hover:bg-pink-600
            transition
            font-semibold
            "
          >

            Explore Products

          </Link>

        </div>

      </section>

      <FeaturedProducts />

      <TestimonialsSection />

    </>

  );

}