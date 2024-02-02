import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};
const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

function ListItemLoading() {
  return (
    <div className=" h-[64px] grid items-center">
      <div role="status" className="w-full animate-pulse">
        <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-full "></div>

        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
}

async function ListItem({ id }: { id: number }) {
  await sleep(Math.random() * 3000);
  const post = await fetch(
    `https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`
  ).then(
    (res) => res.json() as Promise<{ title: string; url: string; by: string }>
  );
  return (
    <li className="grid item-center truncate h-16">{post.title || post.by}</li>
  );
}

export default async function RootLayout({ children }: { children: any }) {
  const posts = await fetch(
    `https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty&limitToFirst=10&orderBy="$key"`
  ).then((res) => res.json() as Promise<number[]>);
  return (
    <html lang="en">
      <body className="grid h-screen grid-rows-[60px,1fr]">
        <header className="grid place-content-center bg-yellow-400 font-semibold text-black">
          Uizard Hackernewa Reader
        </header>
        <main className="grid grid-cols-[320px,1fr] gap-4">
          <aside>
            <ul className=" px-4 ">
              {posts.map((id) => (
                <Link key={id} href={`/${id}`}>
                  <Suspense fallback={<ListItemLoading />}>
                    <ListItem id={id} />
                  </Suspense>
                </Link>
              ))}
            </ul>
          </aside>
          <section>{children}</section>
        </main>
      </body>
    </html>
  );
}
