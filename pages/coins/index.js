import Axios from 'axios';
import Link from 'next/link';
import { StarIcon } from '@heroicons/react/24/outline';
import CoinListItem from '../../components/CoinListItem';
import React, { useState, useEffect } from 'react';


const CoinList = ({ coinData }) => {

    const [watchlist, setWatchlist] = useState([]);

    const handleAddToWatchlist = (coinId) => {
        const coin = coinData.find(coin => coin.id === coinId);

        if (!watchlist.includes(coin)) {
            setWatchlist([...watchlist, coin]);
        } else {
            const newWatchlist = watchlist.filter(coin => coin.id !== coinId);
            setWatchlist(newWatchlist);
        }

    }
    
    
    
    useEffect( () => {
        localStorage.setItem( 'watchlist', JSON.stringify(watchlist));
        JSON.parse(localStorage.getItem('watchlist')) || []
        // console.log(watchlist);
    }), [watchlist];

    return (
        <>
            <ul className='pt-10'>
                {coinData.map((coin) => {
                    return <CoinListItem key={coin.id} coin={coin} watchlist={watchlist} onAddToWatchlist={() => handleAddToWatchlist(coin.id)}/>
                })}
            </ul>
        </>
    )
};

// Generates SSR: Server Side Rendering
export const getServerSideProps = async () => {
    const data = await Axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=true&price_change_percentage=1h%2C24h%2C7d%2C30d%2C1y');
    return {
        props: {
            coinData: data.data
        }
    }
};

export default CoinList;