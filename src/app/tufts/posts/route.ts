import { NextResponse } from 'next/server';
import pool from '@/app/lib/db';

export async function GET() {
    try {
      const result = await pool.query('SELECT * FROM posts');
      return NextResponse.json(result.rows);
    } catch (err) {
      console.error(err);
      return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
  }
  
  export async function POST(request: Request) {
    try {
      const { id, title, date, content, author, imageUrl, tags } = await request.json();
      const result = await pool.query(
        'INSERT INTO posts (id, title, date, content, author, image_url, tags, view_count) VALUES ($1, $2, $3, $4, $5, $6, $7, 0) RETURNING *',
        [id, title, date, content, author, imageUrl, tags]
      );
      return NextResponse.json(result.rows[0], { status: 201 });
    } catch (err) {
      console.error(err);
      return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
  }