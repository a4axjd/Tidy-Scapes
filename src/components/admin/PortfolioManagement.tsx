"use client";

import { useEffect, useState } from 'react';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { PlusCircle, Edit, Trash2 } from 'lucide-react';
import type { Project } from '@/lib/firebase-data';
import { useToast } from '@/hooks/use-toast';

interface ProjectWithId extends Project {
    id: string;
}

export default function PortfolioManagement() {
  const [projects, setProjects] = useState<ProjectWithId[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentProject, setCurrentProject] = useState<Partial<ProjectWithId> | null>(null);
  const { toast } = useToast();

  const fetchProjects = async () => {
    setLoading(true);
    const querySnapshot = await getDocs(collection(db, 'projects'));
    const projectsData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as ProjectWithId));
    setProjects(projectsData);
    setLoading(false);
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleDialogOpen = (project: Partial<ProjectWithId> | null = null) => {
    setCurrentProject(project);
    setIsDialogOpen(true);
  };

  const handleDialogClose = () => {
    setCurrentProject(null);
    setIsDialogOpen(false);
  };

  const handleSave = async () => {
    if (!currentProject || !currentProject.title) return;

    try {
        if (currentProject.id) {
            // Update
            const projectDoc = doc(db, 'projects', currentProject.id);
            const { id, ...projectData } = currentProject;
            await updateDoc(projectDoc, projectData);
            toast({ title: "Success", description: "Project updated successfully." });
        } else {
            // Create
            await addDoc(collection(db, 'projects'), {
                ...currentProject,
                slug: currentProject.title.toLowerCase().replace(/\s+/g, '-'),
            });
            toast({ title: "Success", description: "Project created successfully." });
        }
        fetchProjects();
        handleDialogClose();
    } catch (error) {
        toast({ title: "Error", description: "Failed to save project.", variant: "destructive" });
    }
  };

  const handleDelete = async (id: string) => {
     if (window.confirm("Are you sure you want to delete this project?")) {
        try {
            await deleteDoc(doc(db, 'projects', id));
            toast({ title: "Success", description: "Project deleted successfully." });
            fetchProjects();
        } catch (error) {
            toast({ title: "Error", description: "Failed to delete project.", variant: "destructive" });
        }
    }
  };

  const handleDetailsChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (currentProject) {
        setCurrentProject({ ...currentProject, details: e.target.value.split('\n') });
    }
  };

  return (
    <div>
        <div className="flex justify-end mb-4">
            <Button onClick={() => handleDialogOpen()}>
                <PlusCircle className="mr-2 h-4 w-4" /> Add New Project
            </Button>
        </div>
        <div className="rounded-lg border">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Title</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {loading ? (
                        <TableRow><TableCell colSpan={3} className="text-center">Loading...</TableCell></TableRow>
                    ) : projects.length === 0 ? (
                        <TableRow><TableCell colSpan={3} className="text-center">No projects found.</TableCell></TableRow>
                    ) : (
                        projects.map((project) => (
                            <TableRow key={project.id}>
                                <TableCell className="font-medium">{project.title}</TableCell>
                                <TableCell>{project.description}</TableCell>
                                <TableCell className="text-right">
                                    <Button variant="ghost" size="icon" onClick={() => handleDialogOpen(project)}>
                                        <Edit className="h-4 w-4" />
                                    </Button>
                                    <Button variant="ghost" size="icon" onClick={() => handleDelete(project.id)}>
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
                    <DialogTitle>{currentProject?.id ? 'Edit' : 'Create'} Project</DialogTitle>
                    <DialogDescription>
                        Fill in the details for the portfolio project. Click save when you're done.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="title" className="text-right">Title</Label>
                        <Input id="title" value={currentProject?.title || ''} onChange={(e) => setCurrentProject({ ...currentProject, title: e.target.value })} className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="description" className="text-right">Description</Label>
                        <Input id="description" value={currentProject?.description || ''} onChange={(e) => setCurrentProject({ ...currentProject, description: e.target.value })} className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="image" className="text-right">Image URL</Label>
                        <Input id="image" value={currentProject?.image || ''} onChange={(e) => setCurrentProject({ ...currentProject, image: e.target.value })} className="col-span-3" />
                    </div>
                     <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="hint" className="text-right">Image Hint</Label>
                        <Input id="hint" value={currentProject?.hint || ''} onChange={(e) => setCurrentProject({ ...currentProject, hint: e.target.value })} className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-start gap-4">
                        <Label htmlFor="details" className="text-right pt-2">Details</Label>
                        <Textarea id="details" value={currentProject?.details?.join('\n') || ''} onChange={handleDetailsChange} className="col-span-3" rows={5} placeholder="Enter each detail on a new line."/>
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
