import Data from "../data/team.json";
import MemberCard from "../components/memeberCard";
import { Row } from "react-bootstrap";
const data = Data.members;
function team() {
  return (
    <div style={{ overflowX: "hidden" }}>
      <h1 className="text-center py-5 mt-5 monotone display-1">OUR TEAM</h1>
      <Row className="justify-content-center">
        {data.map((element) => (
          <MemberCard key={element.id} {...element} />
        ))}
      </Row>
      <br />
    </div>
  );
}

export default team;
