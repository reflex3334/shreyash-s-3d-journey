import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Rocket, Code2, Layers, Database, Server, Cpu } from 'lucide-react';
import { TechPlanet } from '../3d/SkillsOrbit';
import { Button } from '../ui/button';

interface PlanetDetailPanelProps {
  planet: TechPlanet | null;
  onClose: () => void;
}

const categoryIcons: Record<string, React.ReactNode> = {
  frontend: <Layers className="w-4 h-4" />,
  backend: <Server className="w-4 h-4" />,
  ml: <Cpu className="w-4 h-4" />,
  database: <Database className="w-4 h-4" />,
  devops: <Rocket className="w-4 h-4" />,
};

const categoryLabels: Record<string, string> = {
  frontend: 'Frontend',
  backend: 'Backend',
  ml: 'Machine Learning',
  database: 'Database',
  devops: 'DevOps',
};

export const PlanetDetailPanel = ({ planet, onClose }: PlanetDetailPanelProps) => {
  const scrollToProjects = () => {
    onClose();
    setTimeout(() => {
      document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
    }, 300);
  };

  return (
    <AnimatePresence>
      {planet && (
        <motion.div
          initial={{ opacity: 0, x: 50, scale: 0.95 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={{ opacity: 0, x: 50, scale: 0.95 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="absolute right-4 top-1/2 -translate-y-1/2 w-full max-w-md z-10"
        >
          <div
            className="glass rounded-2xl p-6 border border-white/10 overflow-hidden"
            style={{
              boxShadow: `0 0 40px ${planet.color}30, 0 0 80px ${planet.color}15`,
            }}
          >
            {/* Header */}
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center gap-3">
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center"
                  style={{
                    backgroundColor: `${planet.color}20`,
                    boxShadow: `0 0 20px ${planet.color}40`,
                  }}
                >
                  <div
                    className="w-6 h-6 rounded-full"
                    style={{
                      backgroundColor: planet.color,
                      boxShadow: `0 0 10px ${planet.color}`,
                    }}
                  />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-foreground flex items-center gap-2">
                    {planet.name}
                    {planet.hasLiveDeployment && (
                      <span className="text-xs font-medium bg-success/20 text-success px-2 py-1 rounded-full flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" />
                        Live Deployment
                      </span>
                    )}
                  </h3>
                  <div className="flex items-center gap-2 text-muted-foreground text-sm mt-1">
                    {categoryIcons[planet.category]}
                    <span>{categoryLabels[planet.category]}</span>
                    {planet.isPrimary && (
                      <span className="text-xs bg-primary/20 text-primary px-2 py-0.5 rounded-full">
                        Primary Skill
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-full hover:bg-white/10 transition-colors"
              >
                <X className="w-5 h-5 text-muted-foreground" />
              </button>
            </div>

            {/* Projects */}
            <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
              {planet.projects.map((project, index) => (
                <motion.div
                  key={project.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white/5 rounded-xl p-4 border border-white/5"
                >
                  <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                    <Code2 className="w-4 h-4 text-primary" />
                    {project.name}
                  </h4>

                  {/* Implementation */}
                  <div className="mb-3">
                    <span className="text-xs uppercase tracking-wider text-muted-foreground font-medium">
                      Implementation
                    </span>
                    <ul className="mt-2 space-y-1.5">
                      {project.implementation.map((item, i) => (
                        <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                          <span
                            className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0"
                            style={{ backgroundColor: planet.color }}
                          />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Outcome */}
                  <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg p-3">
                    <span className="text-xs uppercase tracking-wider text-primary font-medium">
                      Outcome
                    </span>
                    <p className="text-sm text-foreground mt-1">{project.outcome}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="mt-6 pt-4 border-t border-white/10"
            >
              <Button
                onClick={scrollToProjects}
                className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90 text-white"
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                View Related Projects
              </Button>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PlanetDetailPanel;
