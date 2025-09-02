// _functions/s/api/shorten.ts
function randomSlug(len = 6) {
    const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let s = "";
    for (let i = 0; i < len; i++) {
      s += chars[Math.floor(Math.random() * chars.length)];
    }
    return s;
  }
  
  export const onRequestPost: PagesFunction<{ SHORTLINKS: KVNamespace; API_TOKEN: string; BASE_URL: string }> =
    async (ctx) => {
      const auth = ctx.request.headers.get("authorization");
      if (!auth || auth !== `Bearer ${ctx.env.API_TOKEN}`) {
        return new Response("unauthorized", { status: 401 });
      }
  
      let body;
      try {
        body = await ctx.request.json();
      } catch {
        return new Response("invalid body", { status: 400 });
      }
  
      const url = String(body?.url || "").trim();
      if (!/^https?:\/\//.test(url)) {
        return new Response("invalid url", { status: 400 });
      }
  
      let slug = body?.slug || randomSlug();
      const exists = await ctx.env.SHORTLINKS.get(slug);
      if (exists) {
        return new Response("slug already exists", { status: 409 });
      }
  
      await ctx.env.SHORTLINKS.put(slug, url);
  
      return new Response(`${ctx.env.BASE_URL}/s/${slug}\n`, {
        headers: { "content-type": "text/plain" },
      });
    };
  