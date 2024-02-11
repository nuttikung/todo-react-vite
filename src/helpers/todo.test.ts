import { TodoFilter, type Todo } from "@/types/todo";
import { getTodoByFilter } from "./todo";

describe("getTodoByFilter", () => {
	const mockData: Todo[] = [
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
			completed: true,
		},
	];

	it("should return all data if filter is All", () => {
		const result = getTodoByFilter(mockData, TodoFilter.ALL);
		expect(result).toMatchObject(mockData);
	});

	it("should return todo as complete when filter is Done", () => {
		const expected = [
			{
				id: "5fe3f4ca-193c-4170-83c1-cb5a19908601",
				title: "Buy food for dinner",
				completed: true,
			},
			{
				id: "5fe3f4ca-193c-4170-83c1-cb5a19908602",
				title: "Write a react blog post",
				completed: true,
			},
		];
		const result = getTodoByFilter(mockData, TodoFilter.DONE);
		expect(result).toMatchObject(expected);
	});

	it("should return todo as incomplete when filter is Undone", () => {
		const expected = [
			{
				id: "f619466c-a016-4281-b584-7db2795d103d",
				title: "Call Marie at 10.00 PM",
				completed: false,
			},
		];
		const result = getTodoByFilter(mockData, TodoFilter.UNDONE);
		expect(result).toMatchObject(expected);
	});
});
