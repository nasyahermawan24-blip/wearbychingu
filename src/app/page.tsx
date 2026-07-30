import Link from "next/link";

import FeaturedProducts from "@/components/dashboard/home/FeaturedProducts";
import TestimonialsSection from "@/components/dashboard/home/TestimonialsSection";

export default function Home() {

  return (

    <>

      <section
        className="
        min-h-screen
        flex
        items-center
        justify-center
        px-6
        "
      >

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