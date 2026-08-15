import Nav from "@/components/Nav";
import NodeField from "@/components/NodeField";
import Problem from "@/components/Problem";
import Pillars from "@/components/Pillars";
import Differentiators from "@/components/Differentiators";
import Teams from "@/components/Teams";
import Audience from "@/components/Audience";
import Process from "@/components/Process";
import Why from "@/components/Why";
import Origin from "@/components/Origin";
import SuccessCases from "@/components/SuccessCases";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import ChatWidget from "@/components/ChatWidget";

export default function LandingPage() {
  return (
    <>
      <NodeField />
      <Nav />
      <main id="top">
        <Problem />
        <Pillars />
        <Differentiators />
        <Teams />
        <Audience />
        <Process />
        <Why />
        <Origin />
        <SuccessCases />
        <Contact />
      </main>
      <Footer />
      <ChatWidget />
    </>
  );
}
