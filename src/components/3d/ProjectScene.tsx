import { Suspense, lazy } from 'react';

const ServiceHubScene = lazy(() => import('./ServiceHubScene'));
const ChurnPredictionScene = lazy(() => import('./ChurnPredictionScene'));
const BankSimulatorScene = lazy(() => import('./BankSimulatorScene'));

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
      </Suspense>
    </div>
  );
};

export default ProjectScene;
