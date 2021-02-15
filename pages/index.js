import { useState, useEffect } from "react";
import Link from "next/link";
import { API } from "aws-amplify";
import { listPosts } from "../graphql/queries";

const Home = () => {
	const [posts, setPosts] = useState([]);
	useEffect(() => {
		fetchPosts();
	}, []);
	const fetchPosts = async () => {
		const postData = await API.graphql({
			query: listPosts,
		});
		setPosts(postData.data.listPosts.items);
	};

	return (
		<div>
			<h1 className="text-3xl font-semibold tracking-wide mt-6 mb-8">
				Posts
			</h1>
			{posts.map((post, index) => (
				<Link key={index} href={`/posts/${post.id}`}>
					<div className="cursor-pointer border-b border-gray-300 mt-8 pb-4">
						<h2 className="text-xl font-semibold">{post.title}</h2>
					</div>
				</Link>
			))}
		</div>
	);
};

export default Home;
