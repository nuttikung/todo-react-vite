import { GlobalStyle } from "@/theme";
import { render, screen } from "@testing-library/react";
import { PropsWithChildren } from "react";
import { Description } from "./Description";

describe("<Card.Description>", () => {
	const setup = ({ children }: PropsWithChildren) => {
		const utils = render(
			<>
				<GlobalStyle />
				<Description>{children}</Description>
			</>,
		);
		return {
			...utils,
		};
	};

	it("should render correct style", () => {
		const { unmount } = setup({});

		const cardDescription = screen.getByTestId("card-description");
		expect(cardDescription).toBeInTheDocument();

		unmount();
	});

	it("should render child component", () => {
		const { unmount } = setup({ children: "description text" });

		expect(screen.getByText("description text")).toBeInTheDocument();

		unmount();
	});
});
