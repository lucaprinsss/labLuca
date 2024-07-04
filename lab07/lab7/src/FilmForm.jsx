import { Form, FormGroup } from "react-bootstrap";

function FilmForm (props) {
  return(
    <>
      <h4 className="mt-3">Add a film</h4>
      <Form>
        <Form.Group>
          <Form.Label>Title</Form.Label>
          <Form.Control type="text" required={true}></Form.Control>
        </Form.Group>
        <FormGroup>
          <Form.Check type="checkbox" label="Favorite"></Form.Check>
        </FormGroup>
        <FormGroup>
        <Form.Label>Watch date</Form.Label>
        <Form.Control type="date"></Form.Control>
        </FormGroup>
        <FormGroup>
        <Form.Label>Rating</Form.Label>
        <Form.Control type="number" min={0} max={5} step={1}></Form.Control>
        </FormGroup>
      </Form>
    </>

  )
}

export default FilmForm;