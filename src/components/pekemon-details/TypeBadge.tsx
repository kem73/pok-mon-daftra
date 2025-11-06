const TypeBadge = ({ type }: { type: string }) => (
  <span
    className="bg-gradient-to-r from-pink-500 to-purple-500 text-white px-3 py-1 rounded-full text-sm capitalize shadow-sm"
  >
    {type}
  </span>
);

export default TypeBadge