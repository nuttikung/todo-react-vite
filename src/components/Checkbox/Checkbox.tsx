import { forwardRef } from "react";
import styled from "styled-components";

const CheckBox = styled.input.attrs({ type: "checkbox" })`
    border: 2px solid var(--check-box-color);
    accent-color: var(--check-box-color);
    width: 22px;
    height: 22px;
    border-radius: 6px;
    &::before {
        content: "";
        transform: scale(0);
    }
    &:checked::before {
        transform: scale(1);
    }
`;

type CheckboxProps = HTMLInputElement;

export const Checkbox = forwardRef<
	CheckboxProps,
	JSX.IntrinsicElements["input"]
>((props, ref) => {
	return <CheckBox data-testid="check-box" {...props} ref={ref} />;
});
