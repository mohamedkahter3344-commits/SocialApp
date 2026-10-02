import { Button, Spinner } from "@heroui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import React, { useRef, useState } from "react";
import toast from "react-hot-toast";

const CreatePost = () => {
  const postBody = useRef<HTMLInputElement>(null);
  const postImage = useRef<HTMLInputElement>(null);

  const [image, setImage] = useState<string | null>(null);
  const [img, setImg] = useState<File | null>(null);

  const queryClient = useQueryClient();

  const { isPending, mutate } = useMutation({
    mutationFn: handlePostSubmit,

    onSuccess: (data) => {
      toast.success(data.data.message);
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      queryClient.invalidateQueries({ queryKey: ["userPosts"] });

      // Profile
      removeImage(new MouseEvent("click") as any);
      postBody.current!.value = "";
    },

    onError: (error) => {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data.message);
      } else {
        toast.error("something went wrong");
      }
    },
  });

  function handlePostSubmit() {
    const formData = new FormData();

    if (postBody.current?.value.trim() !== "") {
      formData.append("body", postBody.current?.value ?? "");
    }
    if (img !== null) {
      formData.append("image", img);
    }

    return axios.post("https://route-posts.routemisr.com/posts", formData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "multipart/form-data",
      },
    });
  }

  function handleImageChange() {
    const file = postImage.current?.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setImage(url);
    setImg(file);
  }

  function removeImage(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.stopPropagation();
    setImage(null);
    setImg(null);
    postImage.current = null;
  }
  return (
    <div className="mb-6 rounded-2xl bg-white p-5 shadow-sm">
      {/* Post text */}
      <div className="flex items-start gap-3">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-blue-600 font-bold text-white">
          M
        </div>

        <input
          ref={postBody}
          type="text"
          placeholder="What's on your mind?"
          className="flex-1 rounded-full bg-gray-100 px-5 py-3 text-sm text-gray-700 outline-none transition-all duration-200 placeholder:text-gray-400 focus:bg-gray-200"
        />
      </div>
      {image ? (
        <div className="relative mt-4">
          <img
            src={image}
            className="max-h-60 w-full rounded-lg object-cover"
            alt=""
          />

          <button
            type="button"
            onClick={removeImage}
            className="absolute right-2 top-2 hover:bg-red-500 flex h-8 w-8 items-center justify-center rounded-full bg-black/60 text-xl font-bold text-white transition"
          >
            ×
          </button>
        </div>
      ) : (
        <div className="mt-4 border-t border-gray-200 pt-4">
          <label className="flex cursor-pointer items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold text-gray-600 transition hover:bg-gray-100">
            <span className="text-xl">🖼️</span>
            <span>Photo / Video</span>

            <input
              type="file"
              ref={postImage}
              onChange={handleImageChange}
              className="hidden"
            />
          </label>
        </div>
      )}
      {/* Actions */}
      <Button
        type="button"
        onClick={() => mutate()}
        className="flex h-11 my-3 w-full shrink-0 cursor-pointer items-center justify-center rounded-xl bg-blue-600 text-lg text-white transition-all duration-200 hover:bg-blue-700 hover:shadow-md active:scale-95"
        isPending={isPending}
      >
        {({ isPending }) => (
          <>{isPending ? <Spinner color="current" size="sm" /> : null}➤</>
        )}
      </Button>
    </div>
  );
};

export default CreatePost;
