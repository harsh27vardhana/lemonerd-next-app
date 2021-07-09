import Head from "next/head";
import { Row, Col } from "react-bootstrap";
import Jumbotron from "react-bootstrap/Jumbotron";
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
        <Row className="h-0">
          <Col
            xs={6}
            style={{ transform: "translateY(-20vw)", height: "0" }}
          ></Col>
          <Col xs={6} style={{ transform: "translateY(-20vw)", height: "0" }}>
            <Image
              src="./assets/mobile-lg.png"
              className="d-none d-md-flex"
              alt="iphone"
            />
            <Image
              src="/assets/mobile-sm.png"
              className="d-flex d-md-none pt-5"
              style={{ transform: "translateY(-15vw)" }}
            />
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
                  src="/assets/coloredst.svg"
                  className="d-none d-md-flex pb-5 pl-5 h-75"
                  style={{ transform: "translate(2rem)" }}
                />
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
                {index ? (
                  <Image
                    src="/assets/coloredst.svg"
                    style={{
                      transform: "translate(-2rem) scaleX(-1)",
                    }}
                    className="d-none d-md-flex pb-5 pl-5 h-75"
                  />
                ) : null}
              </Col>
            </Row>
          ))}
        </div>
      </div>
    </div>
  );
}
