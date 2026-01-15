// ========================
// /pages/api/projects/[id]/generate.ts
// ========================
import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../../../lib/prisma';


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
const { id } = req.query;


if (req.method === 'POST') {
// Placeholder: enqueue video generation job
const job = await prisma.generationJob.create({
data: {
videoProjectId: id as string,
type: 'VIDEO',
status: 'QUEUED',
},
});


return res.status(201).json(job);
}


res.setHeader('Allow', ['POST']);
res.status(405).end(`Method ${req.method} Not Allowed`);
}