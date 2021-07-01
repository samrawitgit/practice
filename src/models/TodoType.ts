class TodoType {
  userId: number | undefined;
  id: number;
  title: string;
  completed: boolean;

  constructor(todoTitle: string) {
    this.title = todoTitle;
    this.id = Math.random();
    this.completed = false;
  }
}

export default TodoType;
