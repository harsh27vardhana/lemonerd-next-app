import Data from "../data/team.json";
import MemberCard from "../components/memeberCard";
const data = Data.members;
function team() {
  return (
    <div>
      {data.map((element) => (
        <MemberCard {...element} />
      ))}
    </div>
  );
}

export default team;
