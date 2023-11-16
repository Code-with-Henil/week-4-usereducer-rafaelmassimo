import { FaAnglesUp, FaCheck, FaXmark } from "react-icons/fa6";
import { useReducer, useRef } from "react";
import "animate.css";

const todoReducer = (state, action) => {
	if (action.type === "add") {
		return [
			...state,
			{
				description: action.payload.description,
				isComplete: false,
				responsible: action.payload.responsible,
				budget: action.payload.budget,
			},
		];
	} else if (action.type === "complete") {
		return state.map((todo, index) =>
			index === action.payload.id ? { ...todo, isComplete: !todo.isComplete } : todo
		);
	
	} else if (action.type === "remove") {
		return state.filter((todo, index) => index !== action.payload.id);
	}
};

// Inside the TODO I will have the object which will contain all the proprieties that i'll add by the funcion 'dispatch'.
// And the state is the array of all my Objects that were saved in the array;

function TODOList() {
	const [todos, dispatch] = useReducer(todoReducer, []);
	const description = useRef(null);
	const responsible = useRef(null);
	const budget = useRef(0);

	function check() {
		todos.map((todo, index) => console.log("todo:", todo, "index:", index));
	}

	const handleFormSubmission = (e) => {
		e.preventDefault();

		const descriptionInput = description.current.value;
		const responsibleInput = responsible.current.value;
		const budgetInput = parseFloat(budget.current.value);

		dispatch({
			type: "add",
			payload: {
				description: descriptionInput,
				responsible: responsibleInput,
				budget: budgetInput,
			},
		});

		document.getElementById("descriptionInput").value = "";
		document.getElementById("responsible").value = "";
		document.getElementById("budget").value = "";
	};

	return (
		<>
			<div className="flex flex-col items-center text-white">
				<div className="flex flex-row gap-20">
					{todos &&
						todos.map((todo, index) => (
							<div key={index}>
								<div className="grid gap-4 rounded-lg p-4 mb-10 bg-gray-500 bg-opacity-50 outline outline-offset-2 outline-1 outline-sky-600 ">
									{todo.isComplete ? (
										<div>
											<p className="text-lime-200">Task Completed</p>
										</div>
									) : (
										<div className="transition ease-in-out">
											<h2>Task N° {index + 1}</h2>
											<p>Description: {todo.description}</p>
											<p>Responsible: {todo.responsible}</p>
											<p>Budget: {todo.budget}</p>
											<p>Is Complete: {todo.isComplete ? "Yes" : "No"}</p>
										</div>
									)}
									<div>
										<button
											onClick={() =>
												dispatch({ type: "complete", payload: { id: index } })
											}
											className="m-4 border p-1 rounded-full border-lime-200 hover:border-lime-600"
										>
											<FaCheck className="text-lime-700" />
										</button>
										<button
											onClick={() => dispatch({ type: "remove", payload: { id: index } })}
											className="m-4 border p-1 rounded-full border-pink-200 hover:border-pink-600"
										>
											<FaXmark className="text-pink-900" />
										</button>
										<button onClick={check}>Check</button>
									</div>
								</div>
							</div>
						))}
				</div>

				<div className="flex flex-col w-3/5 justify-center grid gap-4 border border-black rounded-lg p-4 mb-10 bg-gray-500 bg-opacity-50 outline outline-offset-2 outline-1 outline-sky-600 ">
					<form className="flex flex-col" onSubmit={handleFormSubmission}>
						<label htmlFor="description">
							Insert here the task description:{" "}
						</label>
						<input
							id="descriptionInput"
							type="text"
							name="description"
							placeholder="description"
							ref={description}
							className="mb-4 p-2 border rounded-md text-black"
						/>

						<label htmlFor="responsible">
							Insert here the responsible of this task:{" "}
						</label>
						<input
							id="responsible"
							type="text"
							name="responsible"
							placeholder="responsible"
							ref={responsible}
							className="mb-4 p-2 rounded-md text-black"
						/>
						<label htmlFor="budget">
							Insert here the budget for this task:{" "}
						</label>
						<input
							id="budget"
							type="number"
							name="budget"
							placeholder="budget"
							ref={budget}
							className="p-2 rounded-md text-black"
						/>

						<div className="flex flex-row items-center justify-center transition-transform transform-gpu hover:-translate-y-1">
							<button
								className="flex align-center items-center border rounded-full p-2 mt-4 hover:border-amber-500 hover:shadow-sm hover:shadow-amber-500 "
								type="submit"
							>
								<FaAnglesUp className="flex items-center text-xl" />
							</button>
						</div>
					</form>
				</div>
			</div>
		</>
	);
}

export default TODOList;
