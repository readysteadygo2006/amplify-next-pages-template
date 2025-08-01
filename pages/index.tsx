import Link from "next/link"
import { useState, useEffect } from "react";
import { generateClient } from "aws-amplify/data";
import type { Schema } from "@/amplify/data/resource";
import { useAuthenticator } from "@aws-amplify/ui-react";

const client = generateClient<Schema>();

export default function App() {
  const [todos, setTodos] = useState<Array<Schema["Todo"]["type"]>>([]);
  const [systems, setSystems] = useState<Array<Schema["System"]["type"]>>([]);
    
  const { user, signOut } = useAuthenticator();

  function deleteTodo(id: string) {
    client.models.Todo.delete({ id })
  }

  function deleteSystem(id: string) {
    client.models.System.delete({ id })
  }

  function listTodos() {
    client.models.Todo.observeQuery().subscribe({
      next: (data) => setTodos([...data.items]),
    });
  }

  function listSystems() {
    client.models.System.observeQuery().subscribe({
      next: (data) => setSystems([...data.items]),
    });
  }


  useEffect(() => {
    //listTodos();
    listSystems();
  }, []);

  function createTodo() {
    client.models.Todo.create({
      content: window.prompt("Todo content"),
      isDone: true,
    });
  }

  function createSystem() {
    client.models.System.create({
      uId: window.prompt("System uId"),
      userId: window.prompt("User Id"),
    });
  }

  return (
    <main>
      <h1>User: {user?.signInDetails?.loginId}</h1>
      <h1>Systems</h1>
      <button onClick={createSystem}>+ new</button>
      <ul>
        {systems.map((system) => (
          <li 
            onClick={() => deleteSystem(system.id)}
            key={system.id}>
            {system.uId}
            {'  --- '}
            {system.userId}
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
