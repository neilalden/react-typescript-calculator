import { useState } from "react";
import { ButtonGroup, Button } from "@material-ui/core";
import "./App.css";
const OPERATIONS = ["+", "-", "/", "*", "="];
function App() {
	const [num1, setNum1] = useState<number>(0);
	const [num2, setNum2] = useState<number>(0);
	const [operation, setOperation] = useState<string>("");
	return (
		<div className="App">
			<div className="calculator-body">
				<div className="calculator-output">
					<h1>
						{num1}
						<span>{operation}</span>
						{num2 ? num2 : ""}
					</h1>
				</div>
				<div className="calculator-input">
					<input
						type="number"
						value={operation ? (num2 ? num2 : "") : num1 ? num1 : ""}
						onChange={(e) => {
							if (e.target.value) {
								if (operation !== "") {
									setNum2(parseInt(e.target.value));
								} else {
									setNum1(parseInt(e.target.value));
								}
							} else {
								operation ? setNum2(0) : setNum1(0);
							}
						}}
					/>
				</div>
				<div className="calculator-buttons">
					<ButtonGroup
						color="primary"
						aria-label="outlined primary button group"
					>
						{OPERATIONS.map((operand) => (
							<Button
								className="operation"
								key={operand}
								onClick={() => {
									if (operand === "=") {
										if (!num2) {
											alert("no second number");
										} else {
											let ans = 0;
											if (operation === "+") {
												ans = num1 + num2;
											} else if (operation === "-") {
												ans = num1 - num2;
											} else if (operation === "*") {
												ans = num1 * num2;
											} else if (operation === "/") {
												ans = num1 / num2;
											}
											setNum1(ans);
											setNum2(0);
											setOperation("");
										}
									} else {
										setOperation(operand);
									}
								}}
							>
								{operand}
							</Button>
						))}
					</ButtonGroup>
					<div className="calculator-numbers">
						{[...Array(10)].map((x, i) => (
							<button
								key={i}
								onClick={() => {
									if (operation) {
										const newNum = num2 + "" + i;
										setNum2(parseInt(newNum));
									} else {
										const newNum = num1 + "" + i;
										setNum1(parseInt(newNum));
									}
								}}
							>
								{i}
							</button>
						))}
					</div>
				</div>
			</div>
		</div>
	);
}

export default App;
