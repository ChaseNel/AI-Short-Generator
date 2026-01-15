// ========================
// /pages/api/assets/[id].ts
// ========================
import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../../lib/prisma';


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
const { id } = req.query;


if (req.method === 'GET') {
const asset = await prisma.asset.findUnique({
where: { id: id as string },
});
if (!asset) return res.status(404).json({ error: 'Asset not found' });


return res.status(200).json(asset);
}


res.setHeader('Allow', ['GET']);
res.status(405).end(`Method ${req.method} Not Allowed`);
}