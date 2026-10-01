import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useParams } from "react-router-dom";
import Posts from "../Posts/Posts";

const PostDetails = () => {
  const { id } = useParams();



  function getPostDetails() {
    return axios.get(`https://route-posts.routemisr.com/posts/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
  }


  const { data, isError, isLoading } = useQuery({
    queryKey: ["post", id],
    queryFn: getPostDetails,
  });


  return (
    
  <>
  {
    isLoading ? (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    ) : isError ? (
      <div className="flex justify-center items-center h-screen">
        <p>Error fetching post details</p>
      </div>
    ) : (
      <div className="mx-auto w-full max-w-2xl px-4 py-6">

        <Posts post = {data?.data?.data?.post} />
      </div>
    )
  }
  </>
  );
};

export default PostDetails;
