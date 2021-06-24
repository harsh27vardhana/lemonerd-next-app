import { Container } from "react-bootstrap";
import ArticleCard from "../../components/articleCard";
import { server } from "../../config/config";

function Authors({ posts, author }) {
  const data = posts.data;
  return (
    <Container className="mt-5 py-5">
      {data.map((item) =>
        item.author === author ? (
          <div className="p-3" key={item._id}>
            <ArticleCard {...item} />
          </div>
        ) : null
      )}
    </Container>
  );
}

export async function getServerSideProps(context) {
  const { author } = context.query;
  const url = server + "/api/posts/";
  const res = await fetch(url);
  const posts = await res.json();
  return {
    props: { posts, author },
  };
}

export default Authors;
