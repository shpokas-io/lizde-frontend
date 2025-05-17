import { createClient } from '@supabase/supabase-js';
import { Database } from '@/types/database';

const supabase = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function checkUserAccess(userId: string): Promise<boolean> {
  try {
    const { data: userCourse, error } = await supabase
      .from('user_courses')
      .select('has_access')
      .eq('user_id', userId)
      .single();

    if (error) {
      console.error('Error checking user access:', error);
      return false;
    }

    return userCourse?.has_access ?? false;
  } catch (error) {
    console.error('Error checking user access:', error);
    return false;
  }
} 