import { useIndianResident } from "../../../context/ResidentCon";
import Card from "../../components/Card"
const SummaryPage = () => {
  //const { selectedOption } = useIndianResident();
    const { selectedOption } = useIndianResident();
  return (
    <Card className="py-10">
    <div className="px-4">
      <p className="text-lg font-semibold">
        Indian Resident: <span className="text-gray-700">{selectedOption}</span>
      </p>
    </div>
    </Card>
  );
};

export default SummaryPage;
