// import { useState, useEffect } from 'react';
import Link from 'next/link';
import Head from 'next/head';
// import { useRouter } from 'next/router';
import styles from '../../styles/Details.module.css';

// server side rendering code
export async function getServerSideProps({ params }) {
  const resp = await fetch(
    `https://jherr-pokemon.s3.us-west-1.amazonaws.com/pokemon/${params.id}.json`
  );

  return {
    props: {
      pokemon: await resp.json(),
    },
  };
}

export default function Details({ pokemon }) {
  // client side rendering code
  // const {
  //   query: { id },
  // } = useRouter();

  // const [pokemon, setPokemon] = useState(null);

  // useEffect(() => {
  //   async function getPokemon() {
  //     const resp = await fetch(
  //       `https://jherr-pokemon.s3.us-west-1.amazonaws.com/pokemon/${id}.json`
  //     );
  //     setPokemon(await resp.json());
  //   }
  //   if (id) {
  //     getPokemon();
  //   }
  // }, [id]);

  // if (!pokemon) {
  //   return null;
  // }

  return (
    <div>
      <Head>
        <title>{pokemon.name}</title>
        <meta name='description' content='Pokemon list to learn Next.js' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <Link href='/'>
        <a className={styles.homeBtn}>Back Home</a>
      </Link>

      <main className={styles.detailsContainer}>
        <div>
          <img
            className={styles.picture}
            src={`https://jherr-pokemon.s3.us-west-1.amazonaws.com/${pokemon.image}`}
            alt={pokemon.name}
          />
        </div>
        <div>
          <div className={styles.name}>{pokemon.name}</div>
          <div className={styles.type}>{pokemon.type.join(', ')}</div>
          <table>
            <thead>
              <tr>
                <th className={styles.header}>Name</th>
                <th className={styles.header}>Value</th>
              </tr>
            </thead>
            <tbody>
              {pokemon.stats.map(({ name, value }) => (
                <tr key={name}>
                  <td className={styles.attribute}>{name}</td>
                  <td className={styles.value}>{value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
