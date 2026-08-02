export default function Hero() {
  return (
    <section className="bg-gradient-to-b from-slate-50 via-white to-slate-50">

      <div className="container grid gap-12 py-24 md:grid-cols-2 md:items-center md:py-32">


        <div className="max-w-2xl">

          <p className="mb-5 inline-flex rounded-full bg-[var(--hcs-orange)]/10 px-3 py-1 text-sm font-semibold text-[var(--hcs-blue)]">
            Residential Air Conditioning Installation
          </p>


          <h1
            className="
  text-4xl
  font-bold
  leading-tight
  tracking-tight
  text-slate-900
  md:text-6xl
"
          >
            Home Air Conditioning &
            Climate Specialists
          </h1>


          <p
            className="
  mt-6
  max-w-xl
  text-lg
  leading-relaxed
  text-slate-600
  "
          >
            Professional installation of residential
            air conditioning systems across North West Leicestershire
            and the Midlands.

            Bedrooms, lounges, home offices,
            garden rooms, conservatories and
            static caravans.
          </p>


          <div className="mt-8 flex flex-wrap gap-4">

            <a
              href="#quote"
              className="rounded-lg bg-[var(--hcs-blue)] px-7 py-4 font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:opacity-90"
            >
              Request a Free Quote
            </a>


            <a
              href="#services"
              className="
              rounded-lg
              border
              border-[var(--hcs-blue-light)]
              px-7
              py-4
              font-semibold
              text-[var(--hcs-blue)]
              transition
              hover:-translate-y-0.5
              hover:bg-[var(--hcs-blue)]/5
              "
            >
              View Services
            </a>

          </div>


          <div className="mt-10 grid grid-cols-3 gap-4 text-sm">

            <div>
              <strong className="block text-slate-900">
                ✓ F-Gas
              </strong>
                  Certified
            </div>

            <div>
              <strong className="block text-slate-900">
                ✓ Fully Insured
              </strong>
              
            </div>

            <div>
              <strong className="block text-slate-900">
               ✓ Residential
              </strong>
                 Installations
            </div>

          </div>


        </div>


        <div className="
          flex
          min-h-[350px]
          items-center
          justify-center
          rounded-[28px]
          bg-gradient-to-br
          from-slate-200
          to-slate-100
          p-3
          shadow-[0_20px_60px_-20px_rgba(35,79,147,0.35)]
        ">

          <div
            className="
  overflow-hidden
  rounded-[24px]
  shadow-lg
  ring-1
  ring-slate-200
  "
          >

            <img
              src="/hero-install.png"
              alt="Home air conditioning installation"
              className="
    h-full
    w-full
    object-cover
    "
            />

          </div>

        </div>


      </div>

    </section>
  );
}