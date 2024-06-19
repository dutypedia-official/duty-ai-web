import { ScaleLoader } from "react-spinners";

const LoadingScreen = () => {
  return (
    <div className="fixed inset-0 z-40 flex h-screen w-screen items-center justify-center bg-background">
      <ScaleLoader color="hsl(var(--brand))" />
    </div>
  );
};

export default LoadingScreen;
