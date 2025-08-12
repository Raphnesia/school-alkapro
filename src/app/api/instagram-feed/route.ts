import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const TOKEN = process.env.INSTAGRAM_ACCESS_TOKEN;
    const USER_ID = process.env.INSTAGRAM_USER_ID;

    if (!TOKEN || !USER_ID) {
      return NextResponse.json(
        { error: 'INSTAGRAM_ACCESS_TOKEN / INSTAGRAM_USER_ID belum dikonfigurasi' },
        { status: 500 }
      );
    }

    const fields = [
      'id',
      'caption',
      'media_type',
      'media_url',
      'permalink',
      'thumbnail_url',
      'timestamp',
    ].join(',');

    const url = `https://graph.instagram.com/${USER_ID}/media?fields=${fields}&access_token=${TOKEN}`;

    const res = await fetch(url, { cache: 'no-store' });
    if (!res.ok) {
      const text = await res.text();
      throw new Error(`Instagram API error: ${res.status} ${text}`);
    }

    const json = await res.json();
    const items = Array.isArray(json?.data) ? json.data : [];

    const normalized = items.map((p: any) => ({
      id: p.id,
      media_type: p.media_type,
      media_url: p.media_url,
      thumbnail_url: p.thumbnail_url,
      caption: p.caption,
      permalink: p.permalink,
      timestamp: p.timestamp,
    }));

    return NextResponse.json({ data: normalized });
  } catch (err: any) {
    console.error('Instagram API Error:', err?.message || err);
    return NextResponse.json({ error: 'Failed to fetch Instagram posts' }, { status: 500 });
  }
}