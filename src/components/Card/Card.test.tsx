import { GlobalStyle } from "@/theme";
import { render, screen } from "@testing-library/react";
import { Card } from "./Card";

describe("<Card>", () => {
	const setup = () => {
		const utils = render(
			<>
				<GlobalStyle />
				<Card>abc</Card>
			</>,
		);
		return {
			...utils,
		};
	};

	it("should render correct style", () => {
		const { unmount } = setup();

		const card = screen.getByTestId("card");
		expect(card).toBeInTheDocument();

		const cardWrapper = screen.getByTestId("card-wrapper");
		expect(cardWrapper).toBeInTheDocument();

		unmount();
	});

	it("should render child component", () => {
		const { unmount } = setup();

		expect(screen.getByText("abc")).toBeInTheDocument();

		unmount();
	});
});
