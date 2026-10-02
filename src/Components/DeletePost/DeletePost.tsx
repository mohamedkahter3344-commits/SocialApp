import { Button } from '@heroui/react'
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import toast from 'react-hot-toast';

const DeletePost = ({id}: {id: string}) => {

    const queryClient = useQueryClient();

    const {isPending,mutate} =useMutation({
        mutationFn: handleDeletePost,
        onSuccess: (data: any) => {
            toast.success(data?.data.message);
            queryClient.invalidateQueries({queryKey: ['posts']});
            queryClient.invalidateQueries({queryKey: ["userPosts"]});
            // Profile
        },
        onError: (error) => {
            if (axios.isAxiosError(error)) {
                toast.error(error.response?.data.message);
            } else {
                toast.error("something went wrong");
            }
        }
    });


    function handleDeletePost() {
        return axios.delete(`https://route-posts.routemisr.com/posts/${id}`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });
    }

    return (
        <>
            <Button variant='danger' fullWidth onClick={()=>mutate()} isPending={isPending}>
                {isPending ? 'Deleting...' : 'Delete'}
            </Button>
        </>
    )
}

export default DeletePost
