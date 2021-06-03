import { server } from "../../config/config";
function Posts({ post }) {
  return (
    <div className="p-4">
      <h1>{post.title}</h1>
      <small>{post.date}</small>
      <div
       dangerouslySetInnerHTML={{ __html: decodeURIComponent(post.content) }} 
      />
      <h6>
        written by <cite>{post.author}</cite>
      </h6>
    </div>
  );
}

export async function getServerSideProps(context) {
  const { post_id } = context.query;
  //   console.log(context.query);
  //   console.log(post_id);
  const url = server + "/api/posts/" + post_id;
  const res = await fetch(url);
  const post = await res.json();
  console.log(post);
  return {
    props: { post },
  };
}

export default Posts;
