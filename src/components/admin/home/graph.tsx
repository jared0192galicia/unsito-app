'use client';
import api from '@/services/magicFetch';
import React, { useState, useEffect } from 'react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts';

export default function LineGraph() {
  const [selectedPeriod, setSelectedPeriod] = useState('7 Días');
  const [visitsFiltered, setVisitsFiltered] = useState<any[]>([]);
  const [visits, setVisits] = useState<any[]>([]);

  const periods = ['7 Días', '30 Días', '3 Meses', '6 Meses', '1 Año'];

  
  useEffect(() => {
    if (visits.length > 0) filterData();
  }, [selectedPeriod, visits]);

  useEffect(() => {
    fetchData();
    const generateTestData = () => {
      const data = [];
      const now = new Date();

      for (let i = 0; i < 180; i++) {
        const d = new Date();
        d.setDate(now.getDate() - i);

        data.push({
          date: d.toISOString(),
          visits: Math.floor(Math.random() * 100) + 20,
        });
      }
      return data;
    };

    const testData = generateTestData();
    console.log("🚀 ~ testData:", testData)
    setVisits(testData);
  }, []);

  const fetchData = async () => {
    try {
      const response = await api.admin.getVisits();
      // console.log("🚀 ~ response:", response.data)
    } catch (error) {
      console.log(error)
      
    }
  }

  const filterData = () => {
    const now = new Date();
    const from = new Date();

    switch (selectedPeriod) {
      case '7 Días':
        from.setDate(now.getDate() - 7);
        break;
      case '30 Días':
        from.setDate(now.getDate() - 30);
        break;
      case '3 Meses':
        from.setMonth(now.getMonth() - 3);
        break;
      case '6 Meses':
        from.setMonth(now.getMonth() - 6);
        break;
      case '1 Año':
        from.setFullYear(now.getFullYear() - 1);
        break;
    }

    const newVisits = visits
      .filter(
        (entry) => new Date(entry.date) >= from && new Date(entry.date) <= now
      )
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

    const formatted = newVisits.map((v) => ({
      ...v,
      label: formatMonth(v.date),
    }));

    setVisitsFiltered(formatted);
  };

  return (
    <section className="rounded-lg shadow-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl text-nafa-gray-text">Visitantes</h3>

        <div className="w-30">
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="w-full text-nafa-gray-text-light py-2 px-4 rounded-md text-sm shadow focus:outline-none appearance-none"
          >
            {periods.map((p) => (
              <option key={p}>{p}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="h-[280px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={visitsFiltered}>
            <defs>
              <linearGradient id="colorVisitas" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#77A5C2" stopOpacity={0.8} />
                <stop offset="100%" stopColor="#77A5C2" stopOpacity={0} />
              </linearGradient>
            </defs>

            <CartesianGrid
              horizontal={true}
              vertical={false}
              stroke="#E0E0E0"
              strokeDasharray="8 8"
            />

            <XAxis
              dataKey="label"
              tickMargin={12}
              tickLine={false}
              axisLine={{ stroke: 'transparent' }}
              tick={({ x, y, payload, index }: any) => (
                <text
                  x={x}
                  y={y + 15}
                  textAnchor="middle"
                  fontSize={12}
                  fill="#AAAFBE"
                  style={{ display: index % 2 === 0 ? 'block' : 'none' }}
                >
                  {payload.value}
                </text>
              )}
            />

            <YAxis
              tickMargin={12}
              tickLine={false}
              axisLine={{ stroke: 'transparent' }}
              tick={({ x, y, payload, index }: any) => (
                <text
                  x={x - 10}
                  y={y + 4}
                  textAnchor="end"
                  fontSize={13}
                  fill="#AAAFBE"
                  style={{ display: index % 2 === 0 ? 'block' : 'none' }}
                >
                  {payload.value}
                </text>
              )}
            />

            <Tooltip />

            <Area
              type="monotone"
              dataKey="visits"
              stroke="#77A5C2"
              fill="url(#colorVisitas)"
              strokeWidth={2}
              dot={false}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}

function formatMonth(date: string) {
  return new Date(date).toLocaleDateString('es-ES', { month: 'short' });
}
