import { Loader2 } from "lucide-react";

export const LoadingSpinner = ({ size = 12, text = "Loading..." }) => {
  return (
    <div className="flex flex-col items-center justify-center gap-2">
      <Loader2
        className={`h-${size} w-${size} text-emerald-500 animate-spin`}
      />
      {text && <p className="text-gray-300">{text}</p>}
    </div>
  );
};
