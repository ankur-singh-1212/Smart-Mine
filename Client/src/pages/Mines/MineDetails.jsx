import { Link, useParams } from "react-router-dom";
import { mines, loadInspections, issues } from "../../data/demoData";
import MineDetails from "../../components/mines/MineDetails";
import EmptyState from "../../components/common/EmptyState";

function MineDetailsPage() {
  const { id } = useParams();
  const mine = mines.find((m) => m.id === id);
  const mineInspections = loadInspections().filter((i) => i.mine === mine?.name);
  const mineIssues = issues.filter((i) => i.mine === mine?.name && i.status !== "Verified");

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Link to="/mines" className="p-2 text-[#434655] hover:text-[#004ac6]" aria-label="Back">
          <span className="material-symbols-outlined">arrow_back</span>
        </Link>
        <div>
          <h2 className="text-2xl font-semibold">Mine Details</h2>
          <p className="text-sm mt-1 text-[#434655]">{mine ? mine.name : "Not found"}</p>
        </div>
      </div>

      {mine ? (
        <MineDetails mine={mine} inspections={mineInspections} issues={mineIssues} />
      ) : (
        <div className="card">
          <EmptyState icon="search_off" title="Mine not found" />
        </div>
      )}
    </div>
  );
}

export default MineDetailsPage;