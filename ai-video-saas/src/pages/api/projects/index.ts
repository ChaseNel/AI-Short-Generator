import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@lib/prisma';
import { getSessionUser } from '@/lib/getSessionUser';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const user = await getSessionUser(req, res); // <--- MVP-02.3 in action

    if (req.method === 'GET') {
      const projects = await prisma.videoProject.findMany({
        where: { userId: user.id }, // use user.id here
        include: { scenes: true, assets: true },
      });
      return res.status(200).json(projects);
    }

    if (req.method === 'POST') {
      const { title } = req.body;
      if (!title) return res.status(400).json({ error: 'Title is required' });

      const project = await prisma.videoProject.create({
        data: { title, userId: user.id }, // use user.id here
      });

      return res.status(201).json(project);
    }

    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  } catch (err) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
}