import { Suspense, lazy } from 'react';

const HospitalScene = lazy(() => import('./HospitalScene'));
const FreelancingScene = lazy(() => import('./FreelancingScene'));
const PlantDiseaseScene = lazy(() => import('./PlantDiseaseScene'));

const LoadingFallback = () => (
  <div className="w-full h-full flex items-center justify-center">
    <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
  </div>
);

interface ProjectSceneProps {
  projectId: number;
}

export const ProjectScene = ({ projectId }: ProjectSceneProps) => {
  return (
    <div className="w-full h-full rounded-lg overflow-hidden bg-background/50">
      <Suspense fallback={<LoadingFallback />}>
        {projectId === 1 && <HospitalScene />}
        {projectId === 2 && <FreelancingScene />}
        {projectId === 3 && <PlantDiseaseScene />}
      </Suspense>
    </div>
  );
};

export default ProjectScene;
