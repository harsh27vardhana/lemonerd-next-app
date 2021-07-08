import Head from "next/head";
import { Button, Row, Col } from "react-bootstrap";
import Jumbotron from "react-bootstrap/Jumbotron";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLongArrowAltLeft,
  faReply,
  faShare,
} from "@fortawesome/free-solid-svg-icons";
import Image from "react-bootstrap/Image";
import Feed from "../data/quicksplained.json";
export default function quicksplained() {
  const feeds = Feed.feed;
  const script = document.createElement("script");
  script.setAttribute("async", "");
  script.src = "//www.instagram.com/embed.js";
  script.onload = () => window.instgrm.Embeds.process();
  return (
    <div>
      <Head>
        <title>Quicksplained | Lemonerd</title>
        <script
          async=""
          defer="defer"
          src="//platform.instagram.com/en_US/embeds.js"
        ></script>
        <script
          async
          src="https://cse.google.com/cse.js?cx=d6ab724b223f8e2ef"
        ></script>
      </Head>
      <div style={{ overflowX: "hidden" }}>
        <Jumbotron fluid className="mainJumbotron mb-0 my-xs-5 pt-xs-5">
          <Row style={{ paddingTop: "5vw" }}>
            <Col xs={6}>
              <h1 className="font-weight-bold text-yellow quicksplainedHead pt-5 mx-5 px-5">
                <span className="text-white">#Quick</span>splained
              </h1>
              <h2 className="quicksplainedSubhead text-white mx-5 px-5 d-none d-md-block">
                Simple, quick visual insights on current events that matter!
              </h2>
              <h2 className="quicksplainedSubhead text-white ml-5 pl-5 d-block d-md-none">
                Simple, quick visual insights on current events that matter!
              </h2>
            </Col>
            <Col xs={6}></Col>
          </Row>
        </Jumbotron>
        <Row style={{ height: "0" }}>
          <Col
            xs={6}
            style={{ transform: "translateY(-20vw)", height: "0" }}
          ></Col>
          <Col xs={6} style={{ transform: "translateY(-20vw)", height: "0" }}>
            <Image
              src="/assets/mobileKeyboard.svg"
              className="d-none d-md-flex"
            />
            <Image
              src="/assets/mobileKeyboard.svg"
              className="d-flex d-md-none pt-5"
              style={{ transform: "translateY(-15vw)", width: "60%" }}
            />
            {/* <div className="d-flex justify-content-center">
              <h1
                className=" fw-bold text-white quicksplainedMobileText display-4 p-5 m-5 d-none d-lg-flex "
                style={{ maxWidth: "18vw", transform: "translateY(-55vw)" }}
              >
                Infographics Analytics &amp; more.
              </h1>
              <h1
                className=" fw-bold text-white quicksplainedMobileText display-4 p-5 m-5 d-none d-md-flex d-lg-none "
                style={{ maxWidth: "22vw", transform: "translateY(-57vw)" }}
              >
                Infographics Analytics &amp; more.
              </h1>
              <h1
                className=" fw-bold text-white quicksplainedMobileText display-4 p-5 m-5 d-none d-sm-flex d-md-none "
                style={{
                  maxWidth: "22vw",
                  transform: "translate(-11vw, -50vw)",
                }}
              >
                Infographics Analytics &amp; more.
              </h1>
              <h1
                className=" fw-bold text-white quicksplainedMobileText p-5 m-5 d-flex d-sm-none "
                style={{
                  maxWidth: "22vw",
                  transform: "translate(-12vw, -60vw)",
                }}
              >
                Infographics Analytics &amp; more.
              </h1>
            </div> */}
          </Col>
        </Row>
        <div className="container ">
          {feeds.map((feed, index) => (
            <Row key={feed.embed}>
              <Col
                md={6}
                xs={12}
                className={index % 2 ? "d-flex justify-content-end" : "d-none"}
              >
                <Image
                  src="/assets/straight.svg"
                  className="d-none d-md-flex pb-5 pl-5 h-75"
                  style={{ transform: "translate(2rem)" }}
                />
                {/* <FontAwesomeIcon
                  icon={faShare}
                  size="10x"
                  flip="vertical"
                  className="d-none d-md-flex"
                /> */}
              </Col>
              <Col md={6} xs={12}>
                <div
                  className="feed w-100"
                  dangerouslySetInnerHTML={{
                    __html: feed.embed.replace(/%2F/gi, "/"),
                  }}
                />
              </Col>
              <Col
                md={6}
                xs={12}
                className={
                  index % 2 ? "d-none" : "d-flex justify-content-start"
                }
              >
                {
                  index ? (
                    // <FontAwesomeIcon
                    //   icon={faReply}
                    //   size="10x"
                    //   flip="vertical"
                    //   className="d-none d-md-flex"
                    // />
                    <Image
                      src="/assets/straight.svg"
                      style={{
                        transform: "translate(-2rem) scaleX(-1)",
                      }}
                      className="d-none d-md-flex pb-5 pl-5 h-75"
                    />
                  ) : null
                  // <Image
                  //   src="/assets/leftdown.svg"
                  //   style={{
                  //     transform: "translate(-5rem)",
                  //   }}
                  //   className="d-none d-md-flex pb-5 pl-5 align-self-end"
                  // />
                }
              </Col>
            </Row>
          ))}
        </div>
      </div>
    </div>
  );
}
