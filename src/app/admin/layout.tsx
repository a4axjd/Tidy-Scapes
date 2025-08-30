"use client";

import { useEffect, useState, useRef } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { onAuthStateChanged, signOut, User } from 'firebase/auth';
import { auth, db } from '@/lib/firebase';
import { collection, onSnapshot, query, where, Timestamp } from 'firebase/firestore';
import { SidebarProvider, Sidebar, SidebarTrigger, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarHeader, SidebarFooter } from '@/components/ui/sidebar';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { LayoutDashboard, Newspaper, Image as ImageIcon, MessageSquare, LogOut, Leaf, BarChart3 } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import Link from 'next/link';
import { useToast } from '@/hooks/use-toast';

function NotificationHandler() {
    const { toast } = useToast();
    const [permission, setPermission] = useState<NotificationPermission | undefined>(undefined);
    const serviceWorkerRef = useRef<ServiceWorkerRegistration | null>(null);
    const lastCheckTime = useRef(new Date());

    useEffect(() => {
        if (typeof window !== 'undefined' && 'Notification' in window) {
            setPermission(Notification.permission);
        }

        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.register('/service-worker.js')
                .then(registration => {
                    serviceWorkerRef.current = registration;
                })
                .catch(err => console.error('Service Worker registration failed:', err));
        }

        const q = query(
            collection(db, 'contacts'), 
            where("timestamp", ">", Timestamp.fromDate(lastCheckTime.current))
        );

        const unsubscribe = onSnapshot(q, (snapshot) => {
            snapshot.docChanges().forEach((change) => {
                if (change.type === "added") {
                    // Check if the message is new since the listener was attached
                    const messageData = change.doc.data();
                    const messageTimestamp = (messageData.timestamp as Timestamp).toDate();

                    if(messageTimestamp > lastCheckTime.current) {
                        console.log("New message: ", messageData);
                        if (Notification.permission === 'granted' && navigator.serviceWorker.controller) {
                            navigator.serviceWorker.controller.postMessage({
                                type: 'NEW_MESSAGE',
                                payload: {
                                    title: `New message from ${messageData.name}`,
                                    body: messageData.message,
                                },
                            });
                        }
                    }
                }
            });
            // Update last check time to now to avoid re-notifying for old messages on listener re-init
             if (snapshot.docs.length > 0) {
                lastCheckTime.current = new Date();
             }
        });

        return () => unsubscribe();
    }, []);

    const requestPermission = () => {
        Notification.requestPermission().then(permission => {
            setPermission(permission);
            if (permission === 'granted') {
                toast({ title: "Notifications enabled!", description: "You'll be notified of new messages." });
            } else {
                toast({ title: "Notifications denied", description: "You won't receive notifications.", variant: "destructive" });
            }
        });
    };

    if (permission === 'default') {
        return (
            <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-4" role="alert">
                <p className="font-bold">Enable Notifications</p>
                <p>Get notified when you receive new messages.</p>
                <Button onClick={requestPermission} size="sm" className="mt-2">Enable</Button>
            </div>
        )
    }

    return null;
}

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
                      <SidebarMenuButton asChild isActive={pathname === '/admin'}>
                          <Link href="/admin"><LayoutDashboard />Dashboard</Link>
                      </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                      <SidebarMenuButton asChild isActive={pathname.startsWith('/admin/blog')}>
                          <Link href="/admin/blog"><Newspaper />Blog Posts</Link>
                      </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                      <SidebarMenuButton asChild isActive={pathname.startsWith('/admin/portfolio')}>
                          <Link href="/admin/portfolio"><ImageIcon />Portfolio</Link>
                      </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                      <SidebarMenuButton asChild isActive={pathname.startsWith('/admin/messages')}>
                          <Link href="/admin/messages"><MessageSquare />Messages</Link>
                      </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                      <SidebarMenuButton asChild isActive={pathname.startsWith('/admin/analytics')}>
                          <Link href="/admin/analytics"><BarChart3 />Analytics</Link>
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
              <NotificationHandler />
              {children}
          </main>
      </SidebarProvider>
    </>
  );
}

function getPageTitle(pathname: string) {
    if (pathname.startsWith('/admin/blog')) return 'Blog Posts';
    if (pathname.startsWith('/admin/portfolio')) return 'Portfolio';
    if (pathname.startsWith('/admin/messages')) return 'Messages';
    if (pathname.startsWith('/admin/analytics')) return 'Analytics';
    return 'Dashboard';
}
