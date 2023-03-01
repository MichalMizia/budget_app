import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Card, ProgressBar, Stack, Button } from "react-bootstrap";
import formatter from "../utils";

export default function BudgetCard({ name, total, sum, gray, hideBtns, onAddExpenseClick, onViewExpensesClick}) {
  function getProgressVariant(total, sum) {
    if(sum === 0 && total === 0) return "primary"
    const ratio = sum / total;
    if (ratio < 0.5) return "primary";
    else if (ratio < 0.85) return "warning";
    else return "danger";
  }

  return (
    <Card style={{ backgroundColor: sum / total >= 1 ? "#FF000025" : gray ? "#EFEFEF90" : "white" }}>
      <Card.Body>
        <Card.Title className="d-flex justify-content-between align-items-baseline mb-2">
          <h4>{name}</h4>
          <p>
            <span>{formatter(sum)} </span>
            {(total !== null && total !== undefined) && <span style={{ fontSize: "18px" }}>/ {total}</span>}
          </p>
        </Card.Title>
        {total != null && <ProgressBar
          now={(sum === 0 && total === 0) ? 0 : (sum * 100) / total}
          variant={getProgressVariant(total, sum)}
        ></ProgressBar>}
        {!hideBtns && <Stack className="mt-4 justify-content-end" direction="horizontal" gap={2}>
          <Button variant="outline-primary" onClick={onAddExpenseClick}>Add expense</Button>
          <Button variant="outline-secondary" onClick={onViewExpensesClick}>View Expenses</Button>
        </Stack>}
      </Card.Body>
    </Card>
  );
}
