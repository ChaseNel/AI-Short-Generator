import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@lib/prisma';
import { getSessionUser } from '@/lib/getSessionUser';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const user = await getSessionUser(req, res);

    const { id } = req.query; // project ID

    if (req.method === 'POST') {
      const project = await prisma.videoProject.findUnique({
        where: { id: id as string },
      });

      if (!project || project.userId !== user.id) {
        return res.status(404).json({ error: 'Project not found or access denied' });
      }

      //  Placeholder: generate AI story/scenes
      // (In the future you could enqueue a story generation job here)
      return res.status(200).json({
        message: `Story generation started for project ${id}`,
      });
    }

    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  } catch (err: any) {
    console.error(err);
    return res.status(401).json({ error: err.message || 'Unauthorized' });
  }
}
