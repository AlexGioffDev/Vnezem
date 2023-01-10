import React from 'react';
import {useQuery, gql} from '@apollo/client'


const MESSAGE_QUERY = gql`
    query {
        message
    }
`

const Message = () => {

    const {data, loading, error} = useQuery(MESSAGE_QUERY)

    if (loading) return "Loading...";
    if(error) return <pre>{error.message}</pre>

    return (
        <div>
            <p>{data.message}</p>
        </div>
    );
}

export default Message;
