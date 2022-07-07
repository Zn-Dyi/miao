import { Button, Form } from "antd";
import { Link } from "react-router-dom";
import Task from "./Task";
import Task1 from "./Task1";



export default function SelectCreation() {



  return (
    <div>
      <Form className="create-select">
        <Form.Item>
          <Task />
          <Button className="create-button" type="primary"><Link to="/create?type=single">创建单选</Link></Button>
        </Form.Item>
        <Form.Item>
          <Task1 />
          <Button className="create-button" type="primary"><Link to="/create?type=single">创建单选</Link></Button>
        </Form.Item>

      </Form>
{/* 
      <div>
        <Link to="/create?type=single">创建单选</Link>
        <br />
        <Link to="/create?type=multiple">创建多选</Link>

      </div> */}

    </div>
  )
}
