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
    showLinks: true,
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
    showLinks: true,
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
    showLinks: true,
  },
  {
    id: 4,
    title: 'Hospital Management System',
    description: 'Reducing patient waiting time and improving appointment handling in government hospitals.',
    longDescription: 'A web-based hospital management portal designed to reduce patient waiting time and improve appointment handling in government hospitals. The system allows patients to book appointments online, receive tokens, and get real-time visit updates. It helps hospital staff manage appointments efficiently while improving the patient experience.',
    tags: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'Tailwind CSS'],
    gradient: 'from-primary to-accent',
    features: [
      'Online patient appointment booking',
      'Automatic token generation',
      'Real-time visit and queue notifications',
      'Secure login for users and hospital staff',
      'Responsive and user-friendly UI'
    ],
    impact: 'Reduces overcrowding, improves appointment delays, and enhances operational efficiency in hospitals.',
    showLinks: false,
  },
  {
    id: 5,
    title: 'Hustler – Freelancing Platform',
    description: 'A skill-based freelancing marketplace for clients and freelancers to connect and collaborate.',
    longDescription: 'Hustler is a skill-based freelancing marketplace where clients and freelancers can connect, post gigs, bid on tasks, and manage projects efficiently. The platform supports dual-role authentication and provides a smooth workflow from task posting to contract completion.',
    tags: ['React.js', 'Node.js', 'Express.js', 'MongoDB'],
    gradient: 'from-secondary to-primary',
    features: [
      'Dual login system (Client & Freelancer)',
      'Gig posting and bidding system',
      'Task bidding and freelancer selection',
      'Live project and task tracking',
      'Automated contract workflow'
    ],
    impact: 'Provides a structured and transparent freelancing workflow for both clients and freelancers.',
    github: 'https://github.com/ShreyashS19/Freelancing-project-Bidding-System.git',
    showLinks: true,
  },
  {
    id: 6,
    title: 'Plant Disease Recognition System',
    description: 'Deep learning-based web application for early plant disease detection using leaf images.',
    longDescription: 'This project is a deep learning-based web application that detects plant diseases using leaf images. Users upload a leaf image, and the system predicts the disease using a pre-trained CNN model. The main goal is early disease detection to support better crop health and yield. Developed during the 1M1B Green Internship Program.',
    tags: ['Python', 'Flask', 'TensorFlow', 'Keras', 'HTML', 'CSS'],
    gradient: 'from-accent to-secondary',
    features: [
      'Image-based plant disease detection',
      'Pre-trained CNN model integration',
      'Fast and accurate predictions',
      'Clean and simple web interface',
      'Model loading and inference using TensorFlow'
    ],
    impact: 'Helps in early identification of plant diseases, reducing crop loss and supporting sustainable agriculture.',
    github: 'https://github.com/ShreyashS19/Plant-Disease-Recognition-System-main.git',
    internship: '1M1B Green Internship Program (Remote)',
    showLinks: true,
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
      transition={{ duration: 0.5, delay: index * 0.1 }}
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
          {project.tags.slice(0, 4).map((tag) => (
            <span
              key={tag}
              className="px-2 py-1 text-xs rounded-full bg-muted text-muted-foreground"
            >
              {tag}
            </span>
          ))}
          {project.tags.length > 4 && (
            <span className="px-2 py-1 text-xs rounded-full bg-muted text-muted-foreground">
              +{project.tags.length - 4}
            </span>
          )}
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
        <DialogContent className="glass border-border max-w-3xl max-h-[90vh] overflow-y-auto">
          {selectedProject && (
            <>
              {/* Expanded 3D Scene */}
              <div className="w-full h-64 md:h-80 rounded-xl overflow-hidden bg-background/50 mb-4">
                <ProjectScene projectId={selectedProject.id} />
              </div>
              
              <DialogHeader>
                <div className="flex items-center gap-3 mb-2">
                  <div className={`h-2 w-20 rounded-full bg-gradient-to-r ${selectedProject.gradient}`} />
                  {selectedProject.internship && (
                    <span className="px-2 py-1 text-xs rounded-full bg-accent/20 text-accent">
                      Internship Project
                    </span>
                  )}
                </div>
                <DialogTitle className="text-2xl font-bold">
                  {selectedProject.title}
                </DialogTitle>
                <DialogDescription className="text-muted-foreground text-base leading-relaxed">
                  {selectedProject.longDescription}
                </DialogDescription>
              </DialogHeader>

              {selectedProject.internship && (
                <div className="mt-4 p-3 rounded-lg bg-accent/10 border border-accent/20">
                  <p className="text-sm text-accent font-medium">
                    {selectedProject.internship}
                  </p>
                </div>
              )}

              <div className="mt-6">
                <h4 className="text-sm font-semibold text-foreground mb-3">Key Features</h4>
                <ul className="space-y-2">
                  {selectedProject.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2 text-muted-foreground text-sm">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              {selectedProject.impact && (
                <div className="mt-6">
                  <h4 className="text-sm font-semibold text-foreground mb-2">Impact & Outcome</h4>
                  <p className="text-muted-foreground text-sm">
                    {selectedProject.impact}
                  </p>
                </div>
              )}

              <div className="mt-6">
                <h4 className="text-sm font-semibold text-foreground mb-3">Tech Stack</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 text-xs rounded-full bg-muted text-muted-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {selectedProject.showLinks && selectedProject.github && (
                <div className="flex gap-4 mt-6">
                  <motion.a
                    href={selectedProject.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 rounded-full glass text-foreground text-sm font-semibold hover:bg-muted transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Github className="w-4 h-4" />
                    View on GitHub
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
