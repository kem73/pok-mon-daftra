const InfoCard = ({ label, value }: { label: string; value: string }) => (
  <div className="bg-gray-50 rounded-md p-2 w-28 text-center">
    <p className="text-xs text-gray-500">{label}</p>
    <p className="text-base font-semibold">{value}</p>
  </div>
);

export default InfoCard