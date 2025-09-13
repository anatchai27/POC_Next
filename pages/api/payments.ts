import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(_req: NextApiRequest, res: NextApiResponse) {
  // Placeholder payments endpoint
  res.status(200).json({ status: 'ok' });
}
