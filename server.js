// graphql, apollo server test
import { ApolloServer, gql } from "apollo-server";
const tweets =[
    {
        id: "1",
        text: "Hello, world 1!",
    },
    {
        id: "2",
        text: "Hello, world 2!",
    },
];

const typeDefs = gql`
    type User{
        id:ID!
        username:String!
        firstName:String!
        lastName:String
    }
    type Tweet{
        id:ID
        text: String
        author:User
    }
    type Query{
        allTweets: [Tweet]
        tweet(id:ID!): Tweet
        ping: String
    }    
    type Mutation{
        postTweet(text:String!, userId:ID!): Tweet!
        deleteTweet(id:ID!): Boolean!
    }   
    
`;
//GET /api/v1/tweeters
//post /api/v1/tweets
//GET /api/v1/tweet/:id

const resolvers ={
    Query:{
        allTweets(){
            return tweets;
        },
        // tweet() {
        //      console.log("I'm a tweet");
        //     return null;
        // },
        tweet(root, {id}) {
            // console.log(args);
            return tweets.find((tweet)=> tweet.id === id);
        },
        // ping(){
        //     return "pong";
        // },
    },
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
    console.log(`Running on ${url}`);
});