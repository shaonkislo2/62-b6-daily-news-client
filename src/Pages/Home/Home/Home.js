import React from 'react';
import { useLoaderData } from 'react-router-dom';
import NewsSummaryCard from '../../Shared/NewsSummaryCard/NewsSummaryCard';

const Home = () => {
    const AllNews = useLoaderData();
    return (
        <div>
           <h2>Dragon News Home: {AllNews.length} </h2> 
           {
             AllNews.map(news => <NewsSummaryCard
             key={news._id}
             news={news}
             ></NewsSummaryCard> )
           }
        </div>
    );
};

export default Home;