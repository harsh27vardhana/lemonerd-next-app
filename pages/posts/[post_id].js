import { Card, Container, Row, Col, Button } from "react-bootstrap";
import Link from "next/link";
import Head from "next/head";
import { CopyToClipboard } from "react-copy-to-clipboard";
import {
  TwitterIcon,
  TwitterShareButton,
  WhatsappShareButton,
  WhatsappIcon,
  FacebookIcon,
  FacebookShareButton,
  LinkedinShareButton,
  LinkedinIcon,
} from "react-share";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShareSquare } from "@fortawesome/free-solid-svg-icons";
import { server } from "../../config/config";
import Author from "../../data/authors.json";
import Alert from "react-bootstrap/Alert";
import { useState, useEffect } from "react";
import RelatedArticle from "../../components/relatedArticle";

const authors = Author.authors;

function Posts({ post, posts, tags }) {
  const postAuthor = authors.find((item) => item.id === post.author);
  const [writerTags, setWriterTags] = useState([]);
  const [tagBlogs, setTagBlogs] = useState([]);
  const [copied, setCopied] = useState(false);
  const data = posts.data;

  useEffect(async () => {
    const blogsTag = data.filter((item) => item.tags.includes(post.tags[0]));
    const authorBlog = data.filter((item) => item.author === post.author);
    const authorTags = authorBlog.map((blog) => blog.tags);
    const allTags = [].concat.apply([], authorTags);
    const tags = [...new Set([...allTags])];
    setWriterTags(tags);
    setTagBlogs(blogsTag);
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setCopied(false);
    }, 10000);
  }, [copied]);

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
    <div className="my-5 pt-5">
      <Head>
        <title>{post.title} | Lemonerd</title>
        <meta name="description" content={post.caption} />
        <meta name="keywords" content={post.tags} />
        <script
          async
          src="https://cse.google.com/cse.js?cx=d6ab724b223f8e2ef"
        ></script>
      </Head>
      <Container className=" bg-white" fluid="xl">
        <Row className="justify-content-center">
          <Col md={2} sm={12} className="d-none d-md-block mt-5 pt-5">
            <div className="pt-5 mt-5">
              <Row className="mt-5 pt-5">
                <Col lg={3} md={4}>
                  <Link
                    href="/authors/[author]"
                    as={`/authors/${postAuthor.id}`}
                  >
                    <div
                      className="circular-img"
                      style={{
                        width: "40px",
                        height: "40px",
                        backgroundImage: `url(${postAuthor.image.replace(
                          /%2F/gi,
                          "/"
                        )})`,
                      }}
                    />
                  </Link>
                </Col>
                <Col lg={9} md={8} className="d-flex align-self-end">
                  <Link
                    href="/authors/[author]"
                    as={`/authors/${postAuthor.id}`}
                  >
                    <span role="button">{postAuthor.name}</span>
                  </Link>
                </Col>
              </Row>
              <hr />
              <small>
                <em>{postAuthor.description}</em>
              </small>
              <div>
                <br />
                <h6>Writer Tags</h6>
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
              </div>
            </div>
          </Col>
          <Col md={9} xs={12}>
            <Card className="py-5" border="white">
              <div className="py-lg-5">
                <h1>{post.title}</h1>
                <div className="justify-content-between d-none d-md-flex">
                  <footer className="blockquote-footer">{getDate()}</footer>
                  <span>
                    {copied && (
                      <Alert
                        transition
                        variant="success"
                        className="py-0 px-1 d-inline text-center"
                      >
                        Copied!
                      </Alert>
                    )}{" "}
                    <CopyToClipboard
                      onCopy={() => setCopied(true)}
                      text={`https://lemonerd.in/posts/${post._id}`}
                    >
                      <FontAwesomeIcon icon={faShareSquare} role="button" />
                    </CopyToClipboard>{" "}
                    <WhatsappShareButton
                      url={`https://lemonerd.in/posts/${post._id}`}
                    >
                      <WhatsappIcon
                        size={26}
                        round
                        iconFillColor="black"
                        bgStyle={{ fill: "white" }}
                      />
                    </WhatsappShareButton>
                    <FacebookShareButton
                      url={`https://lemonerd.in/posts/${post._id}`}
                    >
                      <FacebookIcon
                        size={26}
                        round
                        iconFillColor="black"
                        bgStyle={{ fill: "white" }}
                      />
                    </FacebookShareButton>
                    <TwitterShareButton
                      url={`https://lemonerd.in/posts/${post._id}`}
                    >
                      <TwitterIcon
                        size={26}
                        round
                        iconFillColor="black"
                        bgStyle={{ fill: "white" }}
                      />
                    </TwitterShareButton>
                    <LinkedinShareButton
                      url={`https://lemonerd.in/posts/${post._id}`}
                    >
                      <LinkedinIcon
                        size={26}
                        round
                        iconFillColor="black"
                        bgStyle={{ fill: "white" }}
                      />
                    </LinkedinShareButton>
                  </span>
                </div>
                <div>
                  <br className="d-block d-md-none" />
                  <Row className="d-flex d-md-none">
                    <Col xs={2}>
                      <Link
                        href="/authors/[author]"
                        as={`/authors/${postAuthor.id}`}
                      >
                        <div
                          className="circular-img"
                          style={{
                            width: "50px",
                            height: "50px",
                            backgroundImage: `url(${postAuthor.image.replace(
                              /%2F/gi,
                              "/"
                            )})`,
                          }}
                        />
                      </Link>
                    </Col>
                    <Col xs={10}>
                      <Link
                        href="/authors/[author]"
                        as={`/authors/${postAuthor.id}`}
                      >
                        <h5 role="button">{postAuthor.name}</h5>
                      </Link>
                      <div className="d-flex d-md-none justify-content-between">
                        <footer className="blockquote-footer">
                          {getDate()}
                        </footer>
                        <span>
                          {copied && (
                            <Alert
                              transition
                              variant="success"
                              className="py-0 px-1 d-inline text-center"
                            >
                              Copied!
                            </Alert>
                          )}{" "}
                          <CopyToClipboard
                            onCopy={() => setCopied(true)}
                            text={"https://lemonerd.in/posts/" + post._id}
                          >
                            <FontAwesomeIcon
                              icon={faShareSquare}
                              role="button"
                            />
                          </CopyToClipboard>{" "}
                          <WhatsappShareButton
                            url={`https://lemonerd.in/posts/${post._id}`}
                          >
                            <WhatsappIcon
                              size={26}
                              round
                              iconFillColor="black"
                              bgStyle={{ fill: "white" }}
                            />
                          </WhatsappShareButton>
                          <FacebookShareButton
                            url={`https://lemonerd.in/posts/${post._id}`}
                          >
                            <FacebookIcon
                              size={26}
                              round
                              iconFillColor="black"
                              bgStyle={{ fill: "white" }}
                            />
                          </FacebookShareButton>
                          <TwitterShareButton
                            url={`https://lemonerd.in/posts/${post._id}`}
                          >
                            <TwitterIcon
                              size={26}
                              round
                              iconFillColor="black"
                              bgStyle={{ fill: "white" }}
                            />
                          </TwitterShareButton>
                          <LinkedinShareButton
                            url={`https://lemonerd.in/posts/${post._id}`}
                          >
                            <LinkedinIcon
                              size={26}
                              round
                              iconFillColor="black"
                              bgStyle={{ fill: "white" }}
                            />
                          </LinkedinShareButton>
                        </span>
                      </div>
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
              </div>
            </Card>
          </Col>
        </Row>
        <hr />
        <div className="px-5 pt-5 text-center">
          <h6 className="font-weight-bold">
            Related Tags:{" "}
            {post.tags.map((tag) => (
              <span key={tag}>
                <Button variant="outline-info" className="tags" size="sm">
                  <Link href="/tags/[tag_name]" as={`/tags/${tag}`}>
                    {tag}
                  </Link>
                </Button>{" "}
              </span>
            ))}
          </h6>
        </div>
        <div className="py-5">
          <h3 className="font-weight-bold text-center">
            Want to share your ideas?
          </h3>
          <p className="text-center">
            If you love technology, science or politics and wish to share your
            ideas, send them to us and get featured on our blog as a
            distinguished author. Write us at <br />
            <span className="h4 font-weight-bold"> info@lemonerd.in</span>
          </p>
        </div>
      </Container>
      <br />
      <Container>
        <h1 className="px-2 py-4 anchor-link">
          Related to{" "}
          <Link
            href="/tags/[tag_name]"
            as={`/tags/${post.tags[0]}`}
            role="button"
          >
            {post.tags[0]}
          </Link>
          :{" "}
        </h1>
        <Row>
          {tagBlogs.map((item, index) =>
            index < 5 ? (
              <Col key={item._id} lg={6} xs={12} className="p-3">
                <RelatedArticle {...item} className="h-100" />
              </Col>
            ) : null
          )}
        </Row>
        <br />
        <h1 className="px-2 py-4">Recent Articles:</h1>
        <Row>
          {data.map((item, index) =>
            index < 5 ? (
              <Col key={item._id} lg={6} xs={12} className="p-3">
                <RelatedArticle {...item} className="h-100" />
              </Col>
            ) : null
          )}
        </Row>
      </Container>
    </div>
  );
}

export async function getServerSideProps(context) {
  const { post_id } = context.query;
  const url = `${server}/api/posts/`;
  const res = await fetch(url + post_id);
  const post = await res.json();
  const result = await fetch(url);
  const posts = await result.json();
  const tagsUrl = `${server}/api/authors/${post.author}`;
  const response = await fetch(tagsUrl);
  const tags = await response.json();
  return {
    props: { post, posts, tags },
  };
}

export default Posts;
