import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  * {
	  font-family: "Roboto", "sans-serif";
	}
	
	html {
		background: rgba(209, 208, 217, 1);
	}

	:root {
		/* Need to refactor about theme or by component seems like primary = rgba(88, 82, 146, 1), secondary = rgba(224, 124, 124, 1) */
		/* Input */
		--input-background-color: rgba(255, 255, 255, 1);
		--input-placeholder-font-color: rgba(188, 188, 188, 1);
		--input-height: 46px; 
		/* Check Box */
		--check-box-color: rgba(88, 82, 146, 1);
		/* Card */
		--card-background-color: rgba(224, 124, 124, 1);
		--card-font-color: rgba(255, 255, 255, 1);
		--card-description-color: rgba(235, 185, 184, 1);
		/* Dropdown */
		--dropdown-background-color: rgba(255, 255, 255, 1);
		--dropdown-font-color: rgba(0, 0, 0, 1);
		--dropdown-item-background-color: rgba(255, 255, 255, 1);
		--dropdown-item-hover-background-color: rgba(88, 82, 146, 1);
		--dropdown-item-hover-font-color: rgba(255, 255, 255, 1);
		/* Popover */
		--popover-item-font-color: rgba(46, 46, 46, 1);
	}
`;
