import { db } from './firebase';
import { collection, getDocs, query, where } from 'firebase/firestore';
import type { DocumentData } from 'firebase/firestore';

export interface BlogPost {
    slug: string;
    image: string;
    hint: string;
    title: string;
    description: string;
    date: string;
    content: string[];
}

export interface Project {
    slug: string;
    image: string;
    hint: string;
    title: string;
    description: string;
    details: string[];
}

async function fetchCollection<T>(collectionName: string): Promise<T[]> {
    const querySnapshot = await getDocs(collection(db, collectionName));
    return querySnapshot.docs.map(doc => doc.data() as T);
}

async function fetchDocumentBySlug<T>(collectionName: string, slug: string): Promise<T | null> {
    const q = query(collection(db, collectionName), where("slug", "==", slug));
    const querySnapshot = await getDocs(q);
    if (querySnapshot.empty) {
        return null;
    }
    return querySnapshot.docs[0].data() as T;
}

export async function getBlogPosts(): Promise<BlogPost[]> {
    return await fetchCollection<BlogPost>('blogPosts');
}

export async function getBlogPost(slug: string): Promise<BlogPost | null> {
    return await fetchDocumentBySlug<BlogPost>('blogPosts', slug);
}

export async function getProjects(): Promise<Project[]> {
    return await fetchCollection<Project>('projects');
}

export async function getProject(slug: string): Promise<Project | null> {
    return await fetchDocumentBySlug<Project>('projects', slug);
}
