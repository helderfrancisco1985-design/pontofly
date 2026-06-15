import { notFound } from "next/navigation";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import BackButton from "@/components/ui/BackButton";
import InstagramReel from "@/components/blog/InstagramReel";
import { posts } from "@/lib/blog-data";
import { getLocale } from "@/lib/get-locale";
import { getTranslation } from "@/lib/translations";

const PURPLE = "#543286";

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);
  if (!post) return {};
  return {
    title: `${post.title} — Blog Ponto Fly`,
    description: post.excerpt,
  };
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);
  if (!post) notFound();

  const locale = await getLocale();
  const t = getTranslation(locale);

  return (
    <>
      <Header />
      <main className="min-h-screen bg-white">
        <div className="mx-auto max-w-2xl px-6 py-20">

          <div className="mb-8 flex w-fit">
            <BackButton />
          </div>

          <span
            className="mb-6 inline-block rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-widest text-white"
            style={{ backgroundColor: PURPLE }}
          >
            {post.category}
          </span>

          <h1 className="mb-4 text-4xl font-semibold leading-tight text-zinc-900 sm:text-5xl">
            {post.title}
          </h1>

          <div className="mb-8 flex items-center gap-3 text-sm text-zinc-400">
            <span>{post.date}</span>
            <span>·</span>
            <span>{post.readTime} {t.article.minRead}</span>
          </div>

          <div className="mb-10 h-px w-16" style={{ backgroundColor: PURPLE }} />

          <p className="mb-10 text-xl leading-relaxed text-zinc-600 font-medium">
            {post.excerpt}
          </p>

          <div className="flex flex-col gap-6">
            {post.content.map((block, i) => {
              if (block.type === "heading") {
                return (
                  <h2
                    key={i}
                    className="mt-4 text-2xl font-semibold text-zinc-900"
                    style={{ color: PURPLE }}
                  >
                    {block.text}
                  </h2>
                );
              }

              if (block.type === "list") {
                return (
                  <ul key={i} className="flex flex-col gap-2 pl-2">
                    {block.items.map((item, j) => (
                      <li key={j} className="flex gap-3 text-base leading-relaxed text-zinc-600">
                        <span className="mt-2 h-1.5 w-1.5 flex-none rounded-full" style={{ backgroundColor: PURPLE }} />
                        {item}
                      </li>
                    ))}
                  </ul>
                );
              }

              return (
                <p key={i} className="text-base leading-relaxed text-zinc-600">
                  {block.text}
                </p>
              );
            })}
          </div>

          {post.reelUrl && <InstagramReel url={post.reelUrl} />}

          <div className="mt-16 rounded-2xl border border-zinc-100 bg-zinc-50 px-8 py-8 text-center">
            <p className="text-base font-medium text-zinc-700">
              {t.article.followUs}
            </p>
            <a
              href="https://www.instagram.com/ponto.fly/"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-block rounded-full px-6 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
              style={{ backgroundColor: PURPLE }}
            >
              @ponto.fly
            </a>
          </div>

        </div>
      </main>
      <Footer />
    </>
  );
}
