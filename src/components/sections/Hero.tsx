export default function Hero() {
  return (
    <section className="bg-slate-50">

      <div className="container grid gap-12 py-20 md:grid-cols-2 md:items-center md:py-32">


        <div>

          <p className="mb-5 font-semibold text-blue-600">
            Residential Air Conditioning Installation
          </p>


          <h1 className="
            text-4xl
            font-bold
            leading-tight
            text-slate-900
            md:text-6xl
          ">
            Comfortable homes,
            professionally installed
            air conditioning.
          </h1>


          <p className="
            mt-6
            max-w-xl
            text-lg
            leading-relaxed
            text-slate-600
          ">
            Stay comfortable throughout the year with reliable air
            conditioning designed for bedrooms, home offices,
            lounges and multi-room homes.
          </p>


          <div className="mt-8 flex flex-wrap gap-4">

            <a
              href="#quote"
              className="rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
            >
              Request a Free Quote
            </a>


            <a
              href="#services"
              className="
              rounded-lg
              border
              border-slate-300
              px-7
              py-4
              font-semibold
              text-slate-700
              hover:bg-white
              "
            >
              View Services
            </a>

          </div>


          <div className="mt-10 grid grid-cols-3 gap-4 text-sm">

            <div>
              <strong className="block text-slate-900">
                F-Gas
              </strong>
              Certified
            </div>

            <div>
              <strong className="block text-slate-900">
                Local
              </strong>
              Installer
            </div>

            <div>
              <strong className="block text-slate-900">
                Free
              </strong>
              Quotations
            </div>

          </div>


        </div>


        <div className="
          flex
          min-h-[350px]
          items-center
          justify-center
          rounded-3xl
          bg-slate-200
        ">

          <div className="text-center text-slate-500">

            <p className="text-6xl">
              ❄️
            </p>

            <p className="mt-4 font-medium">
              Installation Gallery Image
            </p>

          </div>

        </div>


      </div>

    </section>
  );
}