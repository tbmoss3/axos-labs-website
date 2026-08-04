export const dynamic = "force-dynamic";

import { softwareCategories, allSoftwareTools, searchSoftware } from "@/lib/software-data";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get("q") ?? "";
  const limit = parseInt(searchParams.get("limit") ?? "20", 10);

  if (q) {
    const results = searchSoftware(q, limit);
    return Response.json({
      query: q,
      results,
      total: results.length,
    });
  }

  return Response.json({
    categories: softwareCategories.map((cat) => ({
      name: cat.name,
      tools: cat.tools.map((t) => ({ name: t, category: cat.name })),
    })),
    totalTools: allSoftwareTools.length,
  });
}
