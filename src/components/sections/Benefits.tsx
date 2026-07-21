export default function Benefits() {
  const benefits = [
    {
      title: "Better Sleep",
      text:
        "Keep bedrooms comfortable during hot summer nights with quiet, efficient cooling.",
    },
    {
      title: "Comfortable Workspaces",
      text:
        "Maintain a comfortable temperature in your home office all year round.",
    },
    {
      title: "Heating & Cooling",
      text:
        "Modern air conditioning systems provide efficient heating as well as cooling.",
    },
  ];

  return (
    <section className="py-20">

      <div className="container">

        <div className="mx-auto max-w-3xl text-center">

          <h2 className="text-3xl font-bold text-slate-900 md:text-4xl">
            More comfort in every room
          </h2>

          <p className="mt-4 text-lg text-slate-600">
            Air conditioning is more than just cooling. Modern systems
            improve comfort throughout the year.
          </p>

        </div>


        <div className="mt-12 grid gap-6 md:grid-cols-3">

          {benefits.map((item) => (

            <div
              key={item.title}
              className="
              rounded-2xl
              border
              border-slate-200
              bg-white
              p-8
              shadow-sm
              "
            >

              <h3 className="text-xl font-semibold text-slate-900">
                {item.title}
              </h3>

              <p className="mt-3 text-slate-600">
                {item.text}
              </p>

            </div>

          ))}

        </div>

      </div>

    </section>
  );
}