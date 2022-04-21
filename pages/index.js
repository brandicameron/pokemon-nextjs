import { useState, useEffect } from 'react';
import Link from 'next/link';
import Head from 'next/head';

export default function Home() {
  const [pokemon, setPokemon] = useState([]);

  useEffect(() => {
    async function getPokemon() {
      const resp = await fetch('https://jherr-pokemon.s3.us-west-1.amazonaws.com/index.json');
      setPokemon(await resp.json());
    }
    getPokemon();
  }, []);

  return (
    <div>
      <Head>
        <title>Pokemon List</title>
        <meta name='description' content='Pokemon list to learn Next.js' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <h1 className='home-title'>Pokemon List</h1>

      <ul className='pokemon-list'>
        {pokemon.map((pokemon) => (
          <li className='pokemon-card' key={pokemon.id}>
            <Link href={`/pokemon/${pokemon.id}`}>
              <a>
                <img
                  src={`https://jherr-pokemon.s3.us-west-1.amazonaws.com/${pokemon.image}`}
                  alt={pokemon.name}
                />
              </a>
            </Link>
            <h2 className='pokemon-name'>{pokemon.name}</h2>
          </li>
        ))}
      </ul>
    </div>
  );
}
