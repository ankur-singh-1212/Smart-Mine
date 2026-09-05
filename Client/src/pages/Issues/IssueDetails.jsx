import { Link, useParams } from "react-router-dom";
import { issues } from "../../data/demoData";
import IssueDetails from "../../components/issues/IssueDetails";
import EmptyState from "../../components/common/EmptyState";

function IssueDetailsPage() {
  const { issueId } = useParams();
  const issue = issues.find((i) => i.issueId === issueId);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Link to="/issues" className="p-2 text-[#434655] hover:text-[#004ac6]" aria-label="Back">
          <span className="material-symbols-outlined">arrow_back</span>
        </Link>
        <div>
          <h2 className="text-2xl font-semibold">Issue Details</h2>
          <p className="text-sm mt-1 text-[#434655]">
            {issue ? issue.issueId : "Not found"}
          </p>
        </div>
      </div>

      {issue ? (
        <IssueDetails issue={issue} />
      ) : (
        <div className="card">
          <EmptyState icon="search_off" title="Issue not found" />
        </div>
      )}
    </div>
  );
}

export default IssueDetailsPage;