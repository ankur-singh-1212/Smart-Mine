import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import DashboardLayout from "./components/layout/DashboardLayout";

import Dashboard from "./pages/Dashboard/Dashboard";
import Inspections from "./pages/Inspections/Inspections";
import CreateInspection from "./pages/Inspections/CreateInspection";
import InspectionDetails from "./pages/Inspections/InspectionDetails";
import Issues from "./pages/Issues/Issues";
import IssueDetails from "./pages/Issues/IssueDetails";
import CorrectiveActions from "./pages/CorrectiveActions/CorrectiveActions";
import ActionDetails from "./pages/CorrectiveActions/ActionDetails";
import Mines from "./pages/Mines/Mines";
import MineDetails from "./pages/Mines/MineDetails";
import Reports from "./pages/Reports/Reports";
import Notifications from "./pages/Notifications/Notifications";
import Users from "./pages/Users/Users";
import Login from "./pages/Login/Login";

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route element={<DashboardLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="/inspections" element={<Inspections />} />
        <Route path="/inspections/new" element={<CreateInspection />} />
        <Route path="/inspections/:id" element={<InspectionDetails />} />
        <Route path="/issues" element={<Issues />} />
        <Route path="/issues/:issueId" element={<IssueDetails />} />
        <Route path="/actions" element={<CorrectiveActions />} />
        <Route path="/actions/:actionId" element={<ActionDetails />} />
        <Route path="/mines" element={<Mines />} />
        <Route path="/mines/:id" element={<MineDetails />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/users" element={<Users />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  </BrowserRouter>
);

export default App;