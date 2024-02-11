import { PropsWithChildren } from "react";
import styled from "styled-components";

const CardTitle = styled.div`
    font-size: 28px;
    font-weight: 500;
    line-height: 33px;
    letter-spacing: 0em;
    text-align: left;
    margin-bottom: 10px;
`;

export const Title = ({ children }: PropsWithChildren) => {
	return <CardTitle data-testid="card-title">{children}</CardTitle>;
};
