import React from 'react'
import BudgetCard from './BudgetCard'

export default function UncategorizedBudgetCard(props) {
    if(props.sum === 0){
        return null
    }
    return (
        <BudgetCard sum={props.sum} gray name="Uncategorized" {...props}/>
    )
}
