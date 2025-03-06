
import { motion } from "framer-motion";
import FounderCard from "./FounderCard";

const AboutFounders = () => {
  const founders = [
    {
      name: "Naisha Patel",
      role: "Founder, CEO",
      university: "Purdue University",
      bio: "Naisha founded mai. with a vision to transform how people discover beauty products. Combining her passion for ethical beauty with her technical expertise, she created a platform that puts both consumers and small businesses first, emphasizing authenticity and sustainability throughout the beauty journey.",
      image: "/lovable-uploads/7396519f-835d-4b8e-917c-a151b9ce67ac.png",
      borderColor: "mai-coral"
    },
    {
      name: "Connie Chen",
      role: "Co-Founder, CTO",
      university: "Purdue University",
      bio: "As Co-Founder and CTO, Connie brings her extensive technical expertise to mai. She leads our engineering team in developing innovative solutions that power our personalization algorithms and seamless user experience. Her passion for technology that makes a positive impact drives the technical vision behind our platform.",
      image: "/lovable-uploads/3d0b2768-19f0-4844-86ca-73f4e313195a.png",
      borderColor: "mai-sage"
    }
  ];

  return (
    <motion.section 
      className="max-w-6xl mx-auto px-4 mb-16"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.1 }}
    >
      <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-mai-sage/20">
        <h2 className="text-3xl md:text-4xl font-bold text-mai-brown mb-8">Our Founders</h2>
        
        {founders.map((founder, index) => (
          <FounderCard 
            key={founder.name}
            index={index}
            {...founder}
          />
        ))}
      </div>
    </motion.section>
  );
};

export default AboutFounders;
