import { Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";

async function handleClick(event){

  console.log(event);
  // const res = await fetch("api/quickSplained", {
  //   body: JSON.stringify({ data: img_data, filename: file.name }),
  //   headers: {
  //     "Content-type": "application/json",
  //   },
  //   method: "POST",
  // });
}
function Quicksplained() {
  return (
    <Form className="container py-5 my-5">
      <Form.Group>
        <Form.Label>LINK</Form.Label>
        <Form.Control />
      </Form.Group>
      <Button onClick={handleClick}>Submit</Button>
    </Form>
  );
}

export default Quicksplained;
