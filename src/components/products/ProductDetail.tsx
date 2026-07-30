"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ShoppingBag,
  Minus,
  Plus,
  Star,
  ArrowLeft,
  Zap,
} from "lucide-react";
import { useState } from "react";

import { Product } from "@/types/product";
import { addToCart } from "@/services/cart.service";

interface Props {
  product: Product;
}

export default function ProductDetail({
  product,
}: Props) {

  const [quantity, setQuantity] = useState(1);

  const price = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  });


  function handleAddToCart() {

    addToCart({
      id: product.id,
      name: product.name,
      description: product.description,
      category: product.category,
      price: Number(product.price),
      image_url: product.image_url,
      quantity,
    });


    alert(
      `${product.name} berhasil ditambahkan ke keranjang`
    );
  }



  function increaseQuantity(){

    if(quantity < product.stock){

      setQuantity(quantity + 1);

    }

  }


  function decreaseQuantity(){

    if(quantity > 1){

      setQuantity(quantity - 1);

    }

  }



  return (

    <section
      className="
      max-w-7xl
      mx-auto
      px-6
      py-16
      "
    >


      {/* BACK BUTTON */}

      <Link
        href="/product"
        className="
        inline-flex
        items-center
        gap-2
        text-gray-400
        hover:text-pink-500
        transition
        "
      >

        <ArrowLeft size={18}/>

        Kembali ke Produk

      </Link>



      <div
        className="
        mt-10
        grid
        gap-12
        lg:grid-cols-2
        "
      >


        {/* IMAGE */}

        <div
          className="
          relative
          h-[650px]
          overflow-hidden
          rounded-3xl
          border
          border-pink-900/40
          bg-black
          "
        >

          <Image

            src={
              product.image_url ||
              "https://placehold.co/600x800/png"
            }

            alt={product.name}

            fill

            className="
            object-cover
            "
          />


        </div>





        {/* DETAIL */}

        <div
          className="
          flex
          flex-col
          "
        >


          <span
            className="
            w-fit
            rounded-full
            bg-pink-900/40
            px-4
            py-2
            text-sm
            text-pink-400
            "
          >

            {product.category}

          </span>




          <h1
            className="
            mt-6
            text-5xl
            font-bold
            leading-tight
            "
          >

            {product.name}

          </h1>



          {/* RATING */}

          <div
            className="
            mt-5
            flex
            items-center
            gap-2
            "
          >

            <div className="flex text-yellow-400">

              {[1,2,3,4,5].map((star)=>(
                <Star
                  key={star}
                  size={20}
                  fill="currentColor"
                />
              ))}

            </div>


            <span className="text-gray-400">

              4.9 (120 Review)

            </span>


          </div>




          {/* PRICE */}

          <h2
            className="
            mt-8
            text-4xl
            font-bold
            text-pink-500
            "
          >

            {price.format(Number(product.price))}

          </h2>




          {/* STATUS */}

          <div
            className="
            mt-6
            flex
            gap-4
            "
          >

            <div
              className="
              rounded-xl
              bg-green-900/30
              px-4
              py-3
              text-green-400
              "
            >

              ✔ {product.status}

            </div>



            <div
              className="
              rounded-xl
              bg-pink-900/30
              px-4
              py-3
              text-pink-400
              "
            >

              Stock : {product.stock}

            </div>


          </div>




          {/* DESCRIPTION */}

          <p
            className="
            mt-8
            leading-8
            text-gray-300
            "
          >

            {product.description}

          </p>




          {/* QUANTITY */}

          <div
            className="
            mt-10
            flex
            items-center
            gap-5
            "
          >


            <button
              onClick={decreaseQuantity}
              className="
              rounded-xl
              border
              border-pink-700
              p-3
              hover:bg-pink-900/40
              "
            >

              <Minus size={18}/>

            </button>




            <span
              className="
              text-xl
              font-bold
              "
            >

              {quantity}

            </span>




            <button
              onClick={increaseQuantity}
              className="
              rounded-xl
              border
              border-pink-700
              p-3
              hover:bg-pink-900/40
              "
            >

              <Plus size={18}/>

            </button>


          </div>






          {/* ACTION BUTTON */}

          <div
            className="
            mt-10
            flex
            gap-4
            "
          >


            <button

              onClick={handleAddToCart}

              className="
              flex
              flex-1
              items-center
              justify-center
              gap-3
              rounded-2xl
              bg-gradient-to-r
              from-pink-700
              to-pink-500
              px-8
              py-4
              font-bold
              transition
              hover:scale-105
              "

            >

              <ShoppingBag/>

              Tambah Keranjang


            </button>




            <button

              className="
              flex
              flex-1
              items-center
              justify-center
              gap-3
              rounded-2xl
              border
              border-pink-500
              px-8
              py-4
              font-bold
              text-pink-400
              transition
              hover:bg-pink-900/30
              "

            >

              <Zap/>

              Beli Sekarang


            </button>


          </div>


        </div>


      </div>





      {/* TESTIMONIAL PLACEHOLDER */}

      <div
        className="
        mt-24
        rounded-3xl
        border
        border-pink-900/30
        bg-black/40
        p-10
        "
      >

        <h2
          className="
          text-3xl
          font-bold
          "
        >

          Testimonial Customer

        </h2>


        <div
          className="
          mt-8
          rounded-2xl
          bg-pink-950/20
          p-6
          "
        >

          <div className="flex text-yellow-400">

            ★★★★★

          </div>


          <p className="mt-3 text-gray-300">

            “Produk sangat bagus dan sesuai dengan deskripsi.”

          </p>


        </div>


      </div>



    </section>

  );
}