/**
 * Overview Page Component
 *
 * A responsive overview page showcasing key metrics and user activity insights.
 * Displays cards with metrics and various charts representing user statistics.
 *
 * Features:
 * - Metrics for total users, active sessions, feedback score, and monthly active users.
 * - Charts for visualizing user activity (Area Chart, Pie Chart, Line Chart, etc.).
 * - Fully responsive layout for both mobile and desktop views.
 * - Theme-aware (light/dark mode support) based on the user's preference.
 *
 * @component
 * @returns {JSX.Element} The Overview page component
 */

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
import { useDarkMode } from '../context/DarkModeContext';

const Overview = () => {
  // Retrieve the dark mode preference from the DarkModeContext
  const { darkMode } = useDarkMode();

  // Define metric color variations for light and dark modes
  const metricColors = {
    users: { 
      bg: 'bg-blue-100 dark:bg-blue-900/50',
      text: 'text-blue-600 dark:text-blue-300'
    },
    sessions: { 
      bg: 'bg-green-100 dark:bg-green-900/50',
      text: 'text-green-600 dark:text-green-300'
    },
    feedback: { 
      bg: 'bg-purple-100 dark:bg-purple-900/50',
      text: 'text-purple-600 dark:text-purple-300'
    },
    monthlyUsers: { 
      bg: 'bg-orange-100 dark:bg-orange-900/50',
      text: 'text-orange-600 dark:text-orange-300'
    }
  };

  return (
    <Layout>
      {/* Main container for the Overview page, with theme-aware background */}
      <div className={`px-4 sm:px-6 md:px-8 lg:px-10 xl:px-14 2xl:px-20 py-6 max-w-screen-2xl mx-auto font-poppins ${
        darkMode ? 'bg-gray-900' : 'bg-gray-50'
      } min-h-screen transition-colors duration-300`}>

        {/* Metrics Grid - Displays key metrics about the application */}
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

        {/* Charts Section */}
        <section className={`mt-10 rounded-xl border ${
          darkMode 
            ? 'bg-gray-800 border-gray-700' 
            : 'bg-white border-gray-200'
        } transition-colors duration-300`}>
          
          {/* Section header for user activity overview */}
          <h2 className={`text-lg sm:text-xl font-semibold ${
            darkMode ? 'text-gray-200' : 'text-gray-800'
          } mb-4 p-3`}>
            User Activity Overview
          </h2>

          {/* Charts Grid - Displaying various charts in a grid layout */}
          <div className="space-y-8 p-3">
            {/* Row of two charts (AreaChart and PieChart) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="h-72 sm:h-80 md:h-96">
                <AreaChart darkMode={darkMode} />
              </div>
              <div className="h-72 sm:h-80 md:h-96">
                <MyPieChart darkMode={darkMode} />
              </div>
            </div>

            {/* Row of two charts (LineChart and BarChart) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="h-72 sm:h-80 md:h-96">
                <MyLineChart darkMode={darkMode} />
              </div>
              <div className="h-72 sm:h-80 md:h-96">
                <MyBarChart darkMode={darkMode} />
              </div>
            </div>

            {/* A single large chart (CardinalChart) */}
            <div className="h-72 sm:h-80 md:h-96">
              <MyCardinalChart darkMode={darkMode} />
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default Overview;
