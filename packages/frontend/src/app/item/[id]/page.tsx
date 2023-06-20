import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { fetchItem } from '../../../api';
import { relativeDateTime, shortenUrl } from '../../../utils';
import Comments from '../../../components/comment';

type Props = {
  params: { id: string };
};

export async function generateMetadata({
  params: { id },
}: Props): Promise<Metadata> {
  const { title, text } = await fetchItem(id);

  return { title, description: text };
}

export default async function Item({ params: { id } }: Props) {
  try {
    const { author, children, created_at, points, title, text, url } =
      await fetchItem(id);

    return (
      <>
        <div className="flex gap-2">
          <div className='text-lg font-bold'>{title}</div>
          {url && (
            <Link href={url} className="font-light opacity-50 text-s">
              {shortenUrl(url)}
            </Link>
          )}
        </div>
        <div className="flex gap-2 text-sm opacity-40">
          <div>{points} points</div>
          <div>by {author}</div>
          <div>{relativeDateTime(created_at)}</div>
        </div>
        <div
          className="my-2 opacity-60"
          dangerouslySetInnerHTML={{ __html: text }}
        />
        {children
          .sort((a, b) => (a.children.length < b.children.length ? 1 : -1))
          .map((comment) => (
            <Comments key={comment.id} comment={comment} />
          ))}
      </>
    );
  } catch (error) {
    return notFound();
  }
}
