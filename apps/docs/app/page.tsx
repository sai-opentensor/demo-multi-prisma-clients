'use client';
import React from 'react';
import styles from './page.module.css';
import { Button } from '@repo/ui/button';
import { signIn, signOut, useSession } from 'next-auth/react';

export default function Page(): JSX.Element {
  const { data: session, status } = useSession();
  const [formData, setFormData] = React.useState({
    name: '',
    email: '',
    password: '',
  });

  console.log({ status });
  console.log({ session });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  async function handleSubmit(e: any) {
    e.preventDefault();
    console.log('Form data submitted:', formData);
    try {
      setFormData({
        name: '',
        email: '',
        password: '',
      });
      const res = await fetch('/api/create-user', {
        method: 'POST',
        body: JSON.stringify(formData),
      });

      const result = await res.json();

      console.log(res);
    } catch (error) {
      console.log(error);
    }
  }
  async function fetchUserDetails() {
    try {
      const res = await fetch('/api/create-user');
      console.log('get', res);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <main className={styles.main}>
      <button onClick={fetchUserDetails}>Get User</button>
      {status === 'authenticated' ? (
        <form
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
          }}
          onSubmit={handleSubmit}
        >
          <div>
            <label
              style={{
                color: '#fff',
              }}
              htmlFor="name"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label
              style={{
                color: '#fff',
              }}
              htmlFor="email"
            >
              Email
            </label>
            <input
              type="text"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label
              style={{
                color: '#fff',
              }}
              htmlFor="password"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit">Submit</button>
        </form>
      ) : null}
      {status === 'authenticated' ? (
        <Button
          appName="web"
          className={styles.button}
          onClick={() => signOut()}
        >
          Logout
        </Button>
      ) : (
        <Button
          appName="web"
          className={styles.button}
          onClick={() => signIn('google')}
        >
          Login with google
        </Button>
      )}
    </main>
  );
}
