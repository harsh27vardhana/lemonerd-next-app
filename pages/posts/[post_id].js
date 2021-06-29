import { Card, Container, Row, Col, Button } from "react-bootstrap";
import Link from "next/link";
import { server } from "../../config/config";
import Author from "../../data/authors.json";
import Image from "react-bootstrap/Image";

const authors = Author.authors;

function Posts({ post }) {
  const postAuthor = authors.find((item) => item.id === post.author);

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
    <div className="my-5">
      <Container className="pt-5">
        <Card className="p-5 mx-md-5">
          <div className="p-lg-5 mx-lg-5">
            <h1>{post.title}</h1>
            {/* <footer className="blockquote-footer">
              {getDate()}
              <cite> by {postAuthor.name}</cite>
            </footer> */}
            <br />
            <div>
              {/* <h5>About Author</h5>
              <hr /> */}
              <Row>
                <Col md={1}>
                  <div
                    style={{
                      width: "50px",
                      height: "50px",
                      borderRadius: "50%",
                      position: "relative",
                      overflow: "hidden",
                    }}
                  >
                    <Image
                      src={
                        postAuthor.image
                          ? postAuthor.image.replace(/%2F/gi, "/")
                          : "/author/default.png"
                      }
                      style={{
                        minWidth: "100%",
                        minHeight: "100%",
                        width: "auto",
                        height: "auto",
                        position: "absolute",
                        left: "50%",
                        top: "50%",
                        transform: "translate(-50%, -50%)",
                      }}
                    />
                  </div>
                </Col>
                <Col md={11}>
                  <h5>{postAuthor.name}</h5>
                  <footer className="blockquote-footer">{getDate()}</footer>
                </Col>
              </Row>
              <hr />
            </div>
            <div
              id="postContent"
              dangerouslySetInnerHTML={{
                __html: post.content.replace(/%2F/gi, "/"),
              }}
            />
            <br />
            <hr />
            <br />
            <div>
              {post.tags.map((tag) => (
                <span key={tag}>
                  <Button variant="outline-info" size="sm">
                    <Link href="/tags/[tag_name]" as={`/tags/${tag}`}>
                      {tag}
                    </Link>
                  </Button>{" "}
                </span>
              ))}
            </div>
            <br />
            <div className="mt-5 pt-5">
              <h3 className="font-weight-bold text-center">
                Want to share your ideas?
              </h3>
              <p className="text-center">
                If you love technology, science or politics and wish to share
                your ideas, send them to us and get featured on our blog as a
                distinguished author. Write us at <br />
                <span className="h4 font-weight-bold"> info@lemonerd.in</span>
              </p>
            </div>
          </div>
        </Card>
      </Container>
    </div>
  );
}

export async function getServerSideProps(context) {
  const { post_id } = context.query;
  const url = server + "/api/posts/" + post_id;
  const res = await fetch(url);
  const post = await res.json();
  return {
    props: { post },
  };
}

export default Posts;
