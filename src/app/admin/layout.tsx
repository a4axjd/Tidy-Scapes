"use client";

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { onAuthStateChanged, signOut, User } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { SidebarProvider, Sidebar, SidebarTrigger, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarHeader, SidebarFooter } from '@/components/ui/sidebar';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { LayoutDashboard, Newspaper, Image as ImageIcon, MessageSquare, LogOut, Leaf } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import Link from 'next/link';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        router.push('/admin/login');
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [router]);

  const handleLogout = async () => {
    await signOut(auth);
    router.push('/admin/login');
  };

  if (loading || (!user && pathname !== '/admin/login')) {
    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="flex flex-col items-center space-y-4">
                <Skeleton className="h-12 w-12 rounded-full" />
                <div className="space-y-2">
                    <Skeleton className="h-4 w-[250px]" />
                    <Skeleton className="h-4 w-[200px]" />
                </div>
            </div>
        </div>
    );
  }

  if (!user) {
    return <>{children}</>;
  }

  return (
    <>
      <SidebarProvider>
          <Sidebar>
              <SidebarHeader>
                  <div className="flex items-center space-x-2 p-2">
                      <Leaf className="h-6 w-6 text-primary" />
                      <span className="font-bold font-headline">TidyScapes Admin</span>
                  </div>
              </SidebarHeader>
              <SidebarMenu>
                  <SidebarMenuItem>
                      <SidebarMenuButton asChild isActive={pathname === '/admin/analytics'}>
                          <Link href="/admin/analytics"><LayoutDashboard />Dashboard</Link>
                      </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                      <SidebarMenuButton asChild isActive={pathname.startsWith('/admin/blog')}>
                          <Link href="/admin/blog"><Newspaper />Blog Posts</Link>
                      </SidebarMenuButton>
                  </SidebarMenuItem>
                   <SidebarMenuItem>
                      <SidebarMenuButton asChild isActive={pathname.startsWith('/admin/gallery')}>
                          <Link href="/admin/gallery"><ImageIcon />Gallery</Link>
                      </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                      <SidebarMenuButton asChild isActive={pathname.startsWith('/admin/messages')}>
                          <Link href="/admin/messages"><MessageSquare />Messages</Link>
                      </SidebarMenuButton>
                  </SidebarMenuItem>
              </SidebarMenu>
              <SidebarFooter>
                  <div className="flex items-center p-2 space-x-3">
                      <Avatar>
                          <AvatarImage src={user.photoURL || undefined} />
                          <AvatarFallback>{user.email?.charAt(0).toUpperCase()}</AvatarFallback>
                      </Avatar>
                      <div className="flex-grow">
                          <p className="text-sm font-semibold">{user.displayName || user.email}</p>
                      </div>
                      <Button variant="ghost" size="icon" onClick={handleLogout}>
                          <LogOut />
                      </Button>
                  </div>
              </SidebarFooter>
          </Sidebar>
          <main className="flex-1 p-6 bg-muted/40">
              <div className="flex items-center mb-6">
                  <SidebarTrigger className="md:hidden" />
                  <h1 className="text-2xl font-semibold ml-2 md:ml-0">{getPageTitle(pathname)}</h1>
              </div>
              {children}
          </main>
      </SidebarProvider>
    </>
  );
}

function getPageTitle(pathname: string) {
    if (pathname.startsWith('/admin/blog')) return 'Blog Posts';
    if (pathname.startsWith('/admin/gallery')) return 'Gallery';
    if (pathname.startsWith('/admin/messages')) return 'Messages';
    if (pathname.startsWith('/admin/analytics')) return 'Analytics';
    return 'Dashboard';
}
