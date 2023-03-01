import { useRef } from 'react'
import { Form, Modal, Button } from 'react-bootstrap'
import useBudgets from '../contexts/BudgetsContext'

export default function AddBudgetModal({show, handleClose}) {
  const nameInput = useRef()
  const valueInput = useRef()
  const BudgetsContext = useBudgets()

  return (
    <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
            <Modal.Title>New Budget</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={(e)=>{
            e.preventDefault()
            BudgetsContext.addBudget(nameInput.current.value, valueInput.current.value)
            handleClose()
          }}>
            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control ref={nameInput} required type="text" placeholder="Enter name" />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Max amount</Form.Label>
              <Form.Control ref={valueInput} required type="number" placeholder="Max amount" />
            </Form.Group>
            <Button variant="outline-primary" type="submit">
              Submit
            </Button>
          </Form>
        </Modal.Body>
    </Modal>
  )
}
