import { Card, Container, Row, Col, Button } from "react-bootstrap";
import Carousel from "react-bootstrap/Carousel";
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
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation, Pagination } from "swiper";
import "swiper/swiper-bundle.css";

const authors = Author.authors;
SwiperCore.use([Navigation, Pagination]);

function Posts({ post, recentposts, relatedposts, tags }) {
  const postAuthor = authors.find((item) => item.id === post.author);
  const [copied, setCopied] = useState(false);

  const recentSlides = [];
  recentposts.forEach((element) => {
    recentSlides.push(
      <SwiperSlide key={element._id}>
        <RelatedArticle {...element} />
      </SwiperSlide>
    );
  });
  const relatedSlides = [];
  relatedposts.forEach((element) => {
    relatedSlides.push(
      <SwiperSlide key={element._id}>
        <RelatedArticle {...element} />
      </SwiperSlide>
    );
  });

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
        <Swiper
          className="d-none d-lg-block"
          slidesPerView={3}
          navigation
          pagination={{ clickable: true }}
          loop
        >
          {relatedSlides}
        </Swiper>
        <Swiper
          className="d-block d-lg-none"
          slidesPerView={2}
          pagination={{ clickable: true }}
          loop
        >
          {relatedSlides}
        </Swiper>
      </Container>
      <Container>
        <h1 className="px-2 py-4">Recent Articles:</h1>
        <Swiper
          className="d-none d-lg-block"
          slidesPerView={3}
          navigation
          pagination={{ clickable: true }}
          loop
        >
          {recentSlides}
        </Swiper>
        <Swiper
          className="d-block d-lg-none"
          slidesPerView={2}
          pagination={{ clickable: true }}
          loop
        >
          {recentSlides}
        </Swiper>
      </Container>
    </div>
  );
}
const prp = {}
export async function getServerSideProps(context) {
  
  const { post_id } = context.query;
  const url = `${server}/api/`;
  // const res = await fetch(url + post_id);
  // const post = await res.json();
  // const recentpostsurl = url + "recentposts/" + post_id;
  // const recentposts = await (await fetch(recentpostsurl)).json();
  // const relatedpostsurl = url + "relatedposts/" + post_id;
  // const relatedposts = await (await fetch(relatedpostsurl)).json();
  // const tagsUrl = `${server}/api/authors/${post.author}`;
  // const response = await fetch(tagsUrl);
  // const tags = await response.json();
  const fetchpost = fetch(url + 'posts/' + post_id);
  const fetchrecentposts = fetch(url + 'posts/recentposts/' + post_id);
  const fetchrelatedposts = fetch(url + 'posts/relatedposts/' + post_id);
  // const fetchtags =fetch(url+'authors/'+post_id)


  const result =await Promise.all([fetchpost, fetchrecentposts, fetchrelatedposts]).then(values => {
    return Promise.all(values.map(res => res.json()))
  }).then(async ([posti, recentpostsi, relatedpostsi]) => {
    prp.post = posti;
    prp.recentposts = recentpostsi;
    prp.relatedposts = relatedpostsi;
    const tagsUrl = url + `authors/${posti.author}`;
    const response = await fetch(tagsUrl);
    const tags = await response.json();
    prp.tags = tags;
    return prp
  })
    //  console.log(result)
  return {
    props: result,
  };
}

export default Posts;
