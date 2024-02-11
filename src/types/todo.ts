export type Todo = {
	id: string;
	title: string;
	completed: boolean;
};

export enum TodoFilter {
	ALL = "All",
	DONE = "Done",
	UNDONE = "Undone",
}

export const TodoFilterOptions = Object.values(TodoFilter);

export type Action =
	| "idle"
	| "loading"
	| "updating"
	| "deleting"
	| "error"
	| "submitting";
