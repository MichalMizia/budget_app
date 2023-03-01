import React, {useContext} from "react";
import { v4 as uuid } from "uuid";
import {useLocalStorage} from "../hooks/useLocalStorage";

const budgetsContext = React.createContext()

export default function useBudgets(){
    return useContext(budgetsContext)
}

export const Uncategorized_Budget_ID = "Uncategorized"
// }
//     id,
//     name,
//     max
// {
//     id,
//     budgetId,
//     amount,
//     description
// }

export const BudgetsProvider = ({children}) => {
    const [budgets, setBudgets] = useLocalStorage("budgets", [])
    const [expenses, setExpenses] = useLocalStorage("expenses", [])

    function viewBudgetExpenses(ID){
        return expenses.filter(expense => expense.budgetID === ID)
    }
    function addBudget(name, maxValue){
        const newBudget = {
            id: uuid(),
            name: name,
            max: maxValue
        }
        setBudgets(prevBudgets => {
            if(prevBudgets.find(budget => budget.name === name)) return prevBudgets
            return [...prevBudgets, newBudget]
        })
    }
    function addExpense(description, amount, budgetId){
        const newExpense = {
            id: uuid(),
            budgetID: budgetId,
            amount: amount,
            description: description
        }
        setExpenses(prevExpenses => [...prevExpenses, newExpense])
    }
    function deleteBudget(ID){
        setBudgets(prevBudgets => {
            return prevBudgets.filter(budget => budget.id !== ID)
        })
        setExpenses(prevExpenses => {
            return prevExpenses.map(expense => {
                if(expense.budgetID === ID){
                    return {...expense, budgetID: Uncategorized_Budget_ID}
                }
                return expense
            })
        })
    }
    function deleteExpense(ID){
        setExpenses(prevExpenses => {
            return prevExpenses.filter(expense => expense.id !== ID)
        })
    }
    
    return (
        <budgetsContext.Provider value={{
            budgets, 
            expenses,
            addBudget,
            addExpense,
            viewBudgetExpenses,
            deleteBudget,
            deleteExpense
        }}>
            {children}
        </budgetsContext.Provider>
    )
}