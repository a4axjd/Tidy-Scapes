"use client";

import { useEffect, useState } from 'react';
import { collection, getDocs, query, orderBy, doc, deleteDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ContactMessage {
    id: string;
    name: string;
    email: string;
    service: string;
    message: string;
    timestamp: {
        seconds: number;
    };
}

export default function MessageManagement() {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchMessages = async () => {
    setLoading(true);
    const q = query(collection(db, 'contacts'), orderBy('timestamp', 'desc'));
    const querySnapshot = await getDocs(q);
    const messagesData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as ContactMessage));
    setMessages(messagesData);
    setLoading(false);
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this message?")) {
        try {
            await deleteDoc(doc(db, 'contacts', id));
            toast({ title: "Success", description: "Message deleted successfully." });
            fetchMessages();
        } catch (error) {
            toast({ title: "Error", description: "Failed to delete message.", variant: "destructive" });
        }
    }
  };

  return (
    <div className="rounded-lg border">
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>From</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Service</TableHead>
                    <TableHead>Message</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                 {loading ? (
                    <TableRow><TableCell colSpan={6} className="text-center">Loading...</TableCell></TableRow>
                ) : messages.length === 0 ? (
                    <TableRow><TableCell colSpan={6} className="text-center">No messages found.</TableCell></TableRow>
                ) : (
                    messages.map((msg) => (
                        <TableRow key={msg.id}>
                            <TableCell>{new Date(msg.timestamp.seconds * 1000).toLocaleDateString()}</TableCell>
                            <TableCell className="font-medium">{msg.name}</TableCell>
                            <TableCell>{msg.email}</TableCell>
                            <TableCell>{msg.service}</TableCell>
                            <TableCell className="max-w-xs truncate">{msg.message}</TableCell>
                             <TableCell className="text-right">
                                <Accordion type="single" collapsible className="w-full">
                                    <AccordionItem value="item-1" className="border-b-0">
                                        <AccordionTrigger className="p-0 hover:no-underline"></AccordionTrigger>
                                        <AccordionContent>
                                            {msg.message}
                                        </AccordionContent>
                                    </AccordionItem>
                                </Accordion>
                                <Button variant="ghost" size="icon" onClick={() => handleDelete(msg.id)}>
                                    <Trash2 className="h-4 w-4 text-destructive" />
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))
                )}
            </TableBody>
        </Table>
    </div>
  );
}
