import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { MapPin, Briefcase, GraduationCap, Sparkles } from 'lucide-react';

const highlights = [
  { icon: Briefcase, label: 'Experience', value: '2+ Years' },
  { icon: GraduationCap, label: 'Education', value: 'B.Tech CS' },
  { icon: MapPin, label: 'Location', value: 'India' },
  { icon: Sparkles, label: 'Focus', value: 'Web & ML' },
];

export const AboutSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  return (
    <section 
      id="about" 
      ref={sectionRef}
      className="relative min-h-screen py-24 px-4 flex items-center"
    >
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-radial opacity-50 pointer-events-none" />

      <div className="max-w-6xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="text-primary text-sm font-semibold tracking-wider uppercase">About Me</span>
          <h2 className="text-4xl md:text-5xl font-bold font-display mt-4 mb-6">
            Building the <span className="text-gradient">Future</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Passionate about creating innovative solutions that bridge the gap between 
            cutting-edge technology and real-world applications.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left - Info Card */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="glass rounded-2xl p-8"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary via-secondary to-accent flex items-center justify-center text-3xl font-bold">
                SS
              </div>
              <div>
                <h3 className="text-2xl font-bold">Shreyash Shinde</h3>
                <p className="text-muted-foreground">Full-Stack Developer</p>
              </div>
            </div>
            
            <p className="text-muted-foreground leading-relaxed mb-6">
              I'm a passionate developer with expertise in building scalable web applications 
              and implementing machine learning solutions. I love turning complex problems 
              into elegant, user-friendly experiences.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              When I'm not coding, you'll find me exploring new technologies, 
              contributing to open-source projects, or sharing knowledge with the community.
            </p>
          </motion.div>

          {/* Right - Highlights Grid */}
          <div className="grid grid-cols-2 gap-4">
            {highlights.map((item, index) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                className="glass rounded-xl p-6 hover:glow-primary transition-all duration-300 group"
              >
                <item.icon className="w-8 h-8 text-primary mb-4 group-hover:scale-110 transition-transform" />
                <p className="text-sm text-muted-foreground">{item.label}</p>
                <p className="text-xl font-bold text-foreground">{item.value}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
