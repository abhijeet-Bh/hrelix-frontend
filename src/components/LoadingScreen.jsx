import { Spinner } from "@heroui/react";

function LoadingScreen() {
  return (
    <div className="absolute inset-0 bg-white/20 backdrop-blur-sm flex justify-center items-center rounded-xl">
      <Spinner
        color="danger"
        label="Loading, please wait ..."
        labelColor="danger"
        variant="wave"
        size="lg"
      />
    </div>
  );
}

export default LoadingScreen;
