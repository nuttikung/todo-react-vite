import { vi } from "vitest";
import { TodoContextProvider } from "./useTodo";

vi.mock("axios");

describe("useTodoContext", () => {
	const data = [
		{
			id: "5fe3f4ca-193c-4170-83c1-cb5a19908601",
			title: "Buy food for dinner",
			completed: true,
		},
		{
			id: "f619466c-a016-4281-b584-7db2795d103d",
			title: "Call Marie at 10.00 PM",
			completed: false,
		},
		{
			id: "5fe3f4ca-193c-4170-83c1-cb5a19908602",
			title: "Write a react blog post",
			completed: false,
		},
		{
			id: "981463e4-eadc-436b-824a-55f5158c64fe",
			title: "Edit Todo 2-3",
			completed: false,
		},
	];

	const Wrapper = ({ children }: { children: React.ReactNode }) => {
		return <TodoContextProvider>{children}</TodoContextProvider>;
	};

	afterEach(() => {
		vi.clearAllMocks();
	});

	it.skip("should return the initial values for data, error and loading", () => {
		const { result, unmount } = renderHook(() => useTodoContext(), {
			wrapper: Wrapper,
		});

		const { todoList, todoFilter, filteredTodo } = result.current;

		expect(todoList).toMatchObject([]);
		expect(todoFilter).toBe(TodoFilter.ALL);
		expect(filteredTodo).toMatchObject([]);

		unmount();
	});
});
