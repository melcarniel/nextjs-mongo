import MeetupList from '../components/meetups/MeetupList';
import { MongoClient } from 'mongodb';
import Head from 'next/head';
import { Fragment } from 'react';

const HomePage = (props) => {
    return (
        <Fragment>
            <Head>
                <title>Meetups!</title>
                <meta name='description' content='List of awesome meetups'></meta>
            </Head>
            <MeetupList meetups={props.meetups} />
        </Fragment>
        
    )
}

export async function getStaticProps() {
    // pegar dados de um servidor
    const client = await MongoClient.connect(`${process.env.URL_MONGO}`)
    const db =  client.db();
    const meetupsCollections = db.collection('meetups');

    const meetups = await meetupsCollections.find().toArray();

    client.close();

    return {
        props: {
            meetups: meetups.map((meetup) => {
                return {
                    title: meetup.title,
                    address: meetup.address,
                    image: meetup.image,
                    id: meetup._id.toString()
                }
            })
        },
        revalidate: 10 // reavalia se os dados mudram a cada 10 seg
    }
}

export default HomePage;