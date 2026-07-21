export default function WhyChooseUs(){

const reasons=[
"F-Gas certified installation",
"Residential air conditioning specialists",
"Friendly local service",
"Clean and tidy workmanship",
"Quality manufacturer options",
"Clear honest quotations"
];


return (

<section className="bg-slate-950 py-20 text-white">

<div className="container">


<h2 className="
text-center
text-3xl
font-bold
md:text-4xl
">
Why choose Home Climate Solutions?
</h2>


<div className="
mt-12
grid
gap-4
md:grid-cols-3
">


{reasons.map(reason=>(

<div
key={reason}
className="
rounded-xl
bg-white/10
p-6
"
>
{reason}
</div>

))}


</div>


</div>

</section>

);

}