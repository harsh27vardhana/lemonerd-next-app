import Link from "next/link";
import Head from "next/head";
import React, { useState, useEffect } from "react";
import { Card, Container, Row, Col, Button, Alert } from "react-bootstrap";
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
import RelatedArticle from "../../components/relatedArticle";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation, Pagination } from "swiper";
import "swiper/swiper-bundle.css";
import dbConnect from "../../database/dbconnect";
import Author from "../../database/authorSchema";
import Post from "../../database/postSchema";

const authors = Author.authors;
SwiperCore.use([Navigation, Pagination]);

function Posts({ post, recentposts, relatedposts, tags, postAuthor }) {
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

  console.log(relatedSlides);

  const arra = [1];

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
                        backgroundImage: `url(${postAuthor.image})`,
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
                            backgroundImage: `url(${postAuthor.image})`,
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
      <Container>
        <h1 className="px-2 py-4 gradient-text">Related Articles:</h1>
        <Swiper
          className="d-none d-xl-block"
          slidesPerView={5}
          navigation={relatedposts.length >= 5 ? true : false}
          pagination={{ clickable: true }}
          loop={relatedposts.length >= 5 ? true : false}
        >
          {relatedSlides}
        </Swiper>
        <Swiper
          className="d-none d-lg-block d-xl-none"
          slidesPerView={4}
          navigation={relatedposts.length >= 4 ? true : false}
          pagination={{ clickable: true }}
          loop={relatedposts.length >= 4 ? true : false}
        >
          {relatedSlides}
        </Swiper>
        <Swiper
          className="d-none d-md-block d-lg-none"
          slidesPerView={3}
          navigation={relatedposts.length >= 3 ? true : false}
          pagination={{ clickable: true }}
          loop={relatedposts.length >= 3 ? true : false}
        >
          {relatedSlides}
        </Swiper>
        <Swiper
          className="d-block d-md-none"
          slidesPerView={2}
          pagination={{ clickable: true }}
          loop={relatedposts.length >= 2 ? true : false}
        >
          {relatedSlides}
        </Swiper>
      </Container>
      <Container>
        <h1 className="px-2 py-4 gradient-text">Recent Articles:</h1>
        <Swiper
          className="d-none d-xl-block"
          slidesPerView={5}
          navigation={recentposts.length >= 5 ? true : false}
          pagination={{ clickable: true }}
          loop={recentposts.length >= 5 ? true : false}
        >
          {recentSlides}
        </Swiper>
        <Swiper
          className="d-none d-lg-block d-xl-none"
          slidesPerView={4}
          navigation={recentposts.length >= 4 ? true : false}
          pagination={{ clickable: true }}
          loop={recentposts.length >= 4 ? true : false}
        >
          {recentSlides}
        </Swiper>
        <Swiper
          className="d-none d-md-block d-lg-none"
          slidesPerView={3}
          navigation={recentposts.length >= 3 ? true : false}
          pagination={{ clickable: true }}
          loop={recentposts.length >= 3 ? true : false}
        >
          {recentSlides}
        </Swiper>
        <Swiper
          className="d-block d-md-none"
          slidesPerView={2}
          pagination={{ clickable: true }}
          loop={recentposts.length >= 2 ? true : false}
        >
          {recentSlides}
        </Swiper>
      </Container>
    </div>
  );
}
// console.log(Author)
export async function getStaticPaths() {
  await dbConnect();
  const posts = await Post.find({ hidden: "false" });
  const paths = posts.map((post) => ({
    params: {
      post_id: `${post._id}`,
    },
  }));
  // console.log(paths)
  return { paths, fallback: true };
}

export async function getStaticProps({ params }) {
  await dbConnect();
  const id = params.post_id;
  const pst = Post.findById(id);
  const rcentpost = Post.find({ _id: { $ne: id }, hidden: "false" })
    .sort({ date: -1 })
    .limit(10);

  const result = await Promise.all([pst, rcentpost]).then(
    ([pot, reentpost, reatedpost]) => {
      const authortags = Post.distinct("tags", { author: pot.author });
      const rlatedpost = Post.find({
        _id: { $ne: id },
        hidden: "false",
        tags: pot.tags[0],
      }).limit(10);
      const author = Author.findById(pot.author);

      const tempresult = Promise.all([authortags, rlatedpost, author]).then(
        ([authortgs, relatedpots, pstauthor]) => {
          return { authortgs, relatedpots, pstauthor };
        }
      );
      const post = JSON.parse(JSON.stringify(pot));
      const postAuthor = JSON.parse(JSON.stringify(tempresult.pstauthor));
      const recentposts = JSON.parse(JSON.stringify(reentpost));
      const relatedposts = JSON.parse(JSON.stringify(tempresult.relatedpots));
      const tags = JSON.parse(JSON.stringify(authortgs));

      return;
    }
  );

  // const post = JSON.parse(JSON.stringify(params.content));
  // const postAuthor = JSON.parse(JSON.stringify(author));
  // const recentposts = JSON.parse(JSON.stringify(rcentpost));
  // const relatedposts = JSON.parse(JSON.stringify(rlatedpost)
  // );
  // const tags = JSON.parse(JSON.stringify(authortags));

  return {
    props: result,
  };
}

export default Posts;
