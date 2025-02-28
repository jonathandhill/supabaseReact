import { useEffect, useState } from 'react';
import { Chart } from 'react-charts';
import supabase from './supabase-client';
import React from 'react';

function Dashboard() {
  const [metrics, setMetrics] = useState([]);

  useEffect(() => {
    fetchMetrics();
  }, []);

  // const fetchMetrics = async () => {
  //   const { data, error } = await supabase.from('ProjectMetrics').select('*');
  //   if (error) console.error('Error fetching metrics:', error);
  //   else setMetrics(data);
  // };

  const fetchMetrics = async () => {
    const { data, error } = await supabase
      .from('ProjectMetrics')
      .select(`
        name,
        value.sum()
      `);
    if (error) {
      console.error('Error fetching metrics:', error);
    } else {
      setMetrics(data);
    }
  };

  // Map Supabase data to chart format (assumes each record has created_at and value)
  const chartData = [
    {
      label: 'Metrics',
      data: metrics.map((m) => ({
        primary: m.name,
        secondary: m.sum,
        // primary: new Date(m.created_at),
        // secondary: m.value,
      })),
    },
  ];

  // The axes configuration is required by react-charts
  // const primaryAxis = { getValue: (d) => d.primary, scaleType: 'time' };
  const primaryAxis = { getValue: (d) => d.primary, scaleType: 'band' };
  const secondaryAxes = [{ getValue: (d) => d.secondary, scaleType: 'linear', min: 0, max: 10000 }];

  return (
    <div>
      <h1>Project Dashboard</h1>
      <div className="chart-container">
        <h2>Total Sales This Quarter</h2>
        <Chart options={{ data: chartData, primaryAxis, secondaryAxes, type: 'bar' }} />
      </div>
    </div>
  );
}

export default Dashboard;
