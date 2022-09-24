import { NextApiRequest, NextApiResponse } from 'next';

export default function webhooks(req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json({ ok: true });
}