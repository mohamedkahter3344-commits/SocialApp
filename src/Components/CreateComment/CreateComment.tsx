import { Button, Spinner } from "@heroui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios, { isAxiosError } from "axios";
import { useRef, useState } from "react";
import toast from "react-hot-toast";

const CreateComment = ({ id }: { id: string }) => {
  const [image, setImage] = useState<string | null>(null);
  const [img, setImg] = useState<File | null>(null);

  const commentContent = useRef<HTMLInputElement>(null);
  const commentImage = useRef<HTMLInputElement>(null);

  const queryClient = useQueryClient();

  const { isPending, mutate } = useMutation({
    mutationFn: handleCommentChange,
    onSuccess: (data) => {
      toast.success(data.data.message);
      queryClient.invalidateQueries({
        queryKey: ["postComments", id],
      });
      queryClient.invalidateQueries({
        queryKey: ["posts"],
      });
      queryClient.invalidateQueries({ queryKey: ["userPosts"] });

      removeImage(new MouseEvent("click") as any);
      commentContent.current!.value = "";
    },
    onError: (error) => {
      if (isAxiosError(error)) {
        toast.error(error.response?.data.message);
      } else {
        toast.error("something went wrong");
      }
    },
  });

  function handleCommentChange() {
    const formData = new FormData();

    if (commentContent.current?.value.trim() !== "") {
      formData.append("content", commentContent.current?.value ?? "");
    }
    if (img !== null) {
      formData.append("image", img);
    }

    return axios.post(
      `https://route-posts.routemisr.com/posts/${id}/comments`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "multipart/form-data",
        },
      },
    );

    // try {
    //   const { data } = await axios.post(
    //     `https://route-posts.routemisr.com/posts/${id}/comments`,
    //     formData,
    //     {
    //       headers: {
    //         Authorization: `Bearer ${localStorage.getItem("token")}`,
    //         "Content-Type": "multipart/form-data",
    //       },
    //     },
    //   );

    //   setLoading(false);

    //   console.log(data);
    // } catch (error) {
    //   console.log(error);
    //   setLoading(false);
    // }

    // console.log(commentContent.current?.value);
    // console.log(commentImage.current?.files[0]);
    // console.log(img);
  }

  //   Handle Image Change

  function handleImageChange() {
    const file = commentImage.current?.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setImage(url);
    setImg(file);
  }

  //   Reset Image

  function removeImage(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.stopPropagation();
    setImage(null);
    setImg(null);
    commentImage.current = null;
  }

  return (
    <div className="flex gap-2 px-3 pb-4 sm:gap-3 sm:px-4">
      {/* User Avatar */}
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-blue-600 text-sm font-bold text-white sm:h-10 sm:w-10">
        M
      </div>
      {/* Inputs */}
      <div className="flex min-w-0 flex-1 items-center gap-1.5 sm:gap-2">
        {/* Text Input */}
        <input
          ref={commentContent}
          type="text"
          placeholder="Write a comment..."
          className="h-10 min-w-0 flex-1 rounded-xl border border-gray-200 bg-gray-100 px-3 text-xs outline-none transition-all duration-200 focus:border-blue-400 focus:bg-white focus:ring-2 focus:ring-blue-100 sm:h-11 sm:px-4 sm:text-sm"
        />
        {/* File Input */}
        <label
          className={`group relative flex h-10 shrink-0 cursor-pointer items-center justify-center overflow-visible rounded-xl border border-dashed border-gray-300 bg-gray-50 transition-all duration-200 hover:border-blue-400 hover:bg-blue-50 sm:h-11 ${image ? "w-12 border-solid sm:w-16" : "w-10 sm:w-28"}`}
        >
          {image ? (
            <>
              {/* Image */}
              <img
                src={image}
                alt="Selected"
                className="h-full w-full rounded-xl object-cover"
              />
              {/* X Button */}
              <button
                type="button"
                onClick={removeImage}
                className="absolute -right-2 -top-2 z-10 flex h-5 w-5 cursor-pointer items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white shadow-md transition hover:scale-110 hover:bg-red-600"
              >
                ×
              </button>
            </>
          ) : (
            <>
              <span className="text-lg transition-transform duration-200 group-hover:scale-110">
                📷
              </span>
              <span className="ml-2 hidden text-xs font-semibold text-gray-500 group-hover:text-blue-600 sm:inline">
                Add image
              </span>
            </>
          )}
          {/* File Input */}
          <input
            ref={commentImage}
            onChange={handleImageChange}
            type="file"
            className="hidden"
            accept="image/*"
          />
        </label>
        {/* Submit Button */}
        <Button
          type="button"
          onClick={() => mutate()}
          className="flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center rounded-xl bg-blue-600 text-base text-white transition-all duration-200 hover:bg-blue-700 hover:shadow-md active:scale-95 sm:h-11 sm:w-11 sm:text-lg"
          isPending={isPending}
        >
          {({ isPending }) => (
            <>{isPending ? <Spinner color="current" size="sm" /> : null}➤</>
          )}
        </Button>
      </div>
    </div>
  );
};

export default CreateComment;

// لعرض الصورة نفسها لازم تعمل موديل + الصورة محتاجه تظبط عشان كده بضغط على الصورة بيحذفها
