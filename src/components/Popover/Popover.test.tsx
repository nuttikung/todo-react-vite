import { GlobalStyle } from "@/theme";
import { fireEvent, render, screen } from "@testing-library/react";
import { vi } from "vitest";
import { Popover, type PopoverProps } from "./Popover";

describe("<Popover />", () => {
	const setup = (props: PopoverProps) => {
		const utils = render(
			<>
				<GlobalStyle />
				<Popover {...props} />
			</>,
		);
		return {
			...utils,
		};
	};

	const mockPopoverProps: PopoverProps = {
		text: "click me",
		content: (
			<>
				<div>1</div>
				<div>2</div>
			</>
		),
		isOpen: false,
		onClick: vi.fn(),
	};

	it("should render Popover", () => {
		const { unmount } = setup(mockPopoverProps);

		const container = screen.getByTestId("popover-container");
		expect(container).toBeInTheDocument();

		const button = screen.getByText("click me");
		expect(button).toBeInTheDocument();

		unmount();
	});

	it("should call onClick when Popover is getting clicked", () => {
		const { unmount } = setup(mockPopoverProps);

		const container = screen.getByTestId("popover-container");
		expect(container).toBeInTheDocument();

		const button = screen.getByText("click me");
		fireEvent.click(button);

		expect(mockPopoverProps.onClick).toHaveBeenCalled();

		unmount();
	});

	it("should show Popover content when isOpen is true", () => {
		const { unmount } = setup({ ...mockPopoverProps, isOpen: true });

		expect(screen.getByText("1")).toBeInTheDocument();
		expect(screen.getByText("2")).toBeInTheDocument();

		unmount();
	});
});
