import Link from 'next/link';
import SearchInput from './search-input';
import { useSearchParams } from 'next/navigation';
import { Tags } from '../api';

export default function Header() {
  const searchParams = useSearchParams();
  const tag = searchParams.get('tags');
  return (
    <div className="flex items-baseline justify-between gap-4 mb-5">
      <h1 className="text-2xl font-bold text-gray-500 sm:text-3xl">
        hn search
      </h1>
      <div className="flex gap-3">
        <Link
          href={`?tags=${Tags.FRONT_PAGE}`}
          className={`p-2 text-gray-400 ${
            tag === 'front_page' && 'bg-slate-300'
          } rounded-lg hover:bg-gray-200`}
        >
          front page
        </Link>
        <Link
          href={`?tags=${Tags.SHOW_HN}`}
          className={`p-2 text-gray-400 ${
            tag === 'show_hn' && 'bg-slate-300'
          } rounded-lg hover:bg-gray-200`}
        >
          show hn
        </Link>
        <Link
          href={`?tags=${Tags.ASK_HN}`}
          className={`p-2 text-gray-400 ${
            tag === 'ask_hn' && 'bg-slate-300'
          } rounded-lg hover:bg-gray-200`}
        >
          ask hn
        </Link>
      </div>
      <div className="flex items-center gap-4">
        <div className="relative">
          <label className="sr-only" htmlFor="search">
            Search
          </label>

          <SearchInput />

          <button
            type="button"
            className="absolute p-2 text-gray-600 transition -translate-y-1/2 rounded-full end-1 top-1/2 bg-gray-50 hover:text-gray-700"
          >
            <span className="sr-only">Search</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
