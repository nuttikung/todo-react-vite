import { GlobalStyle } from "@/theme";
import { fireEvent, render, screen } from "@testing-library/react";
import { vi } from "vitest";
import { Dropdown, type DropdownProps } from "./Dropdown";

describe("<Dropdown />", () => {
	const setup = (props: DropdownProps) => {
		const utils = render(
			<>
				<GlobalStyle />
				<Dropdown {...props} />
			</>,
		);
		return {
			...utils,
		};
	};

	const mockDropdownProps: DropdownProps = {
		options: ["a", "b", "c"],
		initialValue: "a",
		onSelect: vi.fn(),
	};

	it("should render correctly", async () => {
		const { unmount } = setup(mockDropdownProps);

		const container = screen.getByTestId("drop-down-container");
		expect(container).toBeInTheDocument();

		const button = screen.getByTestId("drop-down-button");
		expect(button).toBeInTheDocument();

		const chevron = screen.getByTestId("drop-down-chevron");
		expect(chevron).toBeInTheDocument();

		const content = screen.getByTestId("drop-down-content");
		expect(content).toBeInTheDocument();

		const items = await screen.findAllByTestId("drop-down-item");
		expect(items).toHaveLength(3);

		unmount();
	});

	it("should show/hide content when user click on Dropdown", () => {
		const { unmount } = setup(mockDropdownProps);

		const content = screen.getByTestId("drop-down-content");
		const button = screen.getByTestId("drop-down-button");
		expect(content).toHaveStyle("display: none");

		fireEvent.click(button);
		expect(content).toHaveStyle("display: block");

		fireEvent.click(button);
		expect(content).toHaveStyle("display: none");

		unmount();
	});

	it("should call onSelect when click an option", async () => {
		const { unmount } = setup(mockDropdownProps);

		const items = await screen.findAllByTestId("drop-down-item");
		fireEvent.click(items[1]);
		expect(mockDropdownProps.onSelect).toHaveBeenCalled();

		unmount();
	});
});
