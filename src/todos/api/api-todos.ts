async function getTodos({
  userId,
  count,
  offset,
}: {
  userId: number;
  count?: number;
  offset?: number;
}): Promise<Object> {
  const URL = 'api/get';
  const data = JSON.stringify({ user_id: userId, count, offset });
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    mode: 'cors' as RequestMode,
    body: data,
  };

  try {
    const requestData = await fetch(URL, options).then(response => response.json());

    if (requestData.error) {
      return { error: requestData };
    }

    return { data: requestData };
  } catch (error) {
    throw new Error('Network error');
  }
}

async function createTodo({
  userId,
  title,
  body,
}: {
  userId: number;
  title: string;
  body?: string;
}): Promise<Object> {
  const URL = 'api/create';
  const data = JSON.stringify({ user_id: userId, title, body });
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    mode: 'cors' as RequestMode,
    body: data,
  };

  try {
    const requestData = await fetch(URL, options).then(response => response.json());

    if (requestData.error) {
      return { error: requestData };
    }

    return { data: requestData };
  } catch (error) {
    throw new Error('Network error');
  }
}

async function editTodo({
  todoId,
  userId,
  title,
  body,
  completed,
}: {
  todoId: number;
  userId: number;
  title: string;
  body?: string;
  completed?: boolean;
}): Promise<Object> {
  const URL = 'api/edit';
  const data = JSON.stringify({ todo_id: todoId, user_id: userId, title, body, completed });
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    mode: 'cors' as RequestMode,
    body: data,
  };

  try {
    const requestData = await fetch(URL, options).then(response => response.json());

    if (requestData.error) {
      return { error: requestData };
    }

    return { data: requestData };
  } catch (error) {
    throw new Error('Network error');
  }
}

async function deleteTodo({ todo, userId }: { todo: number; userId: number }): Promise<Object> {
  const URL = 'api/delete';
  const data = JSON.stringify({ todo_id: todo, user_id: userId });
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    mode: 'cors' as RequestMode,
    body: data,
  };

  try {
    const requestData = await fetch(URL, options).then(response => response.json());

    if (requestData.error) {
      return { error: requestData };
    }

    return { data: requestData };
  } catch (error) {
    throw new Error('Network error');
  }
}

export default [
  {
    type: 'get',
    api: getTodos,
  },
  {
    type: 'create',
    api: createTodo,
  },
  {
    type: 'edit',
    api: editTodo,
  },
  {
    type: 'delete',
    api: deleteTodo,
  },
];

export { getTodos, createTodo, editTodo, deleteTodo };
