import { useState } from 'react';

interface LoginResponse {
  token: string;
  user: {
    id: number;
    user: string;
  };
}

async function login(user: string, password: string): Promise<LoginResponse> {
  const response = await fetch('http://localhost:3000/users/user/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      user: user,
      password: password
    }),
  });

  console.log(response)

  if (!response.ok) {
    throw new Error('Login failed');
  }

  const data: LoginResponse = await response.json();
  return data;
}

async function createUser(user: string, password: string): Promise<LoginResponse> {
  const response = await fetch('http://localhost:3000/users/create', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      user: user,
      password: password
    }),
  });

  console.log(response)

  if (!response.ok) {
    throw new Error('Failed to create user');
  }

  const data: LoginResponse = await response.json();
  return data;
}


function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const result = await login(username, password);
      console.log('Login bem-sucedido:', result);
    } catch (error) {
      console.error('Erro ao fazer login:', error);
    }
  };

  const handleSignIn = async () => {
    try {
      const result = await createUser(username, password);
      console.log('User created', result);
    } catch (error) {
      console.error('Failed to create user', error);
    }
  };

  return (
    <>
        <div id="loginContainer">
            
            <h2>Login</h2>
            
            <div id="user">
                <label>Username:</label>
                <input type="text" name="text" placeholder="Text" aria-label="Text" onChange={(e) => setUsername(e.target.value)}/>
            </div>
            
            <div id="pass">
                <label>Password:</label>
                <input type="password" name="password" placeholder="Password" aria-label="Password" onChange={(e) => setPassword(e.target.value)}/>
                
            </div>

            <button className="outline" onClick={handleSignIn}>Sign in</button>
            <button className="outline" onClick={handleLogin}>Login</button>
            
        </div>
    </>
  )
}

export default Login
