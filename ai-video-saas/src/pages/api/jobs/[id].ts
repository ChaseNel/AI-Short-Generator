import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@lib/prisma';
import { getSessionUser } from '@/lib/getSessionUser';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const user = await getSessionUser(req, res);

    const { id } = req.query;

    if (req.method === 'GET') {
      const job = await prisma.generationJob.findFirst({
        where: {
          id: id as string,
          videoProject: {
            userId: user.id, 
          },
        },
        include: { videoProject: true }, 
      });

      if (!job) {
        return res.status(404).json({ error: 'Job not found or access denied' });
      }

      return res.status(200).json(job);
    }

    res.setHeader('Allow', ['GET']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  } catch (err: any) {
    console.error(err);
    return res.status(401).json({ error: err.message || 'Unauthorized' });
  }
}
