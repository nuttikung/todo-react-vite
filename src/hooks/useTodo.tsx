import { getTodoByFilter } from "@/helpers";
import { TodoFilter, type Action, type Todo } from "@/types";
// TODO: refactor to api directory and use axios.create
import axios from "axios";
import {
	Dispatch,
	ReactNode,
	SetStateAction,
	createContext,
	useContext,
	useEffect,
	useMemo,
	useState,
} from "react";

const host = "http://localhost:3001";

const client = axios.create({ baseURL: host });

type TodoContextProvideProps = {
	initialValues?: Todo[];
	children: ReactNode;
};

type TodoContext = {
	todoList: Todo[];
	todoFilter: TodoFilter;
	filteredTodo: Todo[];
	setTodoFilter: Dispatch<SetStateAction<TodoFilter>>;
	handleAddTodo: (todo: Todo) => void;
	handleChangeFilter: (filter: TodoFilter) => void;
	handleUpdateTodo: (todo: Todo) => void;
	handleRemoveTodo: (todo: Todo) => void;
};

const TodoContext = createContext<TodoContext | null>(null);

export const TodoContextProvider = ({
	initialValues,
	children,
}: TodoContextProvideProps) => {
	// TODO: For Spinner loading or tracking state.
	const [action, setAction] = useState<Action>("idle");
	const [todoList, setTodoList] = useState<Todo[]>(initialValues || []);
	const [todoFilter, setTodoFilter] = useState<TodoFilter>(TodoFilter.ALL);
	const [filteredTodo, setFilteredTodo] = useState<Todo[]>([]);
	// COMMENT: since it's not primitive and we use for effect deps.
	const memoTodoList = useMemo(() => todoList, [todoList]);

	const handleChangeFilter = (filter: TodoFilter) => setTodoFilter(filter);

	const handleAddTodo = async (todo: Todo) => {
		try {
			setAction("submitting");
			await client.post("/todos", todo);
			setTodoList((prev) => [...prev, todo]);
			setAction("idle");
		} catch (error) {
			setAction("error");
		}
	};
	const handleUpdateTodo = async (todo: Todo) => {
		try {
			setAction("updating");
			await client.put(`/todos/${todo.id}`, todo);
			const updatedTodoList = todoList.map((_todo) =>
				_todo.id !== todo.id ? _todo : todo,
			);
			setTodoList(updatedTodoList);
			setAction("idle");
		} catch (error) {
			setAction("error");
		}
	};

	const handleRemoveTodo = async (todo: Todo) => {
		try {
			setAction("deleting");
			await client.delete(`/todos/${todo.id}`);
			setTodoList((prev) => prev.filter((t) => t.id !== todo.id));
			setAction("idle");
		} catch (error) {
			setAction("error");
		}
	};

	useEffect(() => {
		const fetchTodoList = async () => {
			try {
				setAction("loading");
				const response = await client.get<Todo[]>("/todos");
				setTodoList(response.data);
				setAction("idle");
			} catch (error) {
				setAction("error");
			}
		};

		const source = axios.CancelToken.source();
		fetchTodoList();
		return () => {
			source.cancel();
		};
	}, []);

	// biome-ignore lint/correctness/useExhaustiveDependencies: <function is not good to put deps>
	useEffect(() => {
		if (todoList.length > 0) {
			const filtered = getTodoByFilter(todoList, todoFilter);
			setFilteredTodo(filtered);
		}
	}, [todoFilter, memoTodoList]);

	return (
		<TodoContext.Provider
			value={{
				todoList,
				todoFilter,
				filteredTodo,
				setTodoFilter,
				handleAddTodo,
				handleUpdateTodo,
				handleChangeFilter,
				handleRemoveTodo,
			}}
		>
			{children}
		</TodoContext.Provider>
	);
};

export const useTodoContext = () => {
	const context = useContext(TodoContext);
	if (!context) {
		throw new Error("useTodoContext must be in TodoContext");
	}
	return context;
};
