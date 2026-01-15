// ========================
// /pages/api/jobs/[id].ts
// ========================
import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../../lib/prisma';


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
const { id } = req.query;


if (req.method === 'GET') {
const job = await prisma.generationJob.findUnique({
where: { id: id as string },
});
if (!job) return res.status(404).json({ error: 'Job not found' });


return res.status(200).json(job);
}


res.setHeader('Allow', ['GET']);
res.status(405).end(`Method ${req.method} Not Allowed`);
}