import { useRef } from 'react'
import { Form, Modal, Button } from 'react-bootstrap'
import useBudgets from '../contexts/BudgetsContext'
import { Uncategorized_Budget_ID } from '../contexts/BudgetsContext'

export default function AddExpenseModal({show, handleClose, defaultBudgetId}) {
  const descriptionRef = useRef()
  const valueInput = useRef()
  const budgetInput = useRef()
  const BudgetsContext = useBudgets()

  return (
    <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
            <Modal.Title>New Expense</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={(e)=>{
            e.preventDefault()
            BudgetsContext.addExpense(descriptionRef.current.value, valueInput.current.value, budgetInput.current.value)
            handleClose()
          }}>
            <Form.Group className="mb-3">
              <Form.Label htmlFor='description'>Description</Form.Label>
              <Form.Control ref={descriptionRef} required name="description" id="description" type="text" placeholder="Enter a description" />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Amount</Form.Label>
              <Form.Control ref={valueInput} required type="number" placeholder="Amount" />
            </Form.Group>
            <Form.Group className='mb-3'>
                <Form.Label htmlFor="budget">Budget</Form.Label>
                <Form.Select ref={budgetInput} name="budget" id="budget" defaultValue={defaultBudgetId ? defaultBudgetId : "Uncategorized"}>
                    <option key={Uncategorized_Budget_ID} value="Uncategorized">Uncategorized</option>
                    {BudgetsContext.budgets.map(budget => {
                        return (<option key={budget.id} value={budget.id}>{budget.name}</option>)
                    })}
                </Form.Select>
            </Form.Group>
            <Button variant="outline-primary" type="submit">
              Submit
            </Button>
          </Form>
        </Modal.Body>
    </Modal>
  )
}
