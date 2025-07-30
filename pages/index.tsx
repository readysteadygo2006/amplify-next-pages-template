import Link from "next/link"
import { useState, useEffect } from "react";
import { generateClient } from "aws-amplify/data";
import type { Schema } from "@/amplify/data/resource";
import { useAuthenticator } from "@aws-amplify/ui-react";

const client = generateClient<Schema>();

export default function App() {
  const [todos, setTodos] = useState<Array<Schema["Todo"]["type"]>>([]);
    
  const { user, signOut } = useAuthenticator();

  function deleteTodo(id: string) {
    client.models.Todo.delete({ id })
  }

  function listTodos() {
    client.models.Todo.observeQuery().subscribe({
      next: (data) => setTodos([...data.items]),
    });
  }


  useEffect(() => {
    listTodos();
  }, []);

  function createTodo() {
    client.models.Todo.create({
      content: window.prompt("Todo content"),
      isDone: true,
    });
  }

  return (
    <main>
      <h1>User: {user?.signInDetails?.loginId}</h1>
      <h1>My todos</h1>
      <button onClick={createTodo}>+ new</button>
      <ul>
        {todos.map((todo) => (
          <li 
            onClick={() => deleteTodo(todo.id)}
            key={todo.id}>
            {todo.content}
            {'  --- '}
            {(todo.isDone)?"true":"false"}
          </li>
        ))}
      </ul>
      <div>
      </div>
      <button onClick={signOut}>Sign out</button>
      <Link href="/test1">Link: test1</Link>  
    </main>
  );
}
