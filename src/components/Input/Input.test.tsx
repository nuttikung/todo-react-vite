import { GlobalStyle } from "@/theme";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { vi } from "vitest";
import { Input, getPaddingWidth } from "./Input";

describe("getPaddingWidth", () => {
	it.each([
		[false, false, 20],
		[false, true, 55],
		[true, false, 50],
		[true, true, 85],
	])(
		"should return correct calculation of padding width",
		(hasStart, hasEnd, expected) => {
			const result = getPaddingWidth(hasStart, hasEnd);
			expect(result).toBe(expected);
		},
	);
});

describe("<Input />", () => {
	const onChange = vi.fn();
	it("should render correctly without adornment", async () => {
		const { unmount } = render(
			<>
				<GlobalStyle />
				<Input />
			</>,
		);

		const container = screen.getByTestId("input-container");
		expect(container).toBeInTheDocument();

		const input = screen.getByTestId("input");
		expect(input).toBeInTheDocument();

		await waitFor(() =>
			expect(() => screen.getByTestId("input-adornment-end")).toThrow(
				'Unable to find an element by: [data-testid="input-adornment-end"]',
			),
		);

		await waitFor(() =>
			expect(() => screen.getByTestId("input-adornment-start")).toThrow(
				'Unable to find an element by: [data-testid="input-adornment-start"]',
			),
		);

		unmount();
	});

	it("should render correctly with start adornment", async () => {
		const { unmount } = render(
			<>
				<GlobalStyle />
				<Input startAdornment={<div>start</div>} />
			</>,
		);

		const container = screen.getByTestId("input-container");
		expect(container).toBeInTheDocument();

		const input = screen.getByTestId("input");
		expect(input).toBeInTheDocument();

		const startAdornment = screen.getByTestId("input-adornment-start");
		expect(startAdornment).toBeInTheDocument();

		await waitFor(() =>
			expect(() => screen.getByTestId("input-adornment-end")).toThrow(
				'Unable to find an element by: [data-testid="input-adornment-end"]',
			),
		);

		unmount();
	});

	it("should render correctly with end adornment", async () => {
		const { unmount } = render(
			<>
				<GlobalStyle />
				<Input endAdornment={<div>end</div>} />
			</>,
		);

		const container = screen.getByTestId("input-container");
		expect(container).toBeInTheDocument();

		const input = screen.getByTestId("input");
		expect(input).toBeInTheDocument();

		await waitFor(() =>
			expect(() => screen.getByTestId("input-adornment-start")).toThrow(
				'Unable to find an element by: [data-testid="input-adornment-start"]',
			),
		);

		const endAdornment = screen.getByTestId("input-adornment-end");
		expect(endAdornment).toBeInTheDocument();

		unmount();
	});

	it("should render correctly with start and end adornment", () => {
		const { unmount } = render(
			<>
				<GlobalStyle />
				<Input
					startAdornment={<div>start</div>}
					endAdornment={<div>end</div>}
				/>
			</>,
		);

		const container = screen.getByTestId("input-container");
		expect(container).toBeInTheDocument();

		const input = screen.getByTestId("input");
		expect(input).toBeInTheDocument();

		const startAdornment = screen.getByTestId("input-adornment-start");
		expect(startAdornment).toBeInTheDocument();

		const endAdornment = screen.getByTestId("input-adornment-end");
		expect(endAdornment).toBeInTheDocument();

		unmount();
	});

	it("should call onChange when the value is changed", () => {
		const { unmount } = render(
			<>
				<GlobalStyle />
				<Input
					aria-label="example-input"
					startAdornment={<div>start</div>}
					endAdornment={<div>end</div>}
					onChange={onChange}
				/>
			</>,
		);

		const input = screen.getByLabelText("example-input");
		fireEvent.change(input, { target: { value: "23" } });
		expect(onChange).toHaveBeenCalled();

		unmount();
	});
});
