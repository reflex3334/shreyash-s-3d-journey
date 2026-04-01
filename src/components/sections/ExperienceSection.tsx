import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Briefcase, Calendar, MapPin } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const experiences = [
  {
    role: 'Intern — Bank Simulator Project',
    company: 'Infosys Springboard Internship 6.0',
    duration: 'Aug 2025 – Oct 2025',
    location: 'Remote',
    bullets: [
      'Built a full-stack banking management system using Java (Jersey Framework, MySQL) and React',
      'Implemented real-time email notifications, authentication, and validation-driven RESTful APIs',
      'Developed an admin dashboard for managing users, accounts, and transactions',
      'Ensured reliability with JUnit & Mockito testing; responsive UI with Tailwind CSS',
    ],
    tech: ['Java', 'React', 'MySQL', 'Maven', 'JUnit', 'Mockito', 'Tailwind CSS'],
  },
  {
    role: 'Intern — Plant Disease Recognition System',
    company: '1M1B Green Internship Program',
    duration: 'Jul 2025 – Aug 2025',
    location: 'Remote',
    bullets: [
      'Built a Flask-based deep learning web app to detect plant diseases from leaf images using a pre-trained CNN model',
      'Designed a clean frontend and integrated model loading and prediction using TensorFlow/Keras',
      'Helped farmers identify diseases early, supporting better crop yield',
    ],
    tech: ['Python', 'Flask', 'TensorFlow', 'HTML', 'CSS'],
  },
];

const ExperienceSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="experience" className="px-4 relative py-[100px]" ref={ref}>
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />

      <div className="max-w-4xl mx-auto relative">
        {/* Section heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold font-display mb-4">
            <span className="text-gradient">Experience</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Professional experience building real-world applications
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-6 md:left-8 top-0 bottom-0 w-px bg-gradient-to-b from-primary/60 via-primary/30 to-transparent" />

          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + index * 0.15 }}
              className="relative pl-16 md:pl-20 mb-12"
            >
              {/* Timeline dot */}
              <div className="absolute left-4 md:left-6 top-2 w-4 h-4 rounded-full bg-primary shadow-lg shadow-primary/40 ring-4 ring-background" />

              {/* Card */}
              <div className="glass rounded-2xl p-6 md:p-8 border-l-4 border-primary/60">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3 mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-foreground flex items-center gap-2">
                      <Briefcase className="w-5 h-5 text-primary" />
                      {exp.role}
                    </h3>
                    <p className="text-primary font-semibold mt-1">{exp.company}</p>
                  </div>
                  <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground shrink-0">
                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">
                      <Calendar className="w-3 h-3" />
                      {exp.duration}
                    </span>
                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-muted text-muted-foreground text-xs font-medium">
                      <MapPin className="w-3 h-3" />
                      {exp.location}
                    </span>
                  </div>
                </div>

                {/* Bullets */}
                <ul className="space-y-2 mb-5">
                  {exp.bullets.map((bullet, i) => (
                    <li key={i} className="text-muted-foreground text-sm flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary/60 mt-1.5 shrink-0" />
                      {bullet}
                    </li>
                  ))}
                </ul>

                {/* Tech tags */}
                <div className="flex flex-wrap gap-2">
                  {exp.tech.map((t) => (
                    <Badge key={t} variant="secondary" className="text-xs bg-secondary/50">
                      {t}
                    </Badge>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
