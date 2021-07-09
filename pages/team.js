import Head from "next/head";
import Data from "../data/team.json";
import MemberCard from "../components/memeberCard";
import { Row, Container } from "react-bootstrap";
const data = Data.members;
function team() {
  return (
    <div className="hideOverflowX">
      <Head>
        <title>Team | Lemonerd</title>
        <script
          async
          src="https://cse.google.com/cse.js?cx=d6ab724b223f8e2ef"
        ></script>
      </Head>
      <h1 className="text-center py-5 mt-5 monotone display-4 font-weight-bold gradient-text">
        Our Team
      </h1>
      <Container>
        <Row className="justify-content-center">
          {data.map((element) => (
            <MemberCard key={element.id} {...element} />
          ))}
        </Row>
      </Container>
      <br />
    </div>
  );
}

export default team;
