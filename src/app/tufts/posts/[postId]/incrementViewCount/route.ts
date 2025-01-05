import { NextResponse } from 'next/server';
import pool from '@/app/lib/db';

export async function POST(
    request: Request,
    { params }: { params: { postId: string } }
  ) {
    try {
      const result = await pool.query(
        'UPDATE posts SET view_count = view_count + 1 WHERE id = $1 RETURNING view_count',
        [params.postId]
      );
      if (result.rows.length > 0) {
        return NextResponse.json({ viewCount: result.rows[0].view_count });
      }
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    } catch (err) {
      console.error(err);
      return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
  }