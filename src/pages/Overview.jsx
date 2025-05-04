import React from 'react';
import Layout from '../components/Layout';
import StatsCard from '../components/StatsCard';
import { overviewData } from '../Samples/overview';
import { User, UserCheck2 } from 'lucide-react';
import { SiSession } from 'react-icons/si';
import { MdOutlineFeedback } from 'react-icons/md';
import AreaChart from '../charts/MyAreaChart';
import MyPieChart from '../charts/MyPieChart';
import MyLineChart from '../charts/MyLineChart';
import MyBarChart from '../charts/MyBarChart';
import MyCardinalChart from '../charts/MyCardinalChart';

/**
 * Overview Page Component
 *
 * Renders the dashboard overview screen, including:
 * - Summary metric cards (users, sessions, feedback, MAUs)
 * - A suite of charts for user analytics
 * - Fully responsive layout with Tailwind CSS
 */

const Overview = () => {
  // Define custom colors for metric cards
  const metricColors = {
    users: { bg: 'bg-blue-100', text: 'text-blue-600' },
    sessions: { bg: 'bg-green-100', text: 'text-green-600' },
    feedback: { bg: 'bg-purple-100', text: 'text-purple-600' },
    monthlyUsers: { bg: 'bg-orange-100', text: 'text-orange-600' }
  };

  return (
    <Layout>
      {/* Container padding & max-width for large screens */}
      <div className="px-4 sm:px-6 md:px-8 lg:px-10 xl:px-14 2xl:px-20 py-6 max-w-screen-2xl mx-auto font-poppins ">

        {/* ================= Metrics Summary Grid ================= */}
        <div className="flex justify-center">
          <section
            className="grid grid-cols-1 sm:ml-0 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 xl:gap-8"
            aria-label="Key performance metrics"
          >
            {/* Total Users Card */}
            <StatsCard
              title="Total Users"
              value={overviewData.totalUsers}
              icon={
                <div className={`p-3 rounded-full ${metricColors.users.bg}`}>
                  <User className={`w-6 h-6 ${metricColors.users.text}`} />
                </div>
              }
              trend="positive"
              metricColor={metricColors.users}
            />

            {/* Active Sessions Card */}
            <StatsCard
              title="Active Sessions"
              value={overviewData.activeSessions}
              icon={
                <div className={`p-3 rounded-full ${metricColors.sessions.bg}`}>
                  <SiSession className={`w-6 h-6 ${metricColors.sessions.text}`} />
                </div>
              }
              trend="neutral"
              metricColor={metricColors.sessions}
            />

            {/* Feedback Score Card */}
            <StatsCard
              title="Feedback Score"
              value={overviewData.feedbackScore}
              icon={
                <div className={`p-3 rounded-full ${metricColors.feedback.bg}`}>
                  <MdOutlineFeedback className={`w-6 h-6 ${metricColors.feedback.text}`} />
                </div>
              }
              trend="positive"
              metricColor={metricColors.feedback}
            />

            {/* Monthly Active Users Card */}
            <StatsCard
              title="Monthly Active Users"
              value={overviewData.monthlyActiveUsers}
              icon={
                <div className={`p-3 rounded-full ${metricColors.monthlyUsers.bg}`}>
                  <UserCheck2 className={`w-6 h-6 ${metricColors.monthlyUsers.text}`} />
                </div>
              }
              trend="negative"
              metricColor={metricColors.monthlyUsers}
            />
          </section>
        </div>

        {/* ================= Charts Section ================= */}
        <section className="mt-10 bg-white rounded-xl border-gray-100">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4 p-3">
            User Activity Overview
          </h2>

          {/* ------- Row 1: Area Chart & Pie Chart ------- */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="h-72 sm:h-80 md:h-96 w-full">
              <AreaChart />
            </div>
            <div className="h-72 sm:h-80 md:h-96 w-full">
              <MyPieChart />
            </div>
          </div>

          {/* ------- Row 2: Line Chart & Bar Chart ------- */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            <div className="h-72 sm:h-80 md:h-96 w-full">
              <MyLineChart />
            </div>
            <div className="h-72 sm:h-80 md:h-96 w-full">
              <MyBarChart />
            </div>
          </div>

          {/* ------- Row 3: Cardinal Spline Chart ------- */}
          <div className="h-72 sm:h-80 md:h-96 w-full mt-8">
            <MyCardinalChart />
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default Overview;
