import { render } from 'preact';
import { useEffect, useState } from 'preact/hooks';
import './style.css';

export function App() {
	const [todos, setTodos] = useState([]);
	const [todo, setTodo] = useState("");
	useEffect(() => {
	fetch("http://localhost:3000/todos")
	.then((response) => response.json())
	.then((r) => {
		setTodos(r);
	}).catch((e) => {
		console.error(e);
	});
}, []);


function deleteTodo(todoId) {
	fetch(`http://localhost:3000/todos/${todoId}`, {
		method: "DELETE"
	})
		.then((response) => response.json())
		.then(({id}) => {
			setTodos(todos.filter((todo) => todo.id !== id));
		}).catch((e) => {
			console.error(e);
		});
}

function createTodo() {
	fetch(`http://localhost:3000/todos`, {
		method: "POST",
		body: JSON.stringify({
			text: todo,
			views: Math.floor(Math.random() * 100000)
		})
	})
		.then((response) => response.json())
		.then((newTodo) => {
			setTodos(todos.concat([newTodo]));
			setTodo("");
		}).catch((e) => {
			console.error(e);
		});
}

	return (
		<div>
			<h1>Todome</h1>
			<input type="text" value={todo} onInput={(evt) => setTodo(evt.currentTarget.value)}/>
			<button onClick={() => createTodo()}>Create</button>
			{todos.map((todo) => {
				return(
					<div class="todo">
						{todo.text}
						<button onClick={() => deleteTodo(todo.id)}>Borrar</button>
					</div>
				);
			})}
		</div>
	);
}

render(<App />, document.getElementById('app'));
