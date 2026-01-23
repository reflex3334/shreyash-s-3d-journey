import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { ExternalLink, Github, ChevronRight } from 'lucide-react';
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
    title: 'Smart Service Hub',
    description: 'A comprehensive platform connecting local service providers with customers.',
    longDescription: 'Built a full-stack application featuring role-based dashboards, real-time booking system, and integrated payment processing. Implemented responsive design and optimized for mobile-first experience.',
    tags: ['React', 'Node.js', 'PostgreSQL', 'Stripe'],
    gradient: 'from-primary to-secondary',
    features: ['Role-based access control', 'Real-time notifications', 'Payment integration', 'Analytics dashboard'],
    link: '#',
    github: '#',
  },
  {
    id: 2,
    title: 'Customer Churn Prediction',
    description: 'ML-powered system to predict and prevent customer churn.',
    longDescription: 'Developed a machine learning pipeline that analyzes customer behavior patterns to predict churn probability. Achieved 92% accuracy using ensemble methods and deployed via REST API.',
    tags: ['Python', 'TensorFlow', 'FastAPI', 'Docker'],
    gradient: 'from-secondary to-accent',
    features: ['Data preprocessing pipeline', 'Model training & evaluation', 'REST API deployment', 'Interactive dashboard'],
    link: '#',
    github: '#',
  },
  {
    id: 3,
    title: 'Bank Simulator',
    description: 'Internship project simulating core banking operations.',
    longDescription: 'Created a banking simulation system with features like account management, transactions, and automated email notifications. Built comprehensive REST APIs with thorough testing coverage.',
    tags: ['Java', 'Spring Boot', 'MySQL', 'JUnit'],
    gradient: 'from-accent to-primary',
    features: ['Account management', 'Transaction processing', 'Email automation', 'Unit & integration tests'],
    link: '#',
    github: '#',
  },
];

const ProjectCard = ({ project, index, onSelect }: { 
  project: typeof projects[0]; 
  index: number;
  onSelect: () => void;
}) => {
  const cardRef = useRef<HTMLDivElement>(null);

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.2 }}
      onClick={onSelect}
      className="group relative glass rounded-2xl overflow-hidden cursor-pointer"
    >
      {/* 3D Scene */}
      <div className="relative">
        <ProjectScene projectId={project.id} />
        {/* Project number overlay */}
        <span className="absolute top-2 right-3 text-4xl font-bold text-foreground/20">
          0{project.id}
        </span>
      </div>

      <div className="p-6">
        <h3 className="text-xl font-bold mb-2 group-hover:text-gradient transition-all duration-300">
          {project.title}
        </h3>
        
        <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
          {project.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="px-2 py-1 text-xs rounded-full bg-muted text-muted-foreground"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* View more */}
        <div className="flex items-center gap-2 text-primary group-hover:gap-4 transition-all duration-300">
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
            A selection of projects that showcase my skills and passion for building 
            impactful solutions.
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
        <DialogContent className="glass border-border max-w-2xl">
          {selectedProject && (
            <>
              <DialogHeader>
                <div className={`h-2 w-20 rounded-full bg-gradient-to-r ${selectedProject.gradient} mb-4`} />
                <DialogTitle className="text-2xl font-bold">
                  {selectedProject.title}
                </DialogTitle>
                <DialogDescription className="text-muted-foreground">
                  {selectedProject.longDescription}
                </DialogDescription>
              </DialogHeader>

              <div className="mt-6">
                <h4 className="text-sm font-semibold text-foreground mb-3">Key Features</h4>
                <ul className="space-y-2">
                  {selectedProject.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-muted-foreground text-sm">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex flex-wrap gap-2 mt-6">
                {selectedProject.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 text-xs rounded-full bg-muted text-muted-foreground"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex gap-4 mt-6">
                <motion.a
                  href={selectedProject.link}
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-primary text-primary-foreground text-sm font-semibold"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <ExternalLink className="w-4 h-4" />
                  Live Demo
                </motion.a>
                <motion.a
                  href={selectedProject.github}
                  className="flex items-center gap-2 px-4 py-2 rounded-full glass text-foreground text-sm font-semibold"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Github className="w-4 h-4" />
                  Source Code
                </motion.a>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default ProjectsSection;
