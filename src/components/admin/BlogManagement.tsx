"use client";

import { useEffect, useState } from 'react';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { PlusCircle, Edit, Trash2 } from 'lucide-react';
import type { BlogPost } from '@/lib/firebase-data';
import { useToast } from '@/hooks/use-toast';

interface BlogPostWithId extends BlogPost {
    id: string;
}

export default function BlogManagement() {
  const [blogPosts, setBlogPosts] = useState<BlogPostWithId[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentPost, setCurrentPost] = useState<Partial<BlogPostWithId> | null>(null);
  const { toast } = useToast();

  const fetchBlogPosts = async () => {
    setLoading(true);
    const querySnapshot = await getDocs(collection(db, 'blogPosts'));
    const posts = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as BlogPostWithId));
    setBlogPosts(posts);
    setLoading(false);
  };

  useEffect(() => {
    fetchBlogPosts();
  }, []);

  const handleDialogOpen = (post: Partial<BlogPostWithId> | null = null) => {
    setCurrentPost(post);
    setIsDialogOpen(true);
  };

  const handleDialogClose = () => {
    setCurrentPost(null);
    setIsDialogOpen(false);
  };

  const handleSave = async () => {
    if (!currentPost || !currentPost.title) return;

    try {
        if (currentPost.id) {
            // Update existing post
            const postDoc = doc(db, 'blogPosts', currentPost.id);
            const { id, ...postData } = currentPost;
            await updateDoc(postDoc, postData);
            toast({ title: "Success", description: "Blog post updated successfully." });
        } else {
            // Create new post
            await addDoc(collection(db, 'blogPosts'), {
                ...currentPost,
                date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
                slug: currentPost.title.toLowerCase().replace(/\s+/g, '-'),
            });
            toast({ title: "Success", description: "Blog post created successfully." });
        }
        fetchBlogPosts();
        handleDialogClose();
    } catch (error) {
        toast({ title: "Error", description: "Failed to save blog post.", variant: "destructive" });
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this post?")) {
        try {
            await deleteDoc(doc(db, 'blogPosts', id));
            toast({ title: "Success", description: "Blog post deleted successfully." });
            fetchBlogPosts();
        } catch (error) {
            toast({ title: "Error", description: "Failed to delete blog post.", variant: "destructive" });
        }
    }
  };
  
  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (currentPost) {
        setCurrentPost({ ...currentPost, content: e.target.value.split('\n') });
    }
  };

  return (
    <div>
        <div className="flex justify-end mb-4">
            <Button onClick={() => handleDialogOpen()}>
                <PlusCircle className="mr-2 h-4 w-4" /> Add New Post
            </Button>
        </div>
        <div className="rounded-lg border">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Title</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {loading ? (
                        <TableRow><TableCell colSpan={3} className="text-center">Loading...</TableCell></TableRow>
                    ) : blogPosts.length === 0 ? (
                        <TableRow><TableCell colSpan={3} className="text-center">No blog posts found.</TableCell></TableRow>
                    ) : (
                        blogPosts.map((post) => (
                            <TableRow key={post.id}>
                                <TableCell className="font-medium">{post.title}</TableCell>
                                <TableCell>{post.date}</TableCell>
                                <TableCell className="text-right">
                                    <Button variant="ghost" size="icon" onClick={() => handleDialogOpen(post)}>
                                        <Edit className="h-4 w-4" />
                                    </Button>
                                    <Button variant="ghost" size="icon" onClick={() => handleDelete(post.id)}>
                                        <Trash2 className="h-4 w-4 text-destructive" />
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>
        </div>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogContent className="sm:max-w-[625px]">
                <DialogHeader>
                    <DialogTitle>{currentPost?.id ? 'Edit' : 'Create'} Blog Post</DialogTitle>
                    <DialogDescription>
                        Fill in the details for the blog post. Click save when you're done.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="title" className="text-right">Title</Label>
                        <Input id="title" value={currentPost?.title || ''} onChange={(e) => setCurrentPost({ ...currentPost, title: e.target.value })} className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="description" className="text-right">Description</Label>
                        <Input id="description" value={currentPost?.description || ''} onChange={(e) => setCurrentPost({ ...currentPost, description: e.target.value })} className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="image" className="text-right">Image URL</Label>
                        <Input id="image" value={currentPost?.image || ''} onChange={(e) => setCurrentPost({ ...currentPost, image: e.target.value })} className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="hint" className="text-right">Image Hint</Label>
                        <Input id="hint" value={currentPost?.hint || ''} onChange={(e) => setCurrentPost({ ...currentPost, hint: e.target.value })} className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-start gap-4">
                        <Label htmlFor="content" className="text-right pt-2">Content</Label>
                        <Textarea id="content" value={currentPost?.content?.join('\n') || ''} onChange={handleContentChange} className="col-span-3" rows={10} placeholder="Enter each paragraph on a new line." />
                    </div>
                </div>
                <DialogFooter>
                    <Button variant="outline" onClick={handleDialogClose}>Cancel</Button>
                    <Button onClick={handleSave}>Save changes</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    </div>
  );
}
