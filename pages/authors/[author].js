import Head from "next/head";
import { Container, Card, Row, Col, Button } from "react-bootstrap";
import Link from "next/link";
import ArticleCard from "../../components/articleCard";
import Image from "react-bootstrap/Image";
import dbConnect from "../../database/dbconnect";
import Author from "../../database/authorSchema";
import Post from "../../database/postSchema";
import { FaBullseye } from "react-icons/fa";

function Authors({ posts, authors }) {
  console.log(authors);
  console.log(posts);
  // const data = posts.data;
  // const author = Author.authors.find((item) => item.id === author);
  // const authorBlog = data.filter((item) => item.author === author);
  const authorTags = posts.map((blog) => blog.tags);
  const allTags = [].concat.apply([], authorTags);
  const tags = [...new Set([...allTags])];
  return (
    <Container className="mt-5 py-5 bg-white">
      <Head>
        <title>{authors.name} | Lemonerd</title>
        <script
          async
          src="https://cse.google.com/cse.js?cx=d6ab724b223f8e2ef"
        ></script>
      </Head>
      <Card border="white">
        <Card.Body>
          <Row>
            <Col lg={3} md={4} sm={12} className="my-auto">
              <div className="d-flex justify-content-center">
                <div
                  className="circular-img"
                  style={{
                    width: "200px",
                    height: "200px",
                    backgroundImage: `url(${authors.image})`,
                  }}
                />
              </div>
            </Col>
            <Col lg={9} md={8} sm={12}>
              <h1>{authors ? authors.name : null} </h1>
              <hr />
              <Card.Text>
                {authors ? authors.description : null}
                <br />
                <br />
                <span>
                  <strong className="h5">Related Tags: </strong>
                  {tags.map((tag) => (
                    <span key={tag}>
                      <Button
                        variant="outline-info"
                        size="sm"
                        className="px-1 py-0 tags"
                      >
                        <Link href="/tags/[tag_name]" as={`/tags/${tag}`}>
                          {tag}
                        </Link>
                      </Button>{" "}
                    </span>
                  ))}
                </span>
              </Card.Text>
            </Col>
          </Row>
        </Card.Body>
      </Card>
      {posts.map((item) => (
        <div className="p-3" key={item._id}>
          <ArticleCard {...item} />
        </div>
      ))}
    </Container>
  );
}

export async function getStaticPaths() {
   dbConnect();
  const posts = await Author.find();
  const paths = posts.map((post) => ({
    params: {
      author: post.id.toString(),
    },
  }));
  // console.log(paths)
  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  dbConnect();
  const author = Author.findById(params.author);
  const posts = Post.find({ author: params.author }).sort({ date: -1 });
  // console.log(posts);

  const result = await Promise.all([author, posts]).then(([authos, poss]) => {
    const posts = JSON.parse(JSON.stringify(poss));
    const authors = JSON.parse(JSON.stringify(authos));
    return { posts, authors };
  });

  // console.log(result);
  return {
    props: result,
  };
}

export default Authors;
