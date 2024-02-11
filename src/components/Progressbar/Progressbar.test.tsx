import { Progressbar, calculateBarWidthPercentage } from "./Progressbar";

import { render, screen } from "@testing-library/react";

describe("calculateBarWidthPercentage", () => {
	it.each([
		[1, 2, 50],
		[1, 3, 33.33],
		[1, 4, 25],
		[2, 3, 66.67],
		[3, 3, 100],
	])(
		"should calculate correct for bar width percentage",
		(complete, total, expected) => {
			const result = calculateBarWidthPercentage(complete, total);
			expect(result).toBe(expected);
		},
	);
});

describe("<Progressbar />", () => {
	it.each([
		[1, 2, 50],
		[1, 3, 33.33],
		[1, 4, 25],
		[2, 3, 66.67],
		[3, 3, 100],
	])("should render Progressbar", (complete, total, expected) => {
		const { unmount } = render(
			<Progressbar complete={complete} total={total} />,
		);

		const container = screen.getByTestId("progress-container");
		expect(container).toBeInTheDocument();

		const bar = screen.getByTestId("progress-bar");
		expect(bar).toBeInTheDocument();
		expect(bar).toHaveStyle(`width: ${expected}%`);

		unmount();
	});
});
