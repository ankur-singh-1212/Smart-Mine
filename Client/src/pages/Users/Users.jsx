import { useState } from "react";
import { users } from "../../data/demoData";
import StatusBadge from "../../components/common/StatusBadge";
import EmptyState from "../../components/common/EmptyState";
import { downloadCSV } from "../../utils/csvExport";
import Button from "../../components/common/Button";

const ROLE_COLORS = {
  Admin: "bg-[#004ac6]/10 text-[#004ac6] border border-[#004ac6]/20",
  Inspector: "bg-[#2563eb]/10 text-[#2563eb] border border-[#2563eb]/20",
  Officer: "bg-[#c2410c]/10 text-[#c2410c] border border-[#c2410c]/20",
  Verifier: "bg-[#006242]/10 text-[#006242] border border-[#006242]/20",
};

function Users() {
  const [query, setQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState("All");

  const filtered = users.filter(
    (user) =>
      (roleFilter === "All" || user.role === roleFilter) &&
      (user.name.toLowerCase().includes(query.toLowerCase()) ||
        user.email.toLowerCase().includes(query.toLowerCase()))
  );

  const exportUsers = () => {
    downloadCSV(
      "users.csv",
      ["Name", "Email", "Role", "Department", "Active"],
      filtered.map((u) => [u.name, u.email, u.role, u.department, u.isActive ? "Yes" : "No"])
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-semibold">Users</h2>
          <p className="text-sm mt-1 text-[#434655]">Manage platform roles and accounts.</p>
        </div>

        <div className="flex gap-3 w-full sm:w-auto">
          <div className="relative flex-1 sm:flex-none sm:w-64">
            <span
              className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#737686]"
              style={{ fontSize: "18px" }}
            >
              search
            </span>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search users..."
              className="w-full h-10 pl-10 pr-4 rounded-lg bg-white border border-[#c3c6d7] outline-none focus:border-[#2563eb]"
            />
          </div>
          <Button variant="secondary" onClick={exportUsers}>
            <span className="material-symbols-outlined" style={{ fontSize: "18px" }}>
              download
            </span>
            Export
          </Button>
        </div>
      </div>

      <div className="card p-4 flex flex-wrap gap-2 items-center">
        {["All", "Admin", "Inspector", "Officer", "Verifier"].map((role) => (
          <button
            key={role}
            onClick={() => setRoleFilter(role)}
            className={`h-9 px-3 rounded-lg text-sm font-medium transition ${
              roleFilter === role
                ? "bg-[#2563eb] text-white"
                : "bg-white border border-[#c3c6d7] hover:bg-[#f2f4f6]"
            }`}
          >
            {role}
          </button>
        ))}
      </div>

      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-[#f2f4f6] border-b border-[#c3c6d7]">
              <tr>
                {["Name", "Email", "Role", "Department", "Status"].map((item) => (
                  <th key={item} className="py-3 px-4 text-xs font-semibold uppercase whitespace-nowrap">
                    {item}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((user) => (
                <tr key={user.id} className="row-hover border-b border-[#c3c6d7]">
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <div className="h-9 w-9 rounded-full bg-[#2563eb] text-white flex items-center justify-center text-sm font-semibold">
                        {user.name.split(" ").map((p) => p[0]).join("").slice(0, 2).toUpperCase()}
                      </div>
                      <span className="font-medium">{user.name}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-[#434655]">{user.email}</td>
                  <td className="py-3 px-4">
                    <span className={`inline-flex px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${ROLE_COLORS[user.role] || ROLE_COLORS.Admin}`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="py-3 px-4">{user.department}</td>
                  <td className="py-3 px-4">
                    <StatusBadge value={user.isActive ? "Active" : "Inactive"} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filtered.length === 0 && <EmptyState icon="group_off" title="No users found" />}
      </div>
    </div>
  );
}

export default Users;