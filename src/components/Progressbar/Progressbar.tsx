import styled from "styled-components";

type ProgressbarProps = {
	complete: number;
	total: number;
};

const Container = styled.div` 
	position: relative;
	width: 100%;
    height: 8px;
	background: rgba(59, 59, 59, 1);
    border-radius: 999px;
    color: white;
`;

const Bar = styled.div<{ $progress: number }>`
    border-radius: 999px;
    width: ${(props) => props.$progress || 0}%;
    height: 100%;
    background: rgba(255, 255, 255, 1);
`;

export const calculateBarWidthPercentage = (complete: number, total: number) =>
	Number(((complete / total) * 100).toFixed(2));

export const Progressbar = ({ complete, total }: ProgressbarProps) => {
	const completed = calculateBarWidthPercentage(complete, total);
	return (
		<Container data-testid="progress-container">
			<Bar $progress={completed} data-testid="progress-bar" />
		</Container>
	);
};
