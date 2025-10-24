import React from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'
import { Card, CardHeader, CardContent } from '../ui/Card'

interface LeadChartProps {
  data: Array<{
    name: string
    value: number
    color?: string
  }>
  type?: 'bar' | 'pie'
  title?: string
  height?: number
}

const COLORS = ['#3B82F6', '#F59E0B', '#10B981', '#EF4444', '#8B5CF6']

export const LeadChart: React.FC<LeadChartProps> = ({
  data,
  type = 'bar',
  title = 'Lead Distribution',
  height = 300,
}) => {
  const renderChart = () => {
    if (type === 'pie') {
      return (
        <PieChart width={400} height={height}>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color || COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      )
    }

    return (
      <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="value" fill="#3B82F6" />
      </BarChart>
    )
  }

  return (
    <Card>
      <CardHeader title={title} />
      <CardContent>
        <div style={{ width: '100%', height: height }}>
          <ResponsiveContainer width="100%" height="100%">
            {renderChart()}
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}

interface LeadTrendProps {
  data: Array<{
    date: string
    leads: number
    contacted: number
    qualified: number
  }>
  title?: string
  height?: number
}

export const LeadTrend: React.FC<LeadTrendProps> = ({
  data,
  title = 'Lead Trends',
  height = 300,
}) => {
  return (
    <Card>
      <CardHeader title={title} />
      <CardContent>
        <div style={{ width: '100%', height: height }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="leads" stackId="a" fill="#3B82F6" name="New Leads" />
              <Bar dataKey="contacted" stackId="a" fill="#F59E0B" name="Contacted" />
              <Bar dataKey="qualified" stackId="a" fill="#10B981" name="Qualified" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
