
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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.4,
        delayChildren: 0.2,
        duration: 0.8
      }
    }
  };

  return (
    <motion.section 
      className="max-w-6xl mx-auto px-4 mb-24"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={containerVariants}
    >
      <motion.div 
        className="bg-white/80 backdrop-blur-sm rounded-3xl p-10 md:p-16 shadow-md border border-mai-sage/20"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8 }}
        whileHover={{ 
          boxShadow: "0 20px 50px -12px rgba(0, 0, 0, 0.1)",
          transition: { duration: 0.4 }
        }}
      >
        <motion.h2 
          className="text-3xl md:text-4xl font-bold text-mai-brown mb-12 relative inline-block"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Our Founders
          <motion.div 
            className="absolute -bottom-2 left-0 h-1 bg-mai-coral rounded-full w-0"
            whileInView={{ width: "100%" }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.5 }}
          />
        </motion.h2>
        
        {founders.map((founder, index) => (
          <FounderCard 
            key={founder.name}
            index={index}
            {...founder}
          />
        ))}
      </motion.div>
    </motion.section>
  );
};

export default AboutFounders;
