import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import SkillsOrbitCanvas from '../3d/SkillsOrbit';

const skillCategories = [
  {
    title: 'Frontend',
    skills: ['React', 'TypeScript', 'Next.js', 'Tailwind CSS', 'Framer Motion'],
    color: 'primary',
  },
  {
    title: 'Backend',
    skills: ['Python', 'Node.js', 'PostgreSQL', 'REST APIs', 'GraphQL'],
    color: 'secondary',
  },
  {
    title: 'ML / AI',
    skills: ['TensorFlow', 'PyTorch', 'Scikit-learn', 'Data Analysis', 'NLP'],
    color: 'accent',
  },
  {
    title: 'Tools',
    skills: ['Git', 'Docker', 'AWS', 'Figma', 'VS Code'],
    color: 'primary',
  },
];

export const SkillsSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="relative min-h-screen py-24 px-4"
    >
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <span className="text-secondary text-sm font-semibold tracking-wider uppercase">
            Skills & Expertise
          </span>
          <h2 className="text-4xl md:text-5xl font-bold font-display mt-4 mb-6">
            My <span className="text-gradient">Tech Universe</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Explore the technologies I use to bring ideas to life. Hover over the orbiting 
            spheres to discover each skill.
          </p>
        </motion.div>

        {/* 3D Orbit */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <SkillsOrbitCanvas />
        </motion.div>

        {/* Skill Categories Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
          {skillCategories.map((category, index) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
              className="glass rounded-xl p-6 hover:glow-primary transition-all duration-300"
            >
              <h3 className={`text-lg font-bold mb-4 text-${category.color}`}>
                {category.title}
              </h3>
              <ul className="space-y-2">
                {category.skills.map((skill) => (
                  <li
                    key={skill}
                    className="text-muted-foreground text-sm flex items-center gap-2"
                  >
                    <span className={`w-1.5 h-1.5 rounded-full bg-${category.color}`} />
                    {skill}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
