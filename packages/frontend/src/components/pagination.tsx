'use client';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useCallback } from 'react';

const Pagination = () => {
  const searchParams = useSearchParams();
  const page = searchParams.get('page') ? Number(searchParams.get('page')) : 1;
  const isFirstPage = page === 1;

  const createQueryString = useCallback(
    (next: boolean) => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const params = new URLSearchParams(searchParams);
      if (!next && page <= 1) return params.toString();
      params.set('page', next ? `${page + 1}` : `${page - 1}`);

      return params.toString();
    },
    [page, searchParams]
  );
  return (
    <div className="flex float-right gap-3 mb-5">
      {!isFirstPage && (
        <Link
          className="inline-block px-12 py-3 text-sm font-medium text-white bg-orange-500 border border-orange-500 rounded-lg active:text-orange-500 hover:bg-orange-600 focus:outline-none focus:ring opacity-90"
          href={`?${createQueryString(false)}`}
          onClick={(e) => page === 1 && e.preventDefault()}
        >
          back
        </Link>
      )}
      <Link
        className="inline-block px-12 py-3 text-sm font-medium text-white bg-orange-500 border border-orange-500 rounded-lg hover:bg-orange-600 focus:outline-none focus:ring active:text-orange-500 opacity-90"
        href={`?${createQueryString(true)}`}
      >
        next
      </Link>
    </div>
  );
};

export default Pagination;
