const AbilityBadge = ({
  ability,
  isHidden,
}: {
  ability: string;
  isHidden: boolean;
}) => (
  <span className="bg-gray-100 px-3 py-1 rounded text-gray-700 text-sm">
    {ability}
    {isHidden && <span className="text-gray-400 ml-1">(Hidden)</span>}
  </span>
);

export default AbilityBadge