// ========================
// /pages/api/projects/index.ts
// ========================
import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../../lib/prisma';


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
const userId = 'demo-user-id'; // Replace with real auth


if (req.method === 'GET') {
const projects = await prisma.videoProject.findMany({
where: { userId },
include: { scenes: true, assets: true },
});
return res.status(200).json(projects);
}


if (req.method === 'POST') {
const { title } = req.body;
if (!title) return res.status(400).json({ error: 'Title is required' });


const project = await prisma.videoProject.create({
data: { title, userId },
});


return res.status(201).json(project);
}


res.setHeader('Allow', ['GET', 'POST']);
res.status(405).end(`Method ${req.method} Not Allowed`);
}