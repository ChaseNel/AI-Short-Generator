// ========================
// /pages/api/scenes/[id].ts
// ========================
import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../../lib/prisma';


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
const { id } = req.query;


if (req.method === 'PUT') {
const { visualPrompt, narrationText } = req.body;
const scene = await prisma.scene.update({
where: { id: id as string },
data: { visualPrompt, narrationText },
});
return res.status(200).json(scene);
}


res.setHeader('Allow', ['PUT']);
res.status(405).end(`Method ${req.method} Not Allowed`);
}