import { Description } from "@/components/Card/Description";
import { Title } from "@/components/Card/Title";
import { PropsWithChildren } from "react";
import styled from "styled-components";

const MyCard = styled.div`
	background-color: var(--card-background-color);
	max-width: 480px;
    width: calc(100% - 20px);
	border-radius: 20px;
	color: var(--card-font-color);
`;

const Wrapper = styled.div`
	padding: 20px;
`;

export const Card = ({ children }: PropsWithChildren) => {
	return (
		<MyCard data-testid="card">
			<Wrapper data-testid="card-wrapper">{children}</Wrapper>
		</MyCard>
	);
};

Card.Title = Title;
Card.Description = Description;
