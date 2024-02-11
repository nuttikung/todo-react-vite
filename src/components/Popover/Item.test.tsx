import { GlobalStyle } from "@/theme";
import { render, screen } from "@testing-library/react";
import { PopoverItem } from "./Item";

describe("<PopoverItem />", () => {
	it("should render PopoverItem", () => {
		const { unmount } = render(
			<>
				<GlobalStyle />
				<PopoverItem>Example Popover</PopoverItem>
			</>,
		);

		const item = screen.getByText("Example Popover");
		expect(item).toBeInTheDocument();

		unmount();
	});
});
