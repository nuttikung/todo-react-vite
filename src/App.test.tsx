import App from "@/App";
import { TodoContextProvider } from "@/hooks";
import { GlobalStyle } from "@/theme";
import { render, screen } from "@testing-library/react";

describe("<App />", () => {
	const setup = () => {
		const utils = render(
			<TodoContextProvider>
				<GlobalStyle />
				<App />
			</TodoContextProvider>,
		);

		return { ...utils };
	};

	it("should render", () => {
		const { unmount } = setup();

		expect(screen.getByText("Progress")).toBeInTheDocument();
	});
});
