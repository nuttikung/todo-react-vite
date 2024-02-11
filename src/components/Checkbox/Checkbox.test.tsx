import { GlobalStyle } from "@/theme";
import { fireEvent, render, screen } from "@testing-library/react";
import { vi } from "vitest";
import { Checkbox } from "./Checkbox";

describe("<Checkbox />", () => {
	const setup = ({
		checked = false,
		onChange = vi.fn(),
	}: { checked?: boolean; onChange?: () => void }) => {
		const utils = render(
			<>
				<GlobalStyle />
				<Checkbox checked={checked} onChange={onChange} />
			</>,
		);
		return {
			...utils,
		};
	};

	it("should render correct when unchecked", () => {
		const { unmount } = setup({});

		const checkBox = screen.getByTestId("check-box");
		expect(checkBox).toBeInTheDocument();
		expect(checkBox).toHaveProperty("checked", false);

		unmount();
	});

	it("should render correct when checked", () => {
		const { unmount } = setup({ checked: true });

		const checkBox = screen.getByTestId("check-box");
		expect(checkBox).toBeInTheDocument();
		expect(checkBox).toHaveProperty("checked", true);

		unmount();
	});

	describe("should able trigger onChange when check/checked", () => {
		it("should able trigger onChange when check", () => {
			const onChange = vi.fn();
			const { unmount } = setup({ checked: true, onChange });
			fireEvent.click(screen.getByTestId("check-box"));
			expect(onChange).toHaveBeenCalled();
			unmount();
		});

		it("should able trigger onChange when checked", () => {
			const onChange = vi.fn();
			const { unmount } = setup({ checked: false, onChange });
			fireEvent.click(screen.getByTestId("check-box"));
			expect(onChange).toHaveBeenCalled();
			unmount();
		});
	});
});
