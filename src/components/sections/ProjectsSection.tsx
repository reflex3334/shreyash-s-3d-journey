import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { ExternalLink, Github, ChevronRight, Building2, Users, Leaf } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { ProjectScene } from '@/components/3d/ProjectScene';

const projects = [
  {
    id: 1,
    title: 'Hospital Management System',
    problemStatement: 'Reducing patient waiting time and improving appointment handling in government hospitals.',
    description: 'A web-based hospital management portal designed to reduce patient waiting time and improve appointment handling in government hospitals. The system allows patients to book appointments online, receive tokens, and get real-time visit updates. It helps hospital staff manage appointments efficiently while improving the patient experience.',
    features: [
      'Online patient appointment booking',
      'Automatic token generation',
      'Real-time visit and queue notifications',
      'Secure login for users and hospital staff',
      'Responsive and user-friendly UI',
    ],
    tags: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'Tailwind CSS', 'JavaScript'],
    gradient: 'from-primary to-secondary',
    impact: 'Reduces overcrowding, improves appointment delays, and enhances operational efficiency in hospitals.',
    icon: Building2,
    github: null,
  },
  {
    id: 2,
    title: 'Hustler – Freelancing Platform',
    problemStatement: 'Connecting clients and freelancers through a transparent, skill-based marketplace.',
    description: 'Hustler is a skill-based freelancing marketplace where clients and freelancers can connect, post gigs, bid on tasks, and manage projects efficiently. The platform supports dual-role authentication and provides a smooth workflow from task posting to contract completion.',
    features: [
      'Dual login system (Client & Freelancer)',
      'Gig posting and bidding system',
      'Task bidding and freelancer selection',
      'Live project and task tracking',
      'Automated contract workflow',
    ],
    tags: ['React.js', 'Node.js', 'Express.js', 'MongoDB'],
    gradient: 'from-secondary to-accent',
    impact: 'Provides a structured and transparent freelancing workflow for both clients and freelancers.',
    icon: Users,
    github: 'https://github.com/ShreyashS19/Freelancing-project-Bidding-System.git',
  },
  {
    id: 3,
    title: 'Plant Disease Recognition System',
    problemStatement: 'Early detection of plant diseases using AI to support sustainable agriculture.',
    description: 'This project is a deep learning-based web application that detects plant diseases using leaf images. Users upload a leaf image, and the system predicts the disease using a pre-trained CNN model. The main goal is early disease detection to support better crop health and yield.',
    features: [
      'Image-based plant disease detection',
      'Pre-trained CNN model integration',
      'Fast and accurate predictions',
      'Clean and simple web interface',
      'Model loading and inference using TensorFlow',
    ],
    tags: ['Python', 'Flask', 'TensorFlow', 'Keras', 'HTML', 'CSS'],
    gradient: 'from-[#22c55e] to-primary',
    impact: 'Helps in early identification of plant diseases, reducing crop loss and supporting sustainable agriculture.',
    icon: Leaf,
    github: 'https://github.com/ShreyashS19/Plant-Disease-Recognition-System-main.git',
    internship: '1M1B Green Internship Program (Remote)',
  },
];

const TechBadge = ({ tech }: { tech: string }) => (
  <span className="px-2.5 py-1 text-xs font-medium rounded-full bg-muted/80 text-muted-foreground border border-border/50 transition-colors hover:bg-muted hover:text-foreground">
    {tech}
  </span>
);

const ProjectCard = ({ project, index, onSelect }: { 
  project: typeof projects[0]; 
  index: number;
  onSelect: () => void;
}) => {
  const Icon = project.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.15 }}
      onClick={onSelect}
      className="group relative glass rounded-2xl overflow-hidden cursor-pointer hover:border-primary/50 transition-all duration-300"
    >
      {/* 3D Scene */}
      <div className="relative h-48">
        <ProjectScene projectId={project.id} />
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent pointer-events-none" />
        {/* Project icon */}
        <div className={`absolute top-3 left-3 p-2 rounded-lg bg-gradient-to-br ${project.gradient} shadow-lg`}>
          <Icon className="w-4 h-4 text-white" />
        </div>
        {/* Internship badge */}
        {project.internship && (
          <span className="absolute top-3 right-3 px-2 py-1 text-[10px] font-semibold uppercase tracking-wider rounded-full bg-accent/90 text-accent-foreground">
            Internship
          </span>
        )}
      </div>

      <div className="p-5">
        <h3 className="text-lg font-bold mb-2 group-hover:text-gradient transition-all duration-300 line-clamp-1">
          {project.title}
        </h3>
        
        <p className="text-muted-foreground text-sm mb-4 line-clamp-2 leading-relaxed">
          {project.problemStatement}
        </p>

        {/* Tags - show first 3 */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.tags.slice(0, 3).map((tag) => (
            <TechBadge key={tag} tech={tag} />
          ))}
          {project.tags.length > 3 && (
            <span className="px-2 py-1 text-xs text-muted-foreground">
              +{project.tags.length - 3}
            </span>
          )}
        </div>

        {/* View more */}
        <div className="flex items-center gap-2 text-primary group-hover:gap-3 transition-all duration-300">
          <span className="text-sm font-semibold">View Details</span>
          <ChevronRight className="w-4 h-4" />
        </div>
      </div>

      {/* Hover glow effect */}
      <div className={`absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300 bg-gradient-to-br ${project.gradient} pointer-events-none`} />
    </motion.div>
  );
};

export const ProjectsSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative min-h-screen py-24 px-4"
    >
      {/* Background accent */}
      <div className="absolute top-1/3 right-0 w-[500px] h-[500px] bg-gradient-radial opacity-30 pointer-events-none" />

      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="text-accent text-sm font-semibold tracking-wider uppercase">
            Featured Work
          </span>
          <h2 className="text-4xl md:text-5xl font-bold font-display mt-4 mb-6">
            My <span className="text-gradient">Projects</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            A selection of projects showcasing real-world problem solving, full-stack development skills, and practical impact.
          </p>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              onSelect={() => setSelectedProject(project)}
            />
          ))}
        </div>
      </div>

      {/* Project Detail Modal */}
      <Dialog open={!!selectedProject} onOpenChange={() => setSelectedProject(null)}>
        <DialogContent className="glass border-border max-w-3xl max-h-[90vh] overflow-y-auto">
          {selectedProject && (
            <>
              {/* Expanded 3D Scene */}
              <div className="w-full h-64 md:h-80 rounded-xl overflow-hidden bg-background/50 mb-4">
                <ProjectScene projectId={selectedProject.id} />
              </div>
              
              <DialogHeader>
                <div className="flex items-center gap-3 mb-2">
                  <div className={`p-2 rounded-lg bg-gradient-to-br ${selectedProject.gradient}`}>
                    <selectedProject.icon className="w-5 h-5 text-white" />
                  </div>
                  {selectedProject.internship && (
                    <span className="px-2.5 py-1 text-xs font-semibold uppercase tracking-wider rounded-full bg-accent/90 text-accent-foreground">
                      Internship Project
                    </span>
                  )}
                </div>
                <DialogTitle className="text-2xl font-bold">
                  {selectedProject.title}
                </DialogTitle>
                {selectedProject.internship && (
                  <p className="text-sm text-muted-foreground mt-1">
                    {selectedProject.internship}
                  </p>
                )}
                <DialogDescription className="text-muted-foreground mt-3 leading-relaxed">
                  {selectedProject.description}
                </DialogDescription>
              </DialogHeader>

              {/* Key Features */}
              <div className="mt-6">
                <h4 className="text-sm font-semibold text-foreground mb-3 uppercase tracking-wider">
                  Key Features
                </h4>
                <ul className="space-y-2.5">
                  {selectedProject.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3 text-muted-foreground text-sm">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Impact */}
              <div className="mt-6 p-4 rounded-lg bg-muted/30 border border-border/50">
                <h4 className="text-sm font-semibold text-foreground mb-2 uppercase tracking-wider">
                  Impact / Outcome
                </h4>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {selectedProject.impact}
                </p>
              </div>

              {/* Tech Stack */}
              <div className="mt-6">
                <h4 className="text-sm font-semibold text-foreground mb-3 uppercase tracking-wider">
                  Tech Stack
                </h4>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.tags.map((tag) => (
                    <TechBadge key={tag} tech={tag} />
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              {selectedProject.github && (
                <div className="flex gap-4 mt-6 pt-4 border-t border-border/50">
                  <motion.a
                    href={selectedProject.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-5 py-2.5 rounded-full glass hover:bg-muted/50 text-foreground text-sm font-semibold transition-colors"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Github className="w-4 h-4" />
                    View Source Code
                  </motion.a>
                </div>
              )}
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default ProjectsSection;
