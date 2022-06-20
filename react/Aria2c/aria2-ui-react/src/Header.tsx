import { useNavigate } from "react-router-dom"


export default function Header() {
  var navigate = useNavigate()

  function goNew() {
    navigate('/new')
  }

  return (
    
    <div>
      <button onClick={goNew}>新建下载</button>
    </div>
  )
}
