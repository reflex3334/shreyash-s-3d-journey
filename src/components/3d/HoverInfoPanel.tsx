import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Settings, CheckCircle } from 'lucide-react';
import type { TechPlanet } from './SkillsOrbit';

interface HoverInfoPanelProps {
  planet: TechPlanet | null;
}

export const HoverInfoPanel = ({ planet }: HoverInfoPanelProps) => {
  return (
    <AnimatePresence>
      {planet && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className="absolute top-4 left-1/2 -translate-x-1/2 z-10 w-[90%] max-w-md pointer-events-none"
          style={{
            boxShadow: `0 0 30px ${planet.color}40`,
          }}
        >
          <div className="glass rounded-xl border border-white/10 overflow-hidden pointer-events-auto">
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-white/10">
              <div className="flex items-center gap-2">
                <span
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: planet.color, boxShadow: `0 0 10px ${planet.color}` }}
                />
                <span className="text-foreground font-bold text-lg">{planet.name}</span>
              </div>
              {planet.hasLiveDeployment && (
                <span className="text-xs bg-success/20 text-success px-2 py-1 rounded-full font-medium">
                  Live Deployment
                </span>
              )}
            </div>

            {/* Project Cards */}
            <div className="max-h-[280px] overflow-y-auto p-3 space-y-3">
              {planet.projects.map((project, index) => (
                <div
                  key={index}
                  className="bg-background/50 rounded-lg p-3 border border-white/5"
                >
                  {/* Project Name */}
                  <div className="flex items-center gap-2 mb-3">
                    <MapPin className="w-4 h-4 text-muted-foreground" />
                    <span className="text-foreground font-semibold text-sm">{project.name}</span>
                  </div>

                  {/* Implementation */}
                  <div className="mb-3">
                    <div className="flex items-center gap-1.5 mb-2">
                      <Settings className="w-3.5 h-3.5 text-accent" />
                      <span className="text-accent text-xs font-bold uppercase tracking-wide">
                        Implementation
                      </span>
                    </div>
                    <ul className="space-y-1 pl-1">
                      {project.implementation.map((item, i) => (
                        <li key={i} className="flex items-start gap-2 text-xs text-muted-foreground">
                          <span
                            className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0"
                            style={{ backgroundColor: planet.color }}
                          />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Outcome */}
                  <div className="bg-success/10 rounded-md p-2.5 border border-success/20">
                    <div className="flex items-center gap-1.5 mb-1">
                      <CheckCircle className="w-3.5 h-3.5 text-success" />
                      <span className="text-success text-xs font-bold uppercase tracking-wide">
                        Outcome
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {project.outcome}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default HoverInfoPanel;
