import React from 'react';
import { useQuery, gql } from '@apollo/client'


const MESSAGE_QUERY = gql`
    query {
        moviesUpcoming {
            movies {
                title
                original_title
                id
            }
            maxDate
        }
    }
`

const Message = () => {

    const { data, loading, error } = useQuery(MESSAGE_QUERY)

    if (loading) return "Loading...";
    if (error) return <pre>{error.message}</pre>
    const movies = data.moviesUpcoming.movies
    return (
        <div>
            {
                movies.map(({title, original_title, id}) => <p key={id}>{title} - {original_title}</p>)
            }
            <p>hello</p>
        </div>
    );
}

export default Message;
