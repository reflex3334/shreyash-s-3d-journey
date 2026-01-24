import { Suspense, lazy } from 'react';

const ServiceHubScene = lazy(() => import('./ServiceHubScene'));
const ChurnPredictionScene = lazy(() => import('./ChurnPredictionScene'));
const BankSimulatorScene = lazy(() => import('./BankSimulatorScene'));
const HospitalScene = lazy(() => import('./HospitalScene'));
const HustlerScene = lazy(() => import('./HustlerScene'));
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
    <div className="w-full h-48 rounded-lg overflow-hidden bg-background/50">
      <Suspense fallback={<LoadingFallback />}>
        {projectId === 1 && <ServiceHubScene />}
        {projectId === 2 && <ChurnPredictionScene />}
        {projectId === 3 && <BankSimulatorScene />}
        {projectId === 4 && <HospitalScene />}
        {projectId === 5 && <HustlerScene />}
        {projectId === 6 && <PlantDiseaseScene />}
      </Suspense>
    </div>
  );
};

export default ProjectScene;
