import { Heart } from "lucide-react";
import { Link } from "react-router-dom";

function EmptyState({ title, description, icon, actionText, actionLink }) {
  const getIcon = () => {
    switch (icon) {
      case "heart":
        return <Heart className="w-12 h-12 text-pink-500 mb-4" />;
      // Add more icons as needed
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      {getIcon()}
      <h2 className="text-2xl font-bold text-white mb-2">{title}</h2>
      <p className="text-gray-400 max-w-md mb-6">{description}</p>
      {actionText && actionLink && (
        <Link
          to={actionLink}
          className="px-6 py-2 bg-emerald-600 hover:bg-emerald-700 rounded-lg text-white font-medium transition-colors"
        >
          {actionText}
        </Link>
      )}
    </div>
  );
}

export default EmptyState;
