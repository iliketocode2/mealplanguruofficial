import { NextResponse } from 'next/server';
import pool from '@/app/lib/db';

export async function GET(
  request: Request,
  context: { params: Promise<{ postId: string }> }
) {
  const { postId } = await context.params;

  try {
    const result = await pool.query('SELECT view_count FROM posts WHERE id = $1', [postId]);
    if (result.rows.length > 0) {
      return NextResponse.json({ viewCount: result.rows[0].view_count });
    }
    return NextResponse.json({ error: 'Post not found' }, { status: 404 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}