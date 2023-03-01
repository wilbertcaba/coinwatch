import Head from 'next/head';

export default function Home() {
    return (
        <div>
            <Head>
                <title>NexTut</title>
            </Head>
            <h1 className={styles.red}>Hello World!</h1>
        </div>
    )
}
