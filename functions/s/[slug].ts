// _functions/s/[slug].ts
export const onRequestGet: PagesFunction<{ SHORTLINKS: KVNamespace }> = async (ctx) => {
    const slug = ctx.params.slug as string;
    const dest = await ctx.env.SHORTLINKS.get(slug);
    if (!dest) return new Response("Not found", { status: 404 });
    return Response.redirect(dest, 301);
  };
  