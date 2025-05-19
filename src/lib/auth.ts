const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function checkUserAccess(userId: string): Promise<boolean> {
  try {
    const response = await fetch(`${API_URL}/auth/access/${userId}`);
    if (!response.ok) {
      console.error('Error checking user access:', response.statusText);
      return false;
    }
    const data = await response.json();
    return data.hasAccess ?? false;
  } catch (error) {
    console.error('Error checking user access:', error);
    return false;
  }
} 