import { Link } from "react-router-dom";



export default function SelectCreation() {



  return (
    <div>
      <Link to="/create?type=single">创建单选</Link>
      <br />
      <Link to="/create?type=multiple">创建多选</Link>

    </div>
  )
}
