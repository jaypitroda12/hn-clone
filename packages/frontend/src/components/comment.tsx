import { ItemResponse } from '../types';
import { relativeDateTime } from '../utils';

type Props = {
  comment: ItemResponse;
};

export default function Comment({ comment }: Props) {
  return (
    <details className="group [&_summary::-webkit-details-marker]:hidden mb-2">
      <summary className="flex items-center justify-between gap-1.5 rounded bg-gray-50 p-4 border-solid border-l-2 border-l-orange-500">
        <div>
          <div className="flex gap-2 text-xs opacity-40">
            <span>{comment.author}</span>
            <span>{relativeDateTime(comment.created_at)}</span>
          </div>
          <span
            className="text-sm opacity-60"
            dangerouslySetInnerHTML={{ __html: comment.text }}
          />
        </div>

        {comment.children.length > 0 && (
          <div className="cursor-pointer">
            <svg
              className="w-5 h-5 transition duration-300 opacity-50 shrink-0 group-open:-rotate-180"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
        )}
      </summary>

      <div className="ml-2">
        {comment.children.map((childComment) => (
          <Comment key={comment.id} comment={childComment} />
        ))}
      </div>
    </details>
  );
}
