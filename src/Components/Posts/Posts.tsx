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
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center gap-3">
          <img
            src={post.user?.photo || "https://ui-avatars.com/api/?name=User"}
            alt={post.user?.name || "User"}
            className="h-11 w-11 rounded-full object-cover"
          />
          <div>
            <h3 className="font-semibold text-gray-900">
              {post.user?.name || "Unknown User"}
            </h3>
            <p className="text-xs text-gray-500">
              {post.createdAt
                ? new Date(post.createdAt).toLocaleString()
                : "Just now"}
            </p>
          </div>
        </div>
        <div>{post.user?._id === user && <DeletePost id={post.id} />}</div>
      </div>
      {/* <p>{post._id}</p> */}
      {/* Post Content */}
      <div className="px-4 pb-4">
        {post.body && (
          <p className="whitespace-pre-wrap text-[15px] leading-6 text-gray-800">
            {post.body}
          </p>
        )}
      </div>
      {/* Post Image */}
      {post.image && (
        <img src={post.image} alt="Post" className=" w-full object-cover" />
      )}
      {/* Stats */}
      <div className="flex items-center justify-between border-t border-gray-100 px-4 py-3 text-sm text-gray-500">
        {/* Likes */}
        <div className="flex items-center gap-1">
          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-500 text-xs text-white">
            👍
          </span>

          <span>{post.likesCount || 0}</span>
        </div>

        {/* Comments + Shares + Details */}
        <div className="flex items-center gap-4">
          <span className="cursor-pointer hover:underline">
            {post.commentsCount || 0} comments
          </span>

          <span className="cursor-pointer hover:underline">0 shares</span>

          {pathname === "/" && (
            <Link
              to={`/post/${post.id}`}
              className="rounded-md px-2 py-1 font-semibold text-blue-500 transition-all duration-300 hover:bg-blue-50 hover:text-blue-700"
            >
              View Details
            </Link>
          )}
        </div>
      </div>
      {/* Actions */}
      <div className="mx-4 border-t border-gray-200 py-2">
        <div className="grid grid-cols-3">
          <button className="rounded-lg py-2 font-semibold text-gray-600 transition hover:bg-gray-100">
            👍 Like
          </button>
          <button className="rounded-lg py-2 font-semibold text-gray-600 transition hover:bg-gray-100">
            💬 Comment
          </button>
          <button className="rounded-lg py-2 font-semibold text-gray-600 transition hover:bg-gray-100">
            ↗️ Share
          </button>
        </div>
      </div>
      {/* Comment Input */}
      <CreateComment id={post.id} />
      {/* Comments User */}
      {post.topComment && pathname === "/" && (
        <div className="flex items-center gap-3 justify-between p-2 bg-slate-200">
          <div className="flex items-center gap-3">
            <img
              src={
                post.topComment?.commentCreator.photo ||
                "https://ui-avatars.com/api/?name=User"
              }
              alt={post.topComment?.commentCreator.name || "User"}
              className="h-11 w-11 rounded-full object-cover"
            />
            <div>
              <h3 className="font-semibold text-gray-900">
                {post.topComment?.commentCreator.name || "Unknown User"}
              </h3>
              <p className="text-xs text-gray-500">
                {post.topComment.createdAt
                  ? new Date(post.topComment?.createdAt).toLocaleString()
                  : "Just now"}
              </p>
              <div>
                {post.topComment?.content && <p>{post.topComment.content}</p>}

                {post.topComment?.image && (
                  <img
                    src={
                      post.topComment?.image ||
                      "https://ui-avatars.com/api/?name=User"
                    }
                    alt="Comment"
                    className="w-33 mt-2 rounded-lg object-cover"
                  />
                )}
              </div>
            </div>
          </div>

          <Dropdown>
            <Button aria-label="Menu" variant="secondary">
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
      )}

      {post.commentsCount > 0 && pathname !== "/" && (
        <PostComments id={post.id} />
      )}
    </article>
  );
};

export default Posts;
