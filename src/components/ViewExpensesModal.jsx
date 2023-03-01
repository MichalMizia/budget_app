import { Modal, Button, ListGroup, ListGroupItem, Stack } from 'react-bootstrap'
import useBudgets, { Uncategorized_Budget_ID } from '../contexts/BudgetsContext'
import formatter from "../utils"

export default function ViewExpensesModal({show, handleClose, budgetID}) {
  if(budgetID == null) return
  const { deleteBudget, deleteExpense, budgets, viewBudgetExpenses } = useBudgets()
  const budget = budgetID === Uncategorized_Budget_ID ? {name: "Uncategorized", id:Uncategorized_Budget_ID} : budgets.find(budget => budget.id === budgetID)

  return (
    <Modal show={show} onHide={handleClose}>
        <Modal.Header className='align-items-center' closeButton>
            <Modal.Title>Expenses - {budget?.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ListGroup>
            {viewBudgetExpenses(budgetID).map(expense =>{
              return <ListGroupItem key={expense.id}>
                <Stack direction="horizontal">
                  <span>{expense.description}</span>
                  <Stack className='ms-auto align-baseline' gap={2} direction='horizontal'>
                    <span>{formatter(expense.amount)}</span>
                    <Button onClick={()=>{
                      deleteExpense(expense.id)
                    }} variant='none' className='p-0 mb-1'><svg style={{height: "24px"}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"/></svg></Button>
                  </Stack>
                </Stack>
              </ListGroupItem>
            })}
          </ListGroup>
        </Modal.Body>
        <Modal.Footer>
          {budgetID !== Uncategorized_Budget_ID && <Button variant='outline-danger ms-4' onClick={()=>{
            handleClose()
            deleteBudget(budgetID)
            }}>Delete Budget</Button>}
        </Modal.Footer>
    </Modal>
  )
}
