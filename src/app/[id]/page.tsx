import { resolve } from "path";

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export default async function IdPage({
  params: { id },
}: {
  params: { id: string };
}) {
  await sleep(3000);
  const post = await fetch(
    `https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`
  ).then(
    (res) =>
      res.json() as Promise<{
        text: string;
        title: string;
        by: string;
        url: string;
      }>
  );

  return <iframe className="h-full w-full" src={post.url} title={post.title} />;
}
