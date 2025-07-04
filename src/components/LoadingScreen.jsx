import { Spinner } from "@heroui/react";

function LoadingScreen() {
  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <Spinner
        color="danger"
        label="Loding, please wait ..."
        labelColor="danger"
        variant="wave"
        size="lg"
      />
    </div>
  );
}

export default LoadingScreen;
