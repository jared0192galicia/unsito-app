'use client';
import useDashboardStore from '@/stores/useDashboardStore';
import React from 'react';
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
  const {
    visitsFiltered,
    selectedPeriod,

    periods,

    setSelectedPeriod,
    filterData,
  } = useDashboardStore();

  return (
    <section className="rounded-lg shadow-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl text-nafa-gray-text">Visitantes</h3>

        <div className="w-30">
          <select
            value={selectedPeriod}
            onChange={(e) => {
              setSelectedPeriod(e.target.value);
              filterData();
            }}
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
            {/* Definición del degradado */}
            <defs>
              <linearGradient id="colorVisitas" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#FFC9B5" stopOpacity={0.8} />
                <stop offset="100%" stopColor="#FFC9B5" stopOpacity={0} />
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
              // dataKey="date"
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
              tick={({ x, y, payload, index }) => (
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

// tania bds red

// servicios de internet
