async function loginRequest({
  username,
  password,
}: {
  username: string;
  password: string;
}): Promise<Object> {
  const URL = 'api/login';
  const data = JSON.stringify({ username, password });
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

async function registerRequest({
  username,
  password,
}: {
  username: string;
  password: string;
}): Promise<Object> {
  const URL = 'api/register';
  const data = JSON.stringify({ username, password });
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
    type: 'login',
    api: loginRequest,
  },
  {
    type: 'register',
    api: registerRequest,
  },
];

export { loginRequest, registerRequest };
