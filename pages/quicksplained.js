import InstagramEmbed from "react-instagram-embed";
import { Button, Row, Col } from "react-bootstrap";
import Jumbotron from "react-bootstrap/Jumbotron";
import Image from "react-bootstrap/Image";
export default function quicksplained() {
  return (
    <div style={{ overflowX: "hidden" }}>
      <Jumbotron fluid className="mainJumbotron mb-0">
        <Row style={{ paddingTop: "5vw" }}>
          <Col md={6} xs={12}>
            <h1 className="fw-bold text-warning quicksplainedHead pt-5 mx-5 px-5">
              <span className="text-white">#Quick</span>splained
            </h1>
            <h2 className="quicksplainedSubhead text-white mx-5 px-5">
              Simple, quick visual insights on current events that matter!
            </h2>
          </Col>
          <Col md={6} xs={12}></Col>
        </Row>
      </Jumbotron>
      <Row>
        <Col md={6} xs={12}></Col>
        <Col md={6} xs={12} style={{ transform: "translateY(-20vw)" }}>
          <Image src="/assets/mobile.svg" className="d-none d-md-block" />
          <Image
            src="/assets/mobile.svg"
            className="d-block d-md-none"
            style={{ transform: "translateY(20vw)" }}
          />
          <div className="d-flex justify-content-center">
            <h1
              className=" fw-bold text-white quicksplainedMobileText display-4 p-5 m-5 d-none d-lg-block "
              style={{ maxWidth: "18vw", transform: "translateY(-55vw)" }}
            >
              Infographics Analytics &amp; more.
            </h1>
            <h1
              className=" fw-bold text-white quicksplainedMobileText display-4 p-5 m-5 d-none d-md-block d-lg-none "
              style={{ maxWidth: "22vw", transform: "translateY(-57vw)" }}
            >
              Infographics Analytics &amp; more.
            </h1>
            <h1 className=" fw-bold text-white quicksplainedMobileText-sm display-4 d-block d-md-none ">
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
            className="text-center py-5 d-block d-md-none "
            style={{ transform: "translateY(-57vw)" }}
          >
            <Button variant="warning" size="sm" className="px-2">
              Learn More
            </Button>
          </div>
        </Col>
      </Row>

      <InstagramEmbed
        clientAccessToken="356402385840008|68c46a230a78e6a40e80834f3a19fc91"
        url="https://www.instagram.com/p/CQlSSgcFKqW/"
        maxWidth={320}
        hideCaption={false}
        containerTagName="div"
        protocol=""
        injectScript
        onLoading={() => {}}
        onSuccess={() => {}}
        onAfterRender={() => {}}
        onFailure={() => {}}
      />
    </div>
  );
}
