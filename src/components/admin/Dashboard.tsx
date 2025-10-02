"use client";

import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Newspaper, ImageIcon, MessageSquare } from 'lucide-react';

export default function Dashboard() {
  const [counts, setCounts] = useState({
    blogPosts: 0,
    projects: 0,
    messages: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const blogSnapshot = await getDocs(collection(db, 'blogPosts'));
        const projectsSnapshot = await getDocs(collection(db, 'projects'));
        const messagesSnapshot = await getDocs(collection(db, 'contacts'));

        setCounts({
          blogPosts: blogSnapshot.size,
          projects: projectsSnapshot.size,
          messages: messagesSnapshot.size,
        });
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Blog Posts
            </CardTitle>
            <Newspaper className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{loading ? '...' : counts.blogPosts}</div>
            <p className="text-xs text-muted-foreground">
              Total number of blog posts
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Gallery Projects
            </CardTitle>
            <ImageIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{loading ? '...' : counts.projects}</div>
            <p className="text-xs text-muted-foreground">
              Total number of projects in the gallery
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Messages</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{loading ? '...' : counts.messages}</div>
            <p className="text-xs text-muted-foreground">
              Total contact form submissions
            </p>
          </CardContent>
        </Card>
      </div>
      <div className="mt-8">
        <Card>
            <CardHeader>
                <CardTitle>Welcome to your Dashboard</CardTitle>
            </CardHeader>
            <CardContent>
                <p>Use the navigation on the left to manage your blog posts, gallery projects, and view messages from your visitors.</p>
            </CardContent>
        </Card>
      </div>
    </div>
  );
}
