// components/PageLoader.jsx
import { Loader } from "lucide-react";

function PageLoader() {
  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-80">
      <Loader className="w-10 h-10 animate-spin text-white" />
    </div>
  );
}

export default PageLoader;
