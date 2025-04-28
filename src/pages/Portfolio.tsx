
import React from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import PortfolioLink from '@/components/PortfolioLink';
import PortfolioComments from '@/components/PortfolioComments';

const Portfolio = () => {
  return (
    <DashboardLayout>
      <div className="container mx-auto py-8 space-y-6">
        <h1 className="text-2xl font-bold mb-6">Portfolio Management</h1>
        <PortfolioLink />
        <PortfolioComments />
      </div>
    </DashboardLayout>
  );
};

export default Portfolio;
