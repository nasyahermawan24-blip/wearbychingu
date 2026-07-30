interface Props{
    title:string
}

export default function EmptyState({
title
}:Props){

return(

<div className="py-24 text-center">

<h2 className="text-3xl font-bold text-pink-500">

{title}

</h2>

<p className="mt-4 text-gray-400">

Belum ada data.

</p>

</div>

)

}