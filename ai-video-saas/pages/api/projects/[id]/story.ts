// ========================
// /pages/api/projects/[id]/story.ts
// ========================
import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../../../lib/prisma';


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
const { id } = req.query;


if (req.method === 'POST') {
// Placeholder: generate AI story/scenes
return res.status(200).json({ message: `Story generation started for project ${id}` });
}


res.setHeader('Allow', ['POST']);
res.status(405).end(`Method ${req.method} Not Allowed`);
}