// src/pages/Dashboard.jsx
import Layout from '../layouts/Layout';
import DashboardCards from '../components/DashboardCards';
import ExpensePieChart from '../components/Charts/ExpensePieChart';
import TransactionList from '../components/TransactionList';
import IncomeExpenseLineChart from '../components/Charts/IncomeExpenseLineChart';

export default function Dashboard() {
  return (
    <Layout>
      <DashboardCards />
      <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ExpensePieChart />
        <IncomeExpenseLineChart />
        <div className="lg:col-span-2">
          <TransactionList />
        </div>
      </div>
    </Layout>
  );
}
