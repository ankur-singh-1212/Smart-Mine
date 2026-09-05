import { Link, useParams } from "react-router-dom";
import { loadInspections, issues } from "../../data/demoData";
import InspectionDetails from "../../components/inspections/InspectionDetails";
import EmptyState from "../../components/common/EmptyState";

function InspectionDetailsPage() {
  const { id } = useParams();
  const inspection = loadInspections().find((i) => i.id === id);
  const relatedIssues = issues.filter((i) => i.inspection === id);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Link to="/inspections" className="p-2 text-[#434655] hover:text-[#004ac6]" aria-label="Back">
          <span className="material-symbols-outlined">arrow_back</span>
        </Link>
        <div>
          <h2 className="text-2xl font-semibold">Inspection Details</h2>
          <p className="text-sm mt-1 text-[#434655]">
            {inspection ? inspection.id : "Not found"}
          </p>
        </div>
      </div>

      {inspection ? (
        <InspectionDetails inspection={inspection} relatedIssues={relatedIssues} />
      ) : (
        <div className="card">
          <EmptyState icon="search_off" title="Inspection not found" />
        </div>
      )}
    </div>
  );
}

export default InspectionDetailsPage;