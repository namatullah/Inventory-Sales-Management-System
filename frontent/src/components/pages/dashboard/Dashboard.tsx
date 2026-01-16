import { useAuth } from "../../../context/AuthContext";

const Dashboard = () => {
  const { user } = useAuth();
  console.log(user);
  return <div>Dashboard</div>;
};

export default Dashboard;
