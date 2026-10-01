import axios from "axios";
// import { useEffect, useState } from "react";
// import toast from "react-hot-toast";
import Posts from "../Posts/Posts";
// import type { PostsType } from "../../interface/PostInterface";
import { useQuery } from "@tanstack/react-query";
import CreatePost from "../CreatePost/CreatePost";

const Home = () => {
  // const [posts, setPosts] = useState<PostsType | null>(null);
  // async function getAllPosts() {
  //   try {
  //     const { data } = await axios.get(
  //       "https://route-posts.routemisr.com/posts",
  //       {
  //         headers: {
  //           Authorization: `Bearer ${localStorage.getItem("token")}`,
  //         },
  //       },
  //     );

  //     console.log(data.data.posts);
  //     toast.success(data.message);
  //     setPosts(data.data.posts);
  //   } catch (error: unknown) {
  //     if (isAxiosError(error)) {
  //       toast.error(error?.response?.data.message);
  //     } else {
  //       toast.error("something went wrong");
  //     }
  //   }
  // }

  function getAllPosts() {
    return axios.get("https://route-posts.routemisr.com/posts", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
  }

  const { data, isError, isFetching, isLoading } = useQuery({
    queryKey: ["posts"],
    queryFn: getAllPosts,
    // refetchOnMount: false,
    // refetchInterval:3000,
    // retry:2,
    // retryDelay:3000,
    // gcTime:3000,
    // enabled:false,
  });

  // console.log(data,"data");
  // console.log(isError,"isError");
  // console.log(isFetching,"isFetching");
  // console.log(isLoading,"isLoading");

  // useEffect(() => {
  //   getAllPosts();
  // }, []);

  return (
    <section className="min-h-screen bg-gray-100 pt-9">
      <div className="container mx-auto max-w-2xl px-4">
        {/* Create Post */}

        <CreatePost/>

        {/* Posts */}
        {isLoading ? (
          <div className="space-y-5">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="h-80 animate-pulse rounded-xl bg-white shadow-sm"
              ></div>
            ))}
          </div>
        ) : data?.data?.data.posts.length === 0 ? (
          <div className="rounded-xl bg-white p-8 text-center text-gray-500 shadow-sm">
            No posts available
          </div>
        ) : (
          <div className="space-y-5">
            {data?.data?.data.posts.map((post) => (
              <Posts key={post._id} post={post} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Home;
