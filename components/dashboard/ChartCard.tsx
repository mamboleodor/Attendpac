"use client";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

export function TrendChartCard({
  title,
  data,
}: {
  title: string;
  data: { label: string; value: number }[];
}) {
  return (
    <div className="card">
      <p className="font-bold text-brand-darkGray mb-4">{title}</p>
      <div className="h-56">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid stroke="#E5E5E0" strokeDasharray="3 3" />
            <XAxis dataKey="label" stroke="#9E9E99" fontSize={12} />
            <YAxis stroke="#9E9E99" fontSize={12} />
            <Tooltip />
            <Line type="monotone" dataKey="value" stroke="#EB5733" strokeWidth={2} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export function BarChartCard({
  title,
  data,
}: {
  title: string;
  data: { label: string; value: number }[];
}) {
  return (
    <div className="card">
      <p className="font-bold text-brand-darkGray mb-4">{title}</p>
      <div className="h-56">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid stroke="#E5E5E0" strokeDasharray="3 3" />
            <XAxis dataKey="label" stroke="#9E9E99" fontSize={12} />
            <YAxis stroke="#9E9E99" fontSize={12} />
            <Tooltip />
            <Bar dataKey="value" fill="#EB5733" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
