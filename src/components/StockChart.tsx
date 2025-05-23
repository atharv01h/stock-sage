import React, { useEffect, useRef } from 'react';

interface DataPoint {
  date: string;
  price: number;
}

interface StockChartProps {
  data: DataPoint[];
}

const StockChart: React.FC<StockChartProps> = ({ data }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Ensure responsive canvas
    const resizeCanvas = () => {
      const container = canvas.parentElement;
      if (!container) return;
      
      canvas.width = container.clientWidth;
      canvas.height = 200;
      drawChart();
    };

    const drawChart = () => {
      if (!ctx) return;
      
      // Find min and max values for scaling
      const prices = data.map(d => d.price);
      const minPrice = Math.min(...prices) * 0.98; // Add some padding
      const maxPrice = Math.max(...prices) * 1.02;
      const priceRange = maxPrice - minPrice;

      // Chart dimensions
      const width = canvas.width;
      const height = canvas.height;
      const padding = { left: 40, right: 20, top: 20, bottom: 30 };
      const chartWidth = width - padding.left - padding.right;
      const chartHeight = height - padding.top - padding.bottom;

      // Draw grid lines
      ctx.strokeStyle = 'rgba(75, 85, 99, 0.3)';
      ctx.lineWidth = 0.5;

      // Horizontal grid lines
      const numHLines = 5;
      for (let i = 0; i <= numHLines; i++) {
        const y = padding.top + (i / numHLines) * chartHeight;
        ctx.beginPath();
        ctx.moveTo(padding.left, y);
        ctx.lineTo(width - padding.right, y);
        ctx.stroke();

        // Price labels
        const price = maxPrice - (i / numHLines) * priceRange;
        ctx.fillStyle = '#9CA3AF';
        ctx.font = '10px Inter, sans-serif';
        ctx.textAlign = 'right';
        ctx.fillText(`$${price.toFixed(2)}`, padding.left - 5, y + 4);
      }

      // Plot data points
      const xStep = chartWidth / (data.length - 1);
      
      // Draw line
      ctx.beginPath();
      ctx.strokeStyle = '#6366F1';
      ctx.lineWidth = 2;

      // Draw area gradient
      const gradient = ctx.createLinearGradient(0, padding.top, 0, height - padding.bottom);
      gradient.addColorStop(0, 'rgba(99, 102, 241, 0.3)');
      gradient.addColorStop(1, 'rgba(99, 102, 241, 0)');

      data.forEach((point, i) => {
        const x = padding.left + i * xStep;
        const y = padding.top + chartHeight - ((point.price - minPrice) / priceRange) * chartHeight;

        if (i === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      });
      ctx.stroke();

      // Draw area under line
      ctx.lineTo(padding.left + (data.length - 1) * xStep, height - padding.bottom);
      ctx.lineTo(padding.left, height - padding.bottom);
      ctx.closePath();
      ctx.fillStyle = gradient;
      ctx.fill();

      // Date labels
      ctx.fillStyle = '#9CA3AF';
      ctx.font = '10px Inter, sans-serif';
      ctx.textAlign = 'center';
      
      // Only show a subset of dates for readability
      const labelInterval = Math.ceil(data.length / 5);
      for (let i = 0; i < data.length; i += labelInterval) {
        const x = padding.left + i * xStep;
        ctx.fillText(data[i].date, x, height - padding.bottom + 15);
      }

      // Draw data points
      ctx.fillStyle = '#fff';
      ctx.strokeStyle = '#6366F1';
      ctx.lineWidth = 2;
      
      // Only show a few points for clarity
      const pointInterval = Math.ceil(data.length / 8);
      for (let i = 0; i < data.length; i += pointInterval) {
        const x = padding.left + i * xStep;
        const y = padding.top + chartHeight - ((data[i].price - minPrice) / priceRange) * chartHeight;
        
        ctx.beginPath();
        ctx.arc(x, y, 4, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
      }
    };

    // Initial draw and setup resize handler
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Animation
    let startTime: number | null = null;
    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      
      if (progress < 1000) {
        // Redraw with animation
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        const animatedData = data.slice(0, Math.ceil((progress / 1000) * data.length));
        
        // Find min and max for current data
        const prices = animatedData.map(d => d.price);
        const minPrice = Math.min(...prices) * 0.98;
        const maxPrice = Math.max(...prices) * 1.02;
        
        // Draw with current data
        drawChart();
        requestAnimationFrame(animate);
      } else {
        drawChart();
      }
    };
    
    requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [data]);

  return (
    <div className="w-full h-[200px] relative">
      <canvas
        ref={canvasRef}
        className="w-full h-full"
      />
    </div>
  );
};

export default StockChart;