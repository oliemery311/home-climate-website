export default function Hero() {
  return (
    <section className="bg-slate-50">

      <div className="container grid gap-12 py-20 md:grid-cols-2 md:items-center md:py-32">


        <div>

          <p className="mb-5 font-semibold text-[var(--hcs-orange)]">
            Residential Air Conditioning Installation
          </p>


          <h1
            className="
  text-4xl
  font-bold
  leading-tight
  text-slate-900
  md:text-6xl
"
          >
            Home Air Conditioning &
            Climate Control Specialists
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
              className="rounded-lg bg-[var(--hcs-blue)] px-7 py-4 font-semibold text-white transition hover:opacity-90"
            >
              Request a Free Quote
            </a>


            <a
              href="#services"
              className="
              rounded-lg
              border
              border-[var(--hcs-orange)]
              px-7
              py-4
              font-semibold
              text-[var(--hcs-orange)]
              hover:bg-[var(--hcs-orange)]/10
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
              Installer
            </div>

            <div>
              <strong className="block text-slate-900">
               ✓ Residential
              </strong>
              Specialists
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

          <div
            className="
  overflow-hidden
  rounded-3xl
  shadow-xl
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