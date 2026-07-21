export default function Process(){

const steps=[
"Tell us about your home",
"Upload photos and requirements",
"Receive your quotation",
"Professional installation"
];


return (

<section
id="process"
className="py-20"
>

<div className="container">


<h2 className="
text-center
text-3xl
font-bold
text-slate-900
md:text-4xl
">
A simple installation process
</h2>


<div className="
mt-12
grid
gap-6
md:grid-cols-4
">


{steps.map((step,index)=>(

<div
key={step}
className="
rounded-2xl
border
border-slate-200
p-6
"
>

<div className="
mb-4
flex
h-10
w-10
items-center
justify-center
rounded-full
bg-blue-600
font-bold
text-white
">
{index+1}
</div>


<p className="text-slate-700">
{step}
</p>


</div>

))}


</div>


</div>

</section>

);

}