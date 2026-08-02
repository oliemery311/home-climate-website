export default function Services() {

const services = [
  {
    title: "Bedroom Air Conditioning",
    description:
      "Quiet, efficient cooling for a comfortable night's sleep."
  },
  {
    title: "Home Office Air Conditioning",
    description:
      "Maintain a comfortable working environment throughout the year."
  },
  {
    title: "Lounge & Conservatory Cooling",
    description:
      "Keep larger living spaces comfortable even during heatwaves."
  },
  {
    title: "Multi-Room Systems",
    description:
      "Control multiple rooms from a single outdoor unit."
  },
  {
    title: "Static Caravan Air Conditioning",
    description:
      "Heating and cooling solutions for holiday homes and caravans."
  },
  {
    title: "Single Split Systems",
    description:
      "A cost-effective solution for individual rooms."
  }
];


return (

<section
id="services"
className="bg-slate-50 py-24"
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


{services.map((service) => (

<div
key={service.title}
className="
rounded-2xl
border
border-slate-200
bg-white
p-6
shadow-sm
transition
duration-200
hover:-translate-y-1
hover:border-[var(--hcs-blue-light)]
hover:shadow-md
"
>

<h3 className="
font-semibold
text-slate-900
">
{service.title}
</h3>


<p className="
mt-2
text-sm
text-slate-600
">
{service.description}
</p>


</div>

))}


</div>


</div>

</section>

);

}