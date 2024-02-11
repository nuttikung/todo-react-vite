import { ReactNode, forwardRef } from "react";
import styled from "styled-components";

export const getPaddingWidth = (hasStart: boolean, hasEnd: boolean): number => {
	let total = 20;
	if (!hasStart && !hasEnd) {
		return total;
	}
	if (hasStart) {
		total += 30;
	}
	if (hasEnd) {
		total += 35;
	}
	return total;
};

const InputContainer = styled.div<{
	$hasStartAdornment: boolean;
	$hasEndAdornment: boolean;
}>`
    position: relative;
    display: inline-block;
    max-width: 480px;
    width: calc(100% - 20px);
    & > .adornment {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
    }

    & > .start {
        left: 10px;
    }

    & > .end {
        right: -5px;
    }
`;

const MyInput = styled.input<{
	$hasStartAdornment: boolean;
	$hasEndAdornment: boolean;
	$complete: boolean;
}>`
    background: var(--input-background-color);
    border-radius: 9999px;
    border: none;
    height: var(--input-height);
    max-width: 480px;
    width: ${(props) =>
			`calc(100% - ${getPaddingWidth(
				props.$hasStartAdornment,
				props.$hasEndAdornment,
			)}px)`} ;
    padding-left: ${(props) => (props.$hasStartAdornment ? "40" : "10")}px;
    padding-right: ${(props) => (props.$hasEndAdornment ? "60" : "30")}px;
	${(props) =>
		props.$complete &&
		`
		text-decoration: line-through;
		color: rgba(169, 169, 169, 1);
	`}
    &:focus {
        outline: none;
    }
    &::placeholder {
        color: var(--input-placeholder-font-color);
        font-family: Roboto;
        font-size: 16px;
        font-weight: 400;
        line-height: 19px;
        letter-spacing: 0em;
        text-align: left;
    }
`;

export type InputProps = JSX.IntrinsicElements["input"] & {
	startAdornment?: ReactNode;
	endAdornment?: ReactNode;
	complete?: boolean;
};

export const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
	const { startAdornment, endAdornment, complete = false, ...rest } = props;
	const hasStartAdornment = !!startAdornment;
	const hasEndAdornment = !!endAdornment;
	return (
		<InputContainer
			$hasStartAdornment={hasStartAdornment}
			$hasEndAdornment={hasEndAdornment}
			data-testid="input-container"
		>
			{startAdornment && (
				<div className="adornment start" data-testid="input-adornment-start">
					{startAdornment}
				</div>
			)}
			<MyInput
				data-testid="input"
				$hasStartAdornment={hasStartAdornment}
				$hasEndAdornment={hasEndAdornment}
				$complete={complete}
				{...rest}
				type="text"
				ref={ref}
			/>
			{endAdornment && (
				<div className="adornment end" data-testid="input-adornment-end">
					{endAdornment}
				</div>
			)}
		</InputContainer>
	);
});
