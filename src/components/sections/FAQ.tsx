export default function FAQ(){

const questions=[
[
"Can air conditioning heat as well as cool?",
"Yes. Modern systems provide efficient heating as well as cooling."
],
[
"How long does installation take?",
"Most residential installations are completed within one day."
],
[
"Which manufacturers do you install?",
"We install systems from leading manufacturers including Mitsubishi Electric, Daikin and others."
],
[
"Can I cool multiple rooms?",
"Yes. Multi split systems allow several indoor units connected to one outdoor unit."
]
];


return (

<section
id="faq"
className="py-20"
>

<div className="container">


<h2 className="
text-center
text-3xl
font-bold
text-slate-900
">
Frequently Asked Questions
</h2>


<div className="
mx-auto
mt-10
max-w-3xl
space-y-5
">


{questions.map(([q,a])=>(

<div
key={q}
className="
rounded-xl
border
border-slate-200
p-6
"
>

<h3 className="
font-semibold
text-slate-900
">
{q}
</h3>

<p className="
mt-2
text-slate-600
">
{a}
</p>

</div>

))}


</div>


</div>

</section>

);

}