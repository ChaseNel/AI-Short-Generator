import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@lib/prisma';
import { getSessionUser } from '@/lib/getSessionUser';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const user = await getSessionUser(req, res);

    const { id } = req.query;

    if (req.method === 'GET') {
      const asset = await prisma.asset.findFirst({
        where: {
          id: id as string,
          videoProject: {
            userId: user.id, 
          },
        },
        include: { videoProject: true },
      });

      if (!asset) {
        return res.status(404).json({ error: 'Asset not found or access denied' });
      }

      return res.status(200).json(asset);
    }

    // 3️⃣ Only allow GET
    res.setHeader('Allow', ['GET']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  } catch (err: any) {
    console.error(err);
    return res.status(401).json({ error: err.message || 'Unauthorized' });
  }
}
