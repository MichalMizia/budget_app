import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Stack, Button } from "react-bootstrap";
import BudgetCard from "./components/BudgetCard";
import useBudgets, { Uncategorized_Budget_ID } from "./contexts/BudgetsContext";
import AddBudgetModal from "./components/AddBudgetModal";
import AddExpenseModal from "./components/AddExpenseModal";
import ViewExpensesModal from "./components/ViewExpensesModal";
import UncategorizedBudgetCard from "./components/UncategorizedBudgetCard";
import TotalBudgetCard from "./components/TotalBudgetCard";

function App() {
  const [showBudgetModal, setShowAddBudgetModal] = useState(false)
  const [showExpenseModal, setShowAddExpenseModal] = useState(false)
  const [showViewExpensesModal, setShowViewExpensesModal] = useState(false)
  const [currentlyViewedBudget, setCurrentlyViewedBudget] = useState()
  const [defaultBudgetId, setDefaultBudgetID] = useState()
  const BudgetsContext = useBudgets()

  function getBudgetExpenses(budgetID){
    let sum = 0
    BudgetsContext.expenses.forEach(expense => {
      if(expense.budgetID == budgetID){
        sum = sum + Number(expense.amount)
      }
    })
    return sum
  }

  function getUncategorizedExpenses(){
    return BudgetsContext.expenses.reduce((total, expense) => {
      if(expense.budgetID == Uncategorized_Budget_ID){
        total = total + Number(expense.amount)
      }
      return total
    }, 0)
  }

  function openAddExpenseModal(budgetID){
    setShowAddExpenseModal(true)
    setDefaultBudgetID(budgetID)
  }

  function viewExpenses(budgetID){
    setShowViewExpensesModal(true)
    setCurrentlyViewedBudget(budgetID)
  }


  return (
    <div className="App container pt-2">
      <AddBudgetModal handleClose={()=>setShowAddBudgetModal(false)} show={showBudgetModal}/>
      <AddExpenseModal handleClose={()=>setShowAddExpenseModal(false)} show={showExpenseModal} defaultBudgetId={defaultBudgetId}/>
      <ViewExpensesModal handleClose={()=>setShowViewExpensesModal(false)} show={showViewExpensesModal} budgetID={currentlyViewedBudget}/>
      <Stack direction="horizontal">
        <h1>Budget</h1>
        <Stack direction="horizontal" className="ms-auto" gap={2}>
          <Button onClick={()=>setShowAddBudgetModal(true)} variant="primary">Add budget</Button>
          <Button onClick={()=>openAddExpenseModal(Uncategorized_Budget_ID)} variant="outline-primary">Add expense</Button>
        </Stack>
      </Stack>
      <Stack gap={2} className="mt-2">
        {BudgetsContext.budgets.map(budget => {
          const amount = getBudgetExpenses(budget.id)
          return <BudgetCard onViewExpensesClick={()=>viewExpenses(budget.id)} onAddExpenseClick={()=>openAddExpenseModal(budget.id)} key={budget.id} total={budget.max} sum={amount} name={budget.name} />
        })}
        <UncategorizedBudgetCard onViewExpensesClick={()=>viewExpenses(Uncategorized_Budget_ID)} onAddExpenseClick={()=>openAddExpenseModal(Uncategorized_Budget_ID)} key={Uncategorized_Budget_ID} sum={getUncategorizedExpenses()}/>
        <TotalBudgetCard />
      </Stack>
    </div>
  );
}

export default App;
