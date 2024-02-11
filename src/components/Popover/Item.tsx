import styled from "styled-components";

export const PopoverItem = styled.div<{ $color?: string }>`
    height: 16px;
    padding: 10px;
    color: ${({ $color }) =>
			`var(${$color})` ?? "var(--popover-item-font-color)"};
    cursor: pointer;
`;
