import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function SearchInput() {
  const router = useRouter();
  const pathname = usePathname();
  const [query, setQuery] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
      if (query) {
        const params = new URLSearchParams();
        params.set('query', query);
        router.push(`?${params.toString()}`);
      } else if (pathname === '/') {
        router.push(`/`);
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [pathname, query, router]);

  return (
    <input
      className="w-full h-10 p-5 text-sm bg-white border-none rounded-full shadow-sm pe-10 ps-4 sm:w-56"
      id="search"
      type="search"
      placeholder="search"
      value={query}
      onChange={(e) => setQuery(e.target.value)}
    />
  );
}
