"use client";

import { useEffect, useState } from 'react';
import { getAnalyticsData } from '@/ai/flows/get-analytics-data';
import type { AnalyticsData } from '@/ai/flows/get-analytics-data';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Skeleton } from '@/components/ui/skeleton';
import { Users, Eye, BarChart2, Globe } from 'lucide-react';

const MetricCard = ({ title, value, icon, loading }: { title: string; value: string | number; icon: React.ReactNode, loading: boolean }) => (
    <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{title}</CardTitle>
            {icon}
        </CardHeader>
        <CardContent>
            {loading ? <Skeleton className="h-8 w-24" /> : <div className="text-2xl font-bold">{value}</div>}
        </CardContent>
    </Card>
);

export default function AnalyticsDashboard() {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const analyticsData = await getAnalyticsData();
        setData(analyticsData);
        setError(null);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch analytics data. Please ensure your environment variables for Google Analytics are set up correctly.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (error) {
    return <div className="text-destructive p-4 border border-destructive/50 bg-destructive/10 rounded-md">{error}</div>;
  }

  return (
    <div className="space-y-6">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <MetricCard title="Total Users" value={data?.totalUsers ?? 0} icon={<Users className="h-4 w-4 text-muted-foreground" />} loading={loading} />
            <MetricCard title="Page Views" value={data?.screenPageViews ?? 0} icon={<Eye className="h-4 w-4 text-muted-foreground" />} loading={loading} />
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
                <CardHeader>
                    <CardTitle>Top Pages by Views</CardTitle>
                </CardHeader>
                <CardContent>
                     {loading ? (
                         <Skeleton className="w-full h-[300px]" />
                     ) : (
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={data?.topPages} layout="vertical" margin={{ left: 100 }}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis type="number" />
                                <YAxis dataKey="page" type="category" width={100} tick={{ fontSize: 12 }} />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="views" fill="hsl(var(--primary))" name="Page Views" />
                            </BarChart>
                        </ResponsiveContainer>
                     )}
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle>Users by Traffic Source</CardTitle>
                </CardHeader>
                <CardContent>
                     {loading ? (
                         <Skeleton className="w-full h-[300px]" />
                     ) : (
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={data?.trafficSources}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="source" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="users" fill="hsl(var(--primary))" name="Total Users" />
                            </BarChart>
                        </ResponsiveContainer>
                    )}
                </CardContent>
            </Card>
        </div>
        <Card>
            <CardHeader>
                <CardTitle>Users by Country</CardTitle>
            </CardHeader>
            <CardContent>
                {loading ? (
                    <Skeleton className="w-full h-[300px]" />
                ) : (
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={data?.audienceByCountry}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="country" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="users" fill="hsl(var(--primary))" name="Total Users" />
                        </BarChart>
                    </ResponsiveContainer>
                )}
            </CardContent>
        </Card>
    </div>
  );
}
