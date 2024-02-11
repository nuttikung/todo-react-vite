import { PropsWithChildren } from "react";
import styled from "styled-components";

const Container = styled.div`
	color: var(--card-description-color);
	margin-top: 10px;
	font-size: 16px;
	font-weight: 400;
	line-height: 19px;
	letter-spacing: 0em;
	text-align: left;
`;

export const Description = ({ children }: PropsWithChildren) => {
	return <Container data-testid="card-description">{children}</Container>;
};
