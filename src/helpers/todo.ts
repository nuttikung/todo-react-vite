import { TodoFilter, type Todo } from "@/types";

export const getTodoByFilter = (todos: Todo[], filter: TodoFilter) => {
	if (filter === TodoFilter.ALL) {
		return todos;
	}
	if (filter === TodoFilter.DONE) {
		return todos.filter(({ completed }) => completed);
	}
	return todos.filter(({ completed }) => !completed);
};
