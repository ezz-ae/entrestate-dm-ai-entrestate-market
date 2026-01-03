
import { NextResponse } from 'next/server';

/**
 * @swagger
 * /api/health:
 *   get:
 *     description: Returns a health check response
 *     responses:
 *       200:
 *         description: OK
 */
export async function GET() {
  return NextResponse.json({ status: 'ok' });
}
