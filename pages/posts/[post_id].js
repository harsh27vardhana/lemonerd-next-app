import { Card, Container } from "react-bootstrap";
import { server } from "../../config/config";
function Posts({ post }) {
  console.log(post);
  const getDate = () => {
    const month = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const date =
      post.date[8] +
      post.date[9] +
      " " +
      month[post.date[5] * 10 + post.date[6] - 1] +
      " " +
      post.date[0] +
      post.date[1] +
      post.date[2] +
      post.date[3];
    return date;
  };
  return (
    <div className="p-5">
      <Container>
        <Card className="p-5 mx-5" style={{ marginLeft: "5em" }}>
          <div className="p-lg-5 mx-lg-5">
            <h1>{post.title}</h1>
            <footer className="blockquote-footer">
              {getDate()}
              <cite> by {post.author}</cite>
            </footer>
            <br />
            <div
              id="postContent"
              dangerouslySetInnerHTML={{
                __html: post.content.replace(/%2F/gi, "/"),
              }}
            />
          </div>
        </Card>
      </Container>
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
  return {
    props: { post },
  };
}

export default Posts;
