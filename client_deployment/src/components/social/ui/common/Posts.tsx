import Post from "./Post";
import PostSkeleton from "../skeletons/PostSkeleton";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

const Posts = ({feedType, username, userId}) => {
	const getPostEndpoint = () => {
		switch (feedType) {
			case 'forYou':
				return 'https://auto-showroom-backend.onrender.com/api/posts/all';
			case 'following':
				return 'https://auto-showroom-backend.onrender.com/api/posts/following';
			case 'posts':
				return `https://auto-showroom-backend.onrender.com/api/posts/user/posted/${username}`;
			case 'likes':
				return `https://auto-showroom-backend.onrender.com/api/posts/liked/${username}/${userId}`;
			default:
				return 'https://auto-showroom-backend.onrender.com/api/posts/all';
		}
	}

	const POST_ENDPOINT = getPostEndpoint();

	const{data: posts, isLoading, refetch, isRefetching} = useQuery({
		queryKey: ['posts'],
		queryFn: async () => {
			try {
				const response = await fetch(POST_ENDPOINT);
				const data = await response.json();

				if(!response.ok){
					throw new Error(data.message || 'Something went wrong!');
				}

				return data;
			} catch (error) {
				throw new Error(error);
			}
		},
	});

	useEffect(() => {
		refetch();
	}, [feedType, refetch, username]);

	return (
		<>
			{isLoading || isRefetching && (
				<div className='flex flex-col justify-center'>
					<PostSkeleton />
					<PostSkeleton />
					<PostSkeleton />
				</div>
			)}
			{!isLoading && !isRefetching && posts?.length === 0 && <div className='text-center my-4'>
				There is nothing in this tab. Switch 👻
			</div>}
			{!isLoading && !isRefetching && posts && (
				<div>
					{posts.map((post) => (
						<Post key={post._id} post={post} />
					))}
				</div>
			)}
		</>
	);
};
export default Posts;