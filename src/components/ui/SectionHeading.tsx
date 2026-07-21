export default function SectionHeading({
  title,
  text,
}: {
  title:string;
  text:string;
}) {

return (

<div className="mx-auto max-w-3xl text-center">

<h2 className="
text-3xl
font-bold
tracking-tight
text-slate-900
md:text-4xl
">
{title}
</h2>


<p className="
mt-4
text-lg
text-slate-600
">
{text}
</p>

</div>

)

}