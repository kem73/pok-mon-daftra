import { memo } from "react";

const Loader: React.FC<{ size?: number; color?: string }> = memo(
  ({ size = 48, color = "border-yellow-400" }) => {
    return (
      <div
        className="flex justify-center items-center py-10"
        role="status"
        aria-label="Loading content"
      >
        <div
          className={`rounded-full border-4 ${color} border-t-transparent animate-spin`}
          style={{
            width: `${size}px`,
            height: `${size}px`,
          }}
        />
      </div>
    );
  }
);

Loader.displayName = "Loader";
export default Loader;
