import Link from "next/link";
import { posts } from "@/lib/blog-data";
import { getLocale } from "@/lib/get-locale";
import { getTranslation } from "@/lib/translations";

export default async function Blog() {
  const locale = await getLocale();
  const t = getTranslation(locale);

  return (
    <section id="blog" className="w-full bg-zinc-50 py-24 px-6">
      <div className="mx-auto max-w-7xl">

        <div className="mb-14 text-center">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-zinc-400">
            {t.blog.sectionLabel}
          </p>
          <h2 className="text-4xl font-semibold text-zinc-900 sm:text-5xl">
            {t.blog.title} <span style={{ color: "#543286" }}>Ponto Fly</span>
          </h2>
          <p className="mx-auto mt-4 max-w-md text-lg text-zinc-500">
            {t.blog.description}
          </p>
          <div className="mx-auto mt-5 h-px w-16" style={{ backgroundColor: "#543286" }} />
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <article
              key={post.slug}
              className="group flex flex-col rounded-2xl bg-white p-8 shadow-sm ring-1 ring-zinc-100 transition-shadow hover:shadow-md"
            >
              <span
                className="mb-4 inline-block self-start rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-widest text-white"
                style={{ backgroundColor: "#543286" }}
              >
                {post.category}
              </span>

              <h3 className="mb-3 text-xl font-semibold leading-snug text-zinc-900 sm:text-2xl">
                {post.title}
              </h3>

              <p className="flex-1 text-base leading-relaxed text-zinc-500">
                {post.excerpt}
              </p>

              <Link
                href={`/blog/${post.slug}`}
                className="mt-7 inline-flex items-center gap-2 text-sm font-semibold transition-opacity hover:opacity-75"
                style={{ color: "#543286" }}
              >
                {t.blog.readArticle}
                <span aria-hidden="true">→</span>
              </Link>
            </article>
          ))}
        </div>

        <div className="mt-14 text-center">
          <Link
            href="/blog"
            className="inline-block rounded-full border border-[#543286] px-8 py-3 text-sm font-semibold text-[#543286] transition-colors hover:bg-[#543286] hover:text-white"
          >
            {t.blog.viewAll}
          </Link>
        </div>

      </div>
    </section>
  );
}
