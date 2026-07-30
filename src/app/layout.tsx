import type { Metadata } from "next";
import "./globals.css";

import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";


export const metadata: Metadata = {

title:
"WearByChingu Digital Marketplace",

description:
"Digital marketplace untuk produk digital WearByChingu"

};



export default function RootLayout({

children,

}: Readonly<{

children: React.ReactNode;

}>) {


return (

<html lang="en">


<body
className="
bg-black
text-white
"
>


<Navbar/>


<main
className="
pt-20
min-h-screen
"
>

{children}

</main>


<Footer/>


</body>


</html>

)

}