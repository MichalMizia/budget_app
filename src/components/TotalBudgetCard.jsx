import React from 'react'
import BudgetCard from './BudgetCard'
import useBudgets from '../contexts/BudgetsContext'

export default function TotalBudgetCard() {
    const total = useBudgets().budgets.reduce((total, budget)=>{
        return total = total + Number(budget.max)
    }, 0)   
    const sum = useBudgets().expenses.reduce((total, expense)=>{
        return total = total + Number(expense.amount)
    }, 0)
  return <BudgetCard gray hideBtns name="Total" sum={sum} total={total}/>
}
