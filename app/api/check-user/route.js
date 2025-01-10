// app/api/check-user/route.js
import { db } from '@/configs/db';
import { usersSchema } from '@/configs/schema';
import { eq } from 'drizzle-orm';

export async function POST(req) {
  const { email, fullName, imageUrl } = await req.json();
  
  console.log('Received data:', { email, fullName, imageUrl });

  const result = await db
    .select()
    .from(usersSchema)
    .where(eq(usersSchema.email, email));

  if (!result[0]) {
    console.log('User not found, inserting to DB...');
    try {
      await db.insert(usersSchema).values({
        name: fullName,
        email: email,
        imageUrl: imageUrl,
      });
      console.log('User successfully inserted');
      return new Response(JSON.stringify({ success: true }), { status: 200 });
    } catch (error) {
      console.error('Error inserting user:', error);
      return new Response(JSON.stringify({ success: false, error: 'DB insertion failed' }), { status: 500 });
    }
  }

  return new Response(JSON.stringify({ success: false }), { status: 200 });
}
