import { Button, Dropdown, Label } from "@heroui/react";
import { Link, useLocation } from "react-router-dom";
import type { Post } from "../../interface/PostInterface";
import PostComments from "../PostComments/PostComments";
import CreateComment from "../CreateComment/CreateComment";
import DeletePost from "../DeletePost/DeletePost";
import { jwtDecode } from "jwt-decode";

const Posts = ({ post }: { post: Post }) => {
  const { pathname } = useLocation();

  const { user } = jwtDecode(localStorage.getItem("token") || "") as {
    user: string;
  };

  return (
    <article className="overflow-hidden rounded-xl bg-white shadow-sm">
      {/* Post Header */}
      <div className="flex items-center justify-between gap-3 p-3 sm:p-4">
        <div className="flex min-w-0 items-center gap-3">
          <img
            src={post.user?.photo || "https://ui-avatars.com/api/?name=User"}
            alt={post.user?.name || "User"}
            className="h-10 w-10 shrink-0 rounded-full object-cover sm:h-11 sm:w-11"
          />
          <div className="min-w-0">
            <h3 className="truncate font-semibold text-gray-900">
              {post.user?.name || "Unknown User"}
            </h3>
            <p className="text-xs text-gray-500">
              {post.createdAt
                ? new Date(post.createdAt).toLocaleString()
                : "Just now"}
            </p>
          </div>
        </div>
        <div className="shrink-0">
          {post.user?._id === user && <DeletePost id={post.id} />}
        </div>
      </div>
      {/* Post Content */}
      {post.body && (
        <div className="px-3 pb-3 sm:px-4 sm:pb-4">
          <p className="whitespace-pre-wrap wrap-break-word text-[14px] leading-6 text-gray-800 sm:text-[15px]">
            {post.body}
          </p>
        </div>
      )}
      {/* Post Image */}
      {post.image && (
        <img
          src={post.image}
          alt="Post"
          className="max-h-125 w-full object-cover"
        />
      )}
      {/* Stats */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-t border-gray-100 px-3 py-2.5 text-xs text-gray-500 sm:px-4 sm:py-3 sm:text-sm">
        {/* Likes */}
        <div className="flex shrink-0 items-center gap-1">
          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-500 text-xs text-white">
            👍
          </span>
          <span>{post.likesCount || 0}</span>
        </div>
        {/* Comments + Shares + Details */}
        <div className="flex min-w-0 flex-wrap items-center justify-end gap-x-3 gap-y-1 sm:gap-4">
          <span className="cursor-pointer whitespace-nowrap hover:underline">
            {post.commentsCount || 0} comments
          </span>
          <span className="cursor-pointer whitespace-nowrap hover:underline">
            0 shares
          </span>
          {pathname === "/" && (
            <Link
              to={`/post/${post.id}`}
              className="rounded-md px-1.5 py-1 font-semibold text-blue-500 transition-all duration-300 hover:bg-blue-50 hover:text-blue-700 sm:px-2"
            >
              View Details
            </Link>
          )}
        </div>
      </div>
      {/* Actions */}
      <div className="mx-3 border-t border-gray-200 py-2 sm:mx-4">
        <div className="grid grid-cols-3 gap-1">
          <button className="min-w-0 rounded-lg px-1 py-2 text-xs font-semibold text-gray-600 transition hover:bg-gray-100 sm:px-2 sm:text-sm">
            👍 <span className="hidden xs:inline">Like</span>
            <span className="xs:hidden">Like</span>
          </button>
          <button className="min-w-0 rounded-lg px-1 py-2 text-xs font-semibold text-gray-600 transition hover:bg-gray-100 sm:px-2 sm:text-sm">
            💬 <span>Comment</span>
          </button>
          <button className="min-w-0 rounded-lg px-1 py-2 text-xs font-semibold text-gray-600 transition hover:bg-gray-100 sm:px-2 sm:text-sm">
            ↗️ <span>Share</span>
          </button>
        </div>
      </div>
      {/* Comment Input */} <CreateComment id={post.id} /> {/* Top Comment */}
      {post.topComment && pathname === "/" && (
        <div className="flex items-start justify-between gap-2 bg-slate-200 p-2 sm:gap-3 sm:p-3">
          <div className="flex min-w-0 flex-1 items-start gap-2 sm:gap-3">
            <img
              src={
                post.topComment?.commentCreator.photo ||
                "https://ui-avatars.com/api/?name=User"
              }
              alt={post.topComment?.commentCreator.name || "User"}
              className="h-9 w-9 shrink-0 rounded-full object-cover sm:h-11 sm:w-11"
            />
            <div className="min-w-0 flex-1">
              <h3 className="truncate text-sm font-semibold text-gray-900 sm:text-base">
                {post.topComment?.commentCreator.name || "Unknown User"}
              </h3>
              <p className="text-2xs text-gray-500 sm:text-xs">
                {post.topComment.createdAt
                  ? new Date(post.topComment?.createdAt).toLocaleString()
                  : "Just now"}
              </p>
              <div className="mt-1">
                {post.topComment?.content && (
                  <p className="wrap-break-word text-sm leading-5 text-gray-800">
                    {post.topComment.content}
                  </p>
                )}
                {post.topComment?.image && (
                  <img
                    src={post.topComment?.image}
                    alt="Comment"
                    className="mt-2 max-h-48 max-w-full rounded-lg object-cover sm:max-w-50"
                  />
                )}
              </div>
            </div>
          </div>
          <div className="shrink-0">
            <Dropdown>
              <Button
                aria-label="Menu"
                variant="secondary"
                className="min-w-0 px-2 text-xs sm:px-3 sm:text-sm"
              >
                Actions
              </Button>
              <Dropdown.Popover>
                <Dropdown.Menu
                  onAction={(key) => console.log(`Selected: ${key}`)}
                >
                  <Dropdown.Item id="new-file" textValue="New file">
                    <Label>New file</Label>
                  </Dropdown.Item>
                  <Dropdown.Item id="copy-link" textValue="Copy link">
                    <Label>Copy link</Label>
                  </Dropdown.Item>
                  <Dropdown.Item id="edit-file" textValue="Edit file">
                    <Label>Edit file</Label>
                  </Dropdown.Item>
                  <Dropdown.Item
                    id="delete-file"
                    textValue="Delete file"
                    variant="danger"
                  >
                    <Label>Delete file</Label>
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown.Popover>
            </Dropdown>
          </div>
        </div>
      )}
      {/* All Comments */}
      {post.commentsCount > 0 && pathname !== "/" && (
        <PostComments id={post.id} />
      )}
    </article>
  );
};

export default Posts;
