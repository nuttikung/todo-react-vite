import { useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  position: relative;
  display: inline-block;
  min-width: 110px;
`;

const DropdownButton = styled.button`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  background: var(--dropdown-background-color);
  border: none;
  border-radius: 10px;
  color: var(--dropdown-font-color);
  padding: 0.375rem 0.75rem;
  font-size: 13px;
  font-weight: 400;
  line-height: 15px;
  letter-spacing: 0em;
  cursor: pointer;
`;

const DropdownContent = styled.div<{ open: boolean }>`
  display: ${({ open }) => (open ? "block" : "none")};
  position: absolute;
  background: var(--dropdown-item-background-color);
  border: none;
  border-radius: 10px;
  padding: 10px;
  width: calc(100% - 20px);
  /* min-width: 100%; */
  z-index: 1;
`;

const DropdownItem = styled.div`
  padding: 0.375rem 0.75rem;
  text-align: left;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  &:hover {
	color: var(--dropdown-item-hover-font-color);
	background: var(--dropdown-item-hover-background-color);
	border-radius: 8px;
  }
`;

export type DropdownProps = {
	options: string[];
	initialValue?: string;
	onSelect: (option: string) => void;
};
// Dropdown component
export const Dropdown = ({
	options,
	onSelect,
	initialValue,
}: DropdownProps) => {
	const [isOpen, setIsOpen] = useState(false);
	const [selectedOption, setSelectedOption] = useState(initialValue || "");

	const handleOptionSelect = (option: string) => () => {
		setSelectedOption(option);
		onSelect(option);
		setIsOpen(false);
	};

	return (
		<Container data-testid="drop-down-container">
			<DropdownButton
				data-testid="drop-down-button"
				onClick={() => setIsOpen(!isOpen)}
			>
				{selectedOption || "Select"}
				<svg
					data-testid="drop-down-chevron"
					role="img"
					aria-label="title"
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 24 24"
					width="16"
					height="16"
					fill="none"
					stroke="currentColor"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
				>
					<span id="title">chevron</span>
					<path d="M6 9l6 6 6-6" />
				</svg>
			</DropdownButton>
			<DropdownContent data-testid="drop-down-content" open={isOpen}>
				{options.map((option) => (
					<DropdownItem
						data-testid="drop-down-item"
						key={`${option}`}
						onClick={handleOptionSelect(option)}
					>
						{option}
					</DropdownItem>
				))}
			</DropdownContent>
		</Container>
	);
};
