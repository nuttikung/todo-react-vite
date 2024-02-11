import {
	Card,
	Checkbox,
	Dropdown,
	Input,
	Popover,
	PopoverItem,
	Progressbar,
} from "@/components";
import { device } from "@/constants";
import { useTodoContext } from "@/hooks";
import { GlobalStyle } from "@/theme";
import { TodoFilter, TodoFilterOptions, type Todo } from "@/types";
import { useMemo, useState } from "react";
import styled from "styled-components";
import { v4 as uuid } from "uuid";

// TODO: Refactor this to component and checking style.
const Layout = styled.div`
  margin: auto;
  padding-right: 15px;
  padding-left: 15px;
  @media ${device.mobileL} {
	text-align: center;
  }
  @media ${device.laptop} { 
    max-width: 800px;
  }
  @media ${device.desktop} {
    max-width: 1400px;
  }
  padding-top: 30px;
  & > .section {
	margin-top: 15px;
	margin-bottom: 15px;
	display: flex;
  	align-items: center;
  	justify-content: center;
  }
`;

// TODO: Refactor this to component and checking style.
const Container = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	max-width: 480px;
	width: calc(100% - 20px);
	& > div {
		display: flex;
	}
	& > .title {
		font-family: Roboto;
		font-size: 24px;
		font-weight: 500;
		line-height: 28px;
		letter-spacing: 0em;
		text-align: left;
		color: rgba(0, 0, 0, 1);
	}
`;

const SaveButton = styled.button.attrs({ type: "button" })`
	color: rgba(255, 255, 255, 1);
	background: rgba(88, 82, 146, 1);
	max-width: 64px;
	max-height: 36px;
	padding: 10px;
	border: none;
	border-radius: 999px;
	cursor: pointer;
`;

// TODO: Extract component this too complex.
function App() {
	const [text, setText] = useState<string>("");
	const [editTodo, setEditTodo] = useState<Todo | undefined>(undefined);
	// COMMENT: using for compare which one is opened.
	const [openPopoverId, setOpenPopoverId] = useState<string>("");

	const {
		todoList,
		todoFilter,
		filteredTodo,
		handleAddTodo,
		handleUpdateTodo,
		handleChangeFilter,
		handleRemoveTodo,
	} = useTodoContext();
	const total = todoList.length;
	const complete = useMemo(
		() => todoList.filter((todo) => todo.completed).length,
		[todoList],
	);

	const handleTogglePopover = (id: Todo["id"]) => () => {
		setOpenPopoverId((prevId) => (prevId === id ? "" : id));
	};

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setText(event.target.value);
	};

	const handleKeyDown = (event: React.KeyboardEvent<HTMLElement>) => {
		if (event.key === "Enter") {
			const payload: Todo = {
				id: uuid(),
				title: text,
				completed: false,
			};
			handleAddTodo(payload);
			setText("");
		}
	};

	const handleToggleMark =
		(current: Todo) => (_event: React.ChangeEvent<HTMLInputElement>) => {
			const payload: Todo = { ...current, completed: !current.completed };
			handleUpdateTodo(payload);
		};

	const handleSelectFilter = (option: string) => {
		handleChangeFilter(option as TodoFilter);
		setOpenPopoverId("");
	};

	const handleDeleteTodo = (todo: Todo) => (_event: React.MouseEvent) => {
		handleRemoveTodo(todo);
		setOpenPopoverId("");
	};

	const handleClickEditTodo = (todo: Todo) => () => {
		setEditTodo(todo);
	};

	const handleChangeEditTodo = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (editTodo) {
			const payload: Todo = { ...editTodo, title: event.target.value };
			setEditTodo(payload);
		}
	};

	const handleSaveEditTodo = (_event: React.MouseEvent) => {
		if (editTodo) {
			handleUpdateTodo(editTodo);
			setEditTodo(undefined);
			setOpenPopoverId("");
		}
	};

	return (
		<>
			<GlobalStyle />
			<Layout>
				<div className="section">
					<Card>
						<Card.Title>Progress</Card.Title>
						<Progressbar complete={complete} total={total} />
						<Card.Description>{complete} completed</Card.Description>
					</Card>
				</div>
				<div className="section">
					<Container>
						<div className="title">Task</div>
						<div>
							<Dropdown
								options={TodoFilterOptions}
								initialValue={todoFilter}
								onSelect={handleSelectFilter}
							/>
						</div>
					</Container>
				</div>
				{filteredTodo.length > 0 &&
					filteredTodo.map((todo) => {
						const isEditMode = editTodo?.id === todo.id;
						return (
							<div key={todo.id} className="section">
								<Input
									value={!isEditMode ? todo.title : editTodo.title}
									complete={todo.completed}
									onChange={handleChangeEditTodo}
									disabled={!isEditMode}
									startAdornment={
										!isEditMode && (
											<Checkbox
												checked={todo.completed}
												onChange={handleToggleMark(todo)}
											/>
										)
									}
									endAdornment={
										isEditMode ? (
											<SaveButton onClick={handleSaveEditTodo}>Save</SaveButton>
										) : (
											<Popover
												text="..."
												onClick={handleTogglePopover(todo.id)}
												isOpen={openPopoverId === todo.id}
												content={
													<>
														<PopoverItem onClick={handleClickEditTodo(todo)}>
															Edit
														</PopoverItem>
														<PopoverItem
															onClick={handleDeleteTodo(todo)}
															$color="--card-background-color"
														>
															Delete
														</PopoverItem>
													</>
												}
											/>
										)
									}
								/>
							</div>
						);
					})}
				<div className="section">
					<Input
						placeholder="Add your todo..."
						value={text}
						onChange={handleChange}
						onKeyDown={handleKeyDown}
					/>
				</div>
			</Layout>
		</>
	);
}

export default App;
