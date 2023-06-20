import Link from 'next/link';
import { Hit } from '../types';
import { relativeDateTime, shortenUrl } from '../utils';

export default function Item({
  objectID,
  title,
  url,
  created_at,
  points,
  author,
  num_comments,
}: Hit) {
  return (
    <div className="relative block p-6 overflow-hidden bg-gray-100 border border-gray-100 rounded-lg h-52 w-80 grow sm:p-6 lg:p-8">
      <span className="absolute inset-x-0 bottom-0 h-2 bg-gradient-to-r from-red-500 to-orange-500" />

      <div className="opacity-80">
        <span className="text-lg font-bold sm:text-xl opacity-80">
          {title}{' '}
        </span>
      </div>
      <div className="absolute bottom-10">
        <div className="flex justify-between mt-2 text-xs font-light opacity-50">
          {url && <Link href={url}>{shortenUrl(url)}</Link>}

          <p className="">by {author}</p>
        </div>
        <dl className="flex justify-between mt-2 text-xs font-light text-gray-600 opacity-70 sm:gap-6">
          <dt className="">{points} points</dt>
          <Link href={`item/${objectID}`}>
            <dt className="">{num_comments} comments</dt>
          </Link>
          <dd className="">{relativeDateTime(created_at)}</dd>
        </dl>
      </div>
    </div>
  );
}
