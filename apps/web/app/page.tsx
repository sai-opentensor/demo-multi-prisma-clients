'use client';
import Image from 'next/image';
import { Card } from '@repo/ui/card';
import { Code } from '@repo/ui/code';
import styles from './page.module.css';
import { Button } from '@repo/ui/button';
import { signIn, signOut, useSession } from 'next-auth/react';

function Gradient({
  conic,
  className,
  small,
}: {
  small?: boolean;
  conic?: boolean;
  className?: string;
}): JSX.Element {
  return (
    <span
      className={[
        styles.gradient,
        conic ? styles.glowConic : undefined,
        small ? styles.gradientSmall : styles.gradientLarge,
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    />
  );
}

const LINKS = [
  {
    title: 'Docs',
    href: 'https://turbo.build/repo/docs',
    description: 'Find in-depth information about Turborepo features and API.',
  },
  {
    title: 'Learn',
    href: 'https://turbo.build/repo/docs/handbook',
    description: 'Learn more about monorepos with our handbook.',
  },
  {
    title: 'Templates',
    href: 'https://turbo.build/repo/docs/getting-started/from-example',
    description: 'Choose from over 15 examples and deploy with a single click.',
  },
  {
    title: 'Deploy',
    href: 'https://vercel.com/new',
    description:
      'Instantly deploy your Turborepo to a shareable URL with Vercel.',
  },
];

export default function Page(): JSX.Element {
  const { data: session, status } = useSession();

  console.log({ status });
  async function handleSubmit(e: any) {
    e.preventDefault();
    console.log({
      name: 'Kiri',
      email: 'skiran017@gmail.com',
      password: '!@#$%^&*',
    });
    try {
      const res = await fetch('/api/create-user', {
        method: 'POST',
        body: JSON.stringify({
          name: 'Kiri',
          email: 'skiran017@gmail.com',
          password: '!@#$%^&*',
        }),
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
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <p>
          examples/basic&nbsp;
          <Code className={styles.code}>web</Code>
        </p>
        <div>
          <a
            href="https://vercel.com?utm_source=create-turbo&utm_medium=basic&utm_campaign=create-turbo"
            rel="noopener noreferrer"
            target="_blank"
          >
            By{' '}
            <Image
              alt="Vercel Logo"
              className={styles.vercelLogo}
              height={24}
              priority
              src="/vercel.svg"
              width={100}
            />
          </a>
        </div>
      </div>
      <button onClick={fetchUserDetails}>Get User</button>
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
      {status === 'authenticated' ? (
        <form
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
          }}
          onSubmit={handleSubmit}
        >
          <input type="text" placeholder="enter name" />
          <input type="text" placeholder="enter email" />
          <input type="text" placeholder="enter password" />
          <button type="submit">Submit</button>
        </form>
      ) : null}
    </main>
  );
}
