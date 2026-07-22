import Header from "@/components/layout/Header";
import Hero from "@/components/sections/Hero";
import Benefits from "@/components/sections/Benefits";
import Services from "@/components/sections/Services";
import Process from "@/components/sections/Process";
import WhyChooseUs from "@/components/sections/WhyChooseUs";
import FAQ from "@/components/sections/FAQ";
import QuoteCTA from "@/components/sections/QuoteCTA";
import QuoteWizard from "@/components/quote/QuoteWizard";

export default function Home(){

return (

<>
<Header />

<main>

<Hero />

<Benefits />

<Services />

<Process />

<WhyChooseUs />

<FAQ />

<QuoteCTA />

<QuoteWizard />

</main>

</>

);

}