import Data from "../data/team.json";
import MemberCard from "../components/memeberCard";
import { Row } from "react-bootstrap";
const data = Data.members;
function team() {
  return (
    <div style={{ overflowX: "hidden" }}>
      <h1 className="text-center py-5">Our Team</h1>
      <Row className="justify-content-center">
        {data.map((element) => (
          <MemberCard key={element.id} {...element} />
        ))}
      </Row>
    </div>
  );
}

export default team;
