import { Button, Row, Col } from "react-bootstrap";
import Jumbotron from "react-bootstrap/Jumbotron";
import Image from "react-bootstrap/Image";
import Feed from "../data/quicksplained.json";
export default function quicksplained() {
  const feeds = Feed.feed;
  return (
    <div style={{ overflowX: "hidden" }}>
      <Jumbotron fluid className="mainJumbotron mb-0">
        <Row style={{ paddingTop: "5vw" }}>
          <Col xs={6}>
            <h1 className="fw-bold text-warning quicksplainedHead pt-5 mx-5 px-5">
              <span className="text-white">#Quick</span>splained
            </h1>
            <h2 className="quicksplainedSubhead text-white mx-5 px-5">
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
          <Image src="/assets/mobile.svg" />
          <div className="d-flex justify-content-center">
            <h1
              className=" fw-bold text-white quicksplainedMobileText display-4 p-5 m-5 d-none d-lg-block "
              style={{ maxWidth: "18vw", transform: "translateY(-55vw)" }}
            >
              Infographics Analytics &amp; more.
            </h1>
            <h1
              className=" fw-bold text-white quicksplainedMobileText display-4 p-5 m-5 d-block d-lg-none "
              style={{ maxWidth: "22vw", transform: "translateY(-57vw)" }}
            >
              Infographics Analytics &amp; more.
            </h1>
          </div>
          <div
            className="text-center py-5 d-none d-lg-block "
            style={{ transform: "translateY(-47vw)" }}
          >
            <Button variant="warning" className="px-4">
              Learn More
            </Button>
          </div>
          <div
            className="text-center py-5 d-none d-md-block d-lg-none "
            style={{ transform: "translateY(-57vw)" }}
          >
            <Button variant="warning" size="sm" className="px-4">
              Learn More
            </Button>
          </div>
          <div
            className="text-center py-5 d-none d-sm-block d-md-none "
            style={{ transform: "translateY(-70vw)" }}
          >
            <Button variant="warning" size="sm" className="px-2 qsp-btn-sm">
              Learn More
            </Button>
          </div>
          <div
            className="text-center py-5 d-block d-sm-none "
            style={{ transform: "translateY(-87vw)" }}
          >
            <Button variant="warning" size="sm" className="px-2 qsp-btn-xs">
              Learn More
            </Button>
          </div>
        </Col>
      </Row>
      <div className="container ">
        {feeds.map((feed, index) => (
          <div key={feed.embed}>
            <Row
              className={`d-flex py-4 justify-content-${
                index % 2 ? "end" : "start"
              }`}
            >
              <div
                className="feed w-50"
                dangerouslySetInnerHTML={{
                  __html: feed.embed.replace(/%2F/gi, "/"),
                }}
              />
            </Row>
            {/* <Row
              className={`d-flex justify-content-${
                index % 2 ? "end" : "start"
              }`}
            >
              <div
                className={`align-self-end ${index % 2 ? "d-none" : "d-block"}`}
              >
                -----------------------------------------------------------{">"}
              </div>
              <div
                className={`align-self-end ${index % 2 ? "d-block" : "d-none"}`}
              >
                {"<"}----------------------------------------------------
              </div>
            </Row> */}
          </div>
        ))}
      </div>
    </div>
  );
}
