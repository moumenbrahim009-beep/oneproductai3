import Nav from "./components/Nav";
import Hero from "./components/Hero";
import Problem from "./components/Problem";
import Solution from "./components/Solution";
import HowItWorks from "./components/HowItWorks";
import WhatYouGet from "./components/WhatYouGet";
import Timeline from "./components/Timeline";
import Chatbot from "./components/Chatbot";
import Guarantee from "./components/Guarantee";
import FAQ from "./components/FAQ";
import FinalCTA from "./components/FinalCTA";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Problem />
        <Solution />
        <HowItWorks />
        <WhatYouGet />
        <Timeline />
        <Chatbot />
        <Guarantee />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
