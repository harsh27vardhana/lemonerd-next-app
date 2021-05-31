import Data from '../data/team.json'
import MemberCard from '../components/memeberCard'
const data = Data.members;
function team() {
   


   

    return (
        <div >
            
            <MemberCard {...data[0]}/>
            <MemberCard {...data[1]} />
            <MemberCard {...data[2]} />
        </div>
    )
}

export default team
