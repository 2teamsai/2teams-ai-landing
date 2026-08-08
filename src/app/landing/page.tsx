import Nav from "@/components/Nav";
import NodeField from "@/components/NodeField";
import Problem from "@/components/Problem";
import Pillars from "@/components/Pillars";
import Teams from "@/components/Teams";
import Audience from "@/components/Audience";
import Process from "@/components/Process";
import Why from "@/components/Why";
import Origin from "@/components/Origin";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function LandingPage() {
  return (
    <>
      <NodeField />
      <Nav />
      <main id="top">
        <Problem />
        <Pillars />
        <Teams />
        <Audience />
        <Process />
        <Why />
        <Origin />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
