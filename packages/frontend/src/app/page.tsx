import { Metadata } from 'next';
import { Tags, fetchPosts } from '../api';
import Item from '../components/item';
import Pagination from '../components/pagination';

export const metadata: Metadata = {
  title: 'HN Search',
  description: 'An alternative UI for exploring hacker news',
};

type Props = {
  searchParams: { tags?: string; query?: string; page?: number };
};

export default async function Index({
  searchParams: { query, tags = Tags.FRONT_PAGE, page },
}: Props) {
  const posts = query
    ? await fetchPosts('query', query, page)
    : await fetchPosts('tags', tags, page);

  return (
    <>
      <div className="flex flex-wrap gap-5 mb-5">
        {posts.hits.map((hit) => (
          <Item key={hit.objectID} {...hit} />
        ))}
      </div>
      <Pagination />
    </>
  );
}
