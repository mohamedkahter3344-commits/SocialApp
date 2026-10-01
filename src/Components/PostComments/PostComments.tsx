import { Button, Dropdown, Label } from "@heroui/react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import type { Comment } from "../../interface/comments";

const PostComments = ({ id }: { id: string }) => {
  function getPostComments() {
    return axios.get(`https://route-posts.routemisr.com/posts/${id}/comments`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
  }

  const { data } = useQuery({
    queryKey: ["postComments", id],
    queryFn: getPostComments,
  });

  console.log(data);

  return (
    <>
      {data?.data?.data?.comments.map((comment: Comment) => (
        <div
          key={comment._id}
          className="flex items-center justify-between gap-3 bg-slate-200 p-2 my-3"
        >
          <div className="flex items-center gap-3">
            <img
              src={
                comment.commentCreator.photo ||
                "https://ui-avatars.com/api/?name=User"
              }
              alt={comment.commentCreator.name || "User"}
              className="h-11 w-11 rounded-full object-cover"
            />

            <div>
              <h3 className="font-semibold text-gray-900">
                {comment.commentCreator.name || "Unknown User"}
              </h3>

              <p className="text-xs text-gray-500">
                {comment.createdAt
                  ? new Date(comment.createdAt).toLocaleString()
                  : "Just now"}
              </p>

              {comment.content && <p>{comment.content}</p>}
              {comment.image && (
                <img
                  src={comment.image || "https://ui-avatars.com/api/?name=User"}
                  alt={comment.commentCreator.name || "User"}
                  className=" w-[25%] object-cover"
                />
              )}
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
      ))}
    </>
  );
};
export default PostComments;
