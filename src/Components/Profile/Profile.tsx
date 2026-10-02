import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import Posts from "../Posts/Posts";
import CreatePost from "../CreatePost/CreatePost";

const Profile = () => {
  const { user } = jwtDecode(localStorage.getItem("token") || "") as {
    user: string;
  };

  function getUserPosts() {
    return axios.get(`https://route-posts.routemisr.com/users/${user}/posts`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
  }
  const { data, isLoading,isError } = useQuery({
    queryKey: ["userPosts", user],
    queryFn: getUserPosts,
  });

  return (
    <div className="min-h-screen bg-gray-100 pb-10">
      {/* Cover & Profile Header */}
      <div className="mx-auto max-w-5xl">
        <div className="overflow-hidden rounded-b-2xl bg-white shadow-sm">
          {/* Cover */}
          <div className="relative h-64 bg-linear-to-r from-blue-500 via-blue-600 to-indigo-600 sm:h-80">
            <button className="absolute bottom-4 right-4 rounded-lg bg-white/90 px-4 py-2 text-sm font-semibold text-gray-700 shadow hover:bg-white">
              📷 Edit Cover Photo
            </button>
          </div>

          {/* Profile Info */}
          <div className="relative px-5 pb-5 sm:px-8">
            {/* Profile Image */}
            <div className="-mt-20 flex items-end">
              <div className="flex h-36 w-36 items-center justify-center rounded-full border-4 border-white bg-blue-600 text-5xl font-bold text-white shadow-md">
                M
              </div>
            </div>

            <div className="mt-4 flex flex-col justify-between gap-4 md:flex-row md:items-center">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  Mohamed Khater
                </h1>

                <p className="mt-1 text-sm text-gray-500">120 Friends</p>

                <p className="mt-2 max-w-xl text-gray-600">
                  Front-End Developer | React.js 🚀
                </p>
              </div>

              <div className="flex gap-2">
                <button className="rounded-lg bg-blue-600 px-5 py-2.5 font-semibold text-white transition hover:bg-blue-700">
                  + Add Story
                </button>

                <button className="rounded-lg bg-gray-200 px-5 py-2.5 font-semibold text-gray-700 transition hover:bg-gray-300">
                  Edit Profile
                </button>
              </div>
            </div>

            {/* Tabs */}
            <div className="mt-6 flex gap-6 border-t pt-3">
              <button className="border-b-3 border-blue-600 px-2 py-3 font-semibold text-blue-600">
                Posts
              </button>

              <button className="px-2 py-3 font-semibold text-gray-500 hover:bg-gray-100">
                About
              </button>

              <button className="px-2 py-3 font-semibold text-gray-500 hover:bg-gray-100">
                Friends
              </button>

              <button className="px-2 py-3 font-semibold text-gray-500 hover:bg-gray-100">
                Photos
              </button>
            </div>
          </div>
        </div>

        {/* Profile Content */}
        <div className="mt-5 grid gap-5 md:grid-cols-3">
          {/* Intro */}
          <div className="rounded-2xl bg-white p-5 shadow-sm">
            <h2 className="text-xl font-bold text-gray-900">Intro</h2>

            <p className="mt-4 text-center text-gray-600">
              Front-End Developer passionate about building modern web
              applications with React.js.
            </p>

            <div className="mt-5 space-y-4 border-t pt-4 text-sm text-gray-600">
              <p>💻 Front-End Developer</p>
              <p>⚛️ React.js Developer</p>
              <p>📍 Egypt</p>
              <p>🎓 Beni Suef University</p>
            </div>

            <button className="mt-5 w-full rounded-lg bg-gray-100 py-2.5 font-semibold text-gray-700 hover:bg-gray-200">
              Edit Details
            </button>
          </div>

          {/* Posts */}
          <div className="space-y-5 md:col-span-2">
            {/* Create Post */}
           <CreatePost/>

            {/* Example Post */}

            {isLoading ? (
              <div className="space-y-5">
                {[1, 2, 3].map((item) => (
                  <div
                    key={item}
                    className="rounded-2xl bg-white p-5 shadow-sm"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-11 w-11 items-center justify-center rounded-full bg-blue-600 font-bold text-white">
                        M
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : isError ? (
              <div className="flex justify-center items-center h-screen">
                <p>Error fetching post details</p>
              </div>
            ) : (
              <div className="space-y-5">
                {data?.data.data.posts.map((post: any) => (
                  <Posts key={post.id} post={post} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
