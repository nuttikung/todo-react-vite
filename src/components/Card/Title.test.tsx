import { GlobalStyle } from "@/theme";
import { render, screen } from "@testing-library/react";
import { PropsWithChildren } from "react";
import { Title } from "./Title";

describe("<Card.Description>", () => {
	const setup = ({ children }: PropsWithChildren) => {
		const utils = render(
			<>
				<GlobalStyle />
				<Title>{children}</Title>
			</>,
		);
		return {
			...utils,
		};
	};

	it("should render correct style", () => {
		const { unmount } = setup({});

		const cardTitle = screen.getByTestId("card-title");
		expect(cardTitle).toBeInTheDocument();

		unmount();
	});

	it("should render child component", () => {
		const { unmount } = setup({ children: "1 completed" });

		expect(screen.getByText("1 completed")).toBeInTheDocument();

		unmount();
	});
});
