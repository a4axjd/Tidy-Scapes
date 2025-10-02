import { db } from './firebase';
import { collection, getDocs, query, where, DocumentData } from 'firebase/firestore';

export interface BlogPost {
    id: string;
    slug: string;
    image: string;
    hint: string;
    title: string;
    description: string;
    date: string;
    content: string[];
}

export interface Project {
    id: string;
    slug: string;
    image: string;
    hint: string;
    title: string;
    description: string;
    details: string[];
}

async function fetchCollection<T>(name: string): Promise<T[]> {
    const querySnapshot = await getDocs(collection(db, name));
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as T));
}

export async function getBlogPosts(): Promise<BlogPost[]> {
    return fetchCollection<BlogPost>('blogPosts');
}

export async function getBlogPost(slug: string): Promise<BlogPost | null> {
    const q = query(collection(db, 'blogPosts'), where('slug', '==', slug));
    const querySnapshot = await getDocs(q);
    if (querySnapshot.empty) {
        return null;
    }
    const doc = querySnapshot.docs[0];
    return { id: doc.id, ...doc.data() } as BlogPost;
}

export async function getProjects(): Promise<Project[]> {
    return fetchCollection<Project>('projects');
}

export async function getProject(slug: string): Promise<Project | null> {
    const q = query(collection(db, 'projects'), where('slug', '==', slug));
    const querySnapshot = await getDocs(q);
    if (querySnapshot.empty) {
        return null;
    }
    const doc = querySnapshot.docs[0];
    return { id: doc.id, ...doc.data() } as Project;
}
