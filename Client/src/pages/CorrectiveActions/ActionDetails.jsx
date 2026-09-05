import { Link, useParams } from "react-router-dom";
import { actions } from "../../data/demoData";
import ActionDetails from "../../components/correctiveActions/ActionDetails";
import EmptyState from "../../components/common/EmptyState";

function ActionDetailsPage() {
  const { actionId } = useParams();
  const action = actions.find((a) => a.actionId === actionId);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Link to="/actions" className="p-2 text-[#434655] hover:text-[#004ac6]" aria-label="Back">
          <span className="material-symbols-outlined">arrow_back</span>
        </Link>
        <div>
          <h2 className="text-2xl font-semibold">Corrective Action Details</h2>
          <p className="text-sm mt-1 text-[#434655]">
            {action ? action.actionId : "Not found"}
          </p>
        </div>
      </div>

      {action ? (
        <ActionDetails action={action} />
      ) : (
        <div className="card">
          <EmptyState icon="search_off" title="Action not found" />
        </div>
      )}
    </div>
  );
}

export default ActionDetailsPage;