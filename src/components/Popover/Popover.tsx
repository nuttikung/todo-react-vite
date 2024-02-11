// TODO: Refactor this component to improve use-case.
import { useState } from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";

const Container = styled.div`
  position: relative;
  z-index: 1;
`;

const Button = styled.button.attrs({ type: "button" })`
    background: white;
    color: rgba(151, 150, 168, 1);
    border: none;
    font-size: 20px;
    cursor: pointer;
`;

const Content = styled.div<{ $isOpen: boolean; $top: number; $left: number }>`
  position: absolute;
  top: ${({ $top }) => $top}px;
  left: ${({ $left }) => $left}px;
  transform: translateX(-50%);
  background: rgba(255, 255, 255, 1);
  border-radius: 10px;
  border: none;
  padding: 10px;
  z-index: 1000;
  box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.1);
  display: ${({ $isOpen }) => ($isOpen ? "block" : "none")}; /* Show/hide the popover */
`;

export type PopoverProps = {
	text: string;
	content: React.ReactNode;
	isOpen: boolean;
	onClick: () => void;
};

export const Popover = ({ text, content, isOpen, onClick }: PopoverProps) => {
	const [position, setPosition] = useState<{ top: number; left: number }>({
		top: 0,
		left: 0,
	});

	const togglePopover = (event: React.MouseEvent<HTMLButtonElement>) => {
		const { clientX, clientY } = event;
		// TODO: building component might need some value like position 'top', 'bottom', 'left', 'right', ...
		setPosition({ top: clientY + 10, left: clientX - 20 });
		onClick();
	};

	return (
		<Container data-testid="popover-container">
			<Button data-testid="popover-button" onClick={togglePopover}>
				{text}
			</Button>
			{isOpen &&
				ReactDOM.createPortal(
					<Content
						data-testid="popover-content"
						$isOpen={isOpen}
						$top={position.top}
						$left={position.left}
					>
						{content}
					</Content>,
					document.body,
				)}
		</Container>
	);
};
