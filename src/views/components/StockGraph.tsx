import React from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { Line } from 'react-chartjs-2';

// Register required Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const StockGraph: React.FC<{ stockData: { [key: string]: number[] } }> = ({ stockData }) => {
  // Generate labels for the x-axis
  const labels = Array.from({ length: 10 }, (_, i) => i.toString());

  // Create datasets dynamically from the stockData prop
  const datasets = Object.keys(stockData).map((stock) => ({
    label: stock,
    data: stockData[stock],
    fill: false,
    borderColor: 'blue',
    tension: 0.4, // Smooth the line
  }));

  // Chart data configuration
  const data = {
    labels,
    datasets,
  };

  // Chart options configuration
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Stock Price Trends',
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Time',
        },
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Price',
        },
      },
    },
  };

  return <Line data={data} options={options} />;
};

export default StockGraph;

