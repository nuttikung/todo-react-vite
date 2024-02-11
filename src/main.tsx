import { TodoContextProvider } from "@/hooks";
import "@csstools/normalize.css";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root") as Element);

root.render(
	<React.StrictMode>
		<TodoContextProvider>
			<App />
		</TodoContextProvider>
	</React.StrictMode>,
);
