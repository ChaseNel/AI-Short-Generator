import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@lib/prisma';
import { getSessionUser } from '@/lib/getSessionUser';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const user = await getSessionUser(req, res);

    const { id } = req.query;

    if (req.method === 'PUT') {
      const { visualPrompt, narrationText } = req.body;

      const scene = await prisma.scene.findUnique({
        where: { id: id as string },
        include: { videoProject: true },
      });

      if (!scene || scene.videoProject.userId !== user.id) {
        return res.status(404).json({ error: 'Scene not found or access denied' });
      }

      const updatedScene = await prisma.scene.update({
        where: { id: id as string },
        data: { visualPrompt, narrationText },
      });

      return res.status(200).json(updatedScene);
    }

    res.setHeader('Allow', ['PUT']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  } catch (err: any) {
    console.error(err);
    return res.status(401).json({ error: err.message || 'Unauthorized' });
  }
}
