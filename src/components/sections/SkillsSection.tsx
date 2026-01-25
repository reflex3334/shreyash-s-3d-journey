import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import SkillsOrbitCanvas, { TechPlanet, techPlanets } from '../3d/SkillsOrbit';
import PlanetDetailPanel from './PlanetDetailPanel';
import { Rocket, Code2, Cpu, Database, Server, Layers } from 'lucide-react';

const categoryConfig = {
  frontend: { icon: Layers, label: 'Frontend', color: 'text-cyan-400' },
  backend: { icon: Server, label: 'Backend', color: 'text-green-400' },
  ml: { icon: Cpu, label: 'Machine Learning', color: 'text-orange-400' },
  database: { icon: Database, label: 'Database', color: 'text-blue-400' },
  devops: { icon: Rocket, label: 'DevOps', color: 'text-purple-400' },
};

export const SkillsSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });
  const [selectedPlanet, setSelectedPlanet] = useState<TechPlanet | null>(null);
  const [hoveredPlanet, setHoveredPlanet] = useState<TechPlanet | null>(null);

  // Group planets by category for mobile view
  const planetsByCategory = techPlanets.reduce((acc, planet) => {
    if (!acc[planet.category]) acc[planet.category] = [];
    acc[planet.category].push(planet);
    return acc;
  }, {} as Record<string, TechPlanet[]>);

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="relative min-h-screen py-16 px-4 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-4"
        >
          <span className="text-secondary text-sm font-semibold tracking-wider uppercase">
            Skills & Expertise
          </span>
          <h2 className="text-4xl md:text-5xl font-bold font-display mt-2 mb-3">
            My <span className="text-gradient">Tech Universe</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Explore the technologies that power my projects. Click any planet to discover
            real-world implementations, architecture decisions, and deployment outcomes.
          </p>
        </motion.div>

        {/* 3D Solar System - Desktop */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative hidden md:block"
        >
          <SkillsOrbitCanvas
            onPlanetSelect={setSelectedPlanet}
            onPlanetHover={setHoveredPlanet}
            selectedPlanet={selectedPlanet}
            hoveredPlanet={hoveredPlanet}
          />
          <PlanetDetailPanel planet={selectedPlanet} onClose={() => setSelectedPlanet(null)} />
        </motion.div>

        {/* Mobile Fallback - Grid View */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="md:hidden space-y-6"
        >
          {Object.entries(planetsByCategory).map(([category, planets], categoryIndex) => {
            const config = categoryConfig[category as keyof typeof categoryConfig];
            const Icon = config.icon;

            return (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.3 + categoryIndex * 0.1 }}
                className="glass rounded-xl p-4"
              >
                <div className={`flex items-center gap-2 mb-4 ${config.color}`}>
                  <Icon className="w-5 h-5" />
                  <h3 className="font-semibold">{config.label}</h3>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  {planets.map((planet) => (
                    <button
                      key={planet.name}
                      onClick={() => setSelectedPlanet(planet)}
                      className="flex items-center gap-3 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-all border border-white/5 text-left"
                    >
                      <div
                        className="w-8 h-8 rounded-full flex-shrink-0"
                        style={{
                          backgroundColor: planet.color,
                          boxShadow: `0 0 15px ${planet.color}50`,
                        }}
                      />
                      <div>
                        <span className="text-foreground text-sm font-medium block">
                          {planet.name}
                        </span>
                        {planet.hasLiveDeployment && (
                          <span className="text-[10px] text-success">Live Deployment</span>
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Mobile Detail Modal */}
        {selectedPlanet && (
          <div className="md:hidden fixed inset-0 z-50 flex items-end justify-center bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              className="w-full max-h-[80vh] overflow-y-auto bg-background rounded-t-3xl p-6"
            >
              <div className="w-12 h-1 bg-muted-foreground/30 rounded-full mx-auto mb-6" />
              
              <div className="flex items-center gap-3 mb-6">
                <div
                  className="w-10 h-10 rounded-full"
                  style={{
                    backgroundColor: selectedPlanet.color,
                    boxShadow: `0 0 20px ${selectedPlanet.color}`,
                  }}
                />
                <div>
                  <h3 className="text-xl font-bold text-foreground">{selectedPlanet.name}</h3>
                  <span className="text-sm text-muted-foreground">
                    {categoryConfig[selectedPlanet.category].label}
                  </span>
                </div>
                {selectedPlanet.hasLiveDeployment && (
                  <span className="ml-auto text-xs bg-success/20 text-success px-2 py-1 rounded-full">
                    Live Deployment
                  </span>
                )}
              </div>

              <div className="space-y-4">
                {selectedPlanet.projects.map((project, index) => (
                  <div key={index} className="bg-white/5 rounded-xl p-4">
                    <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                      <Code2 className="w-4 h-4 text-primary" />
                      {project.name}
                    </h4>

                    <div className="mb-3">
                      <span className="text-xs uppercase tracking-wider text-muted-foreground">
                        Implementation
                      </span>
                      <ul className="mt-2 space-y-1">
                        {project.implementation.map((item, i) => (
                          <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                            <span
                              className="w-1.5 h-1.5 rounded-full mt-1.5"
                              style={{ backgroundColor: selectedPlanet.color }}
                            />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg p-3">
                      <span className="text-xs uppercase tracking-wider text-primary">Outcome</span>
                      <p className="text-sm text-foreground mt-1">{project.outcome}</p>
                    </div>
                  </div>
                ))}
              </div>

              <button
                onClick={() => setSelectedPlanet(null)}
                className="w-full mt-6 py-3 bg-white/10 rounded-xl text-foreground font-medium"
              >
                Close
              </button>
            </motion.div>
          </div>
        )}

        {/* Legend */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="hidden md:flex justify-center gap-6 mt-8 flex-wrap"
        >
          {Object.entries(categoryConfig).map(([key, config]) => {
            const Icon = config.icon;
            return (
              <div key={key} className={`flex items-center gap-2 ${config.color}`}>
                <Icon className="w-4 h-4" />
                <span className="text-sm">{config.label}</span>
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default SkillsSection;
