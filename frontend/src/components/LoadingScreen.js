import { BeatLoader } from "react-spinners";

function LoadingScreen() {
    return (
        <div className="min-h-screen w-full flex items-center justify-center">
        <BeatLoader color="white" />
        </div>
    );
}

export default LoadingScreen;
