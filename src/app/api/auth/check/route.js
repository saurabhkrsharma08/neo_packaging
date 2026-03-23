import { authorize } from '../../lib/auth';

export async function GET(req, res) {
  if (!authorize(req)) {
    return new Response(JSON.stringify({ message: 'Unauthorized' }), { status: 401 });
  }

  return new Response(JSON.stringify({ message: 'Authorized' }), { status: 200 });
}