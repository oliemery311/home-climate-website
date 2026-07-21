export default function Services() {

const services = [
"Single Split Systems",
"Multi Split Systems",
"Bedroom Air Conditioning",
"Home Office Air Conditioning",
"Lounge & Conservatory Cooling",
];


return (

<section
id="services"
className="bg-slate-50 py-20"
>

<div className="container">


<h2 className="
text-center
text-3xl
font-bold
text-slate-900
md:text-4xl
">
Our Services
</h2>


<div className="
mt-12
grid
gap-5
sm:grid-cols-2
lg:grid-cols-3
">


{services.map(service=>(

<div
key={service}
className="
rounded-xl
bg-white
p-6
shadow-sm
"
>

<h3 className="
font-semibold
text-slate-900
">
{service}
</h3>


<p className="
mt-2
text-sm
text-slate-600
">
Professional installation designed around your home.
</p>


</div>

))}


</div>


</div>

</section>

);

}