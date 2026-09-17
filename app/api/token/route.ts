import { fetchLiveToken } from "@/lib/live-token";

export async function GET() {
  const live = await fetchLiveToken();
  return Response.json({ live });
}
