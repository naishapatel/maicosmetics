
import AboutHero from "@/components/about/AboutHero";
import AboutFounders from "@/components/about/AboutFounders";
import AboutMission from "@/components/about/AboutMission";
import AboutValues from "@/components/about/AboutValues";
import JoinCommunity from "@/components/about/JoinCommunity";

const About = () => {
  return (
    <div className="min-h-screen bg-mai-sand">
      <main className="pt-24 pb-16">
        <AboutHero />
        <AboutFounders />
        <AboutMission />
        <AboutValues />
        <JoinCommunity />
      </main>
    </div>
  );
};

export default About;
