// graphql, apollo server test
import { ApolloServer, gql } from "apollo-server";
let tweets = [
    {
        id: "1",
        text: "Hello, world 1!",
        userId: "2"
    },
    {
        id: "2",
        text: "Hello, world 2!",
        userId: "1"
    },
];
let users = [{
    id:"1",
    firstName: "Kairo",
    lastName: "Jeong",
}

];

const typeDefs = gql`
    type User{
        id:ID!
        username:String!
        firstName:String!
        lastName:String
        fullName:String
    }
    type Tweet{
        id:ID
        text: String
        author:User
    }
    type Query{
        allUsers:[User!]!
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

const resolvers = {
    Query: {
        allTweets() {
            return tweets;
        },        
        allUsers(){
            return users;
        },
        // tweet() {
        //      console.log("I'm a tweet");
        //     return null;
        // },
        tweet(root, { id }) {
            // console.log(args);
            return tweets.find((tweet) => tweet.id === id);
        },
        // ping(){
        //     return "pong";
        // },
    },
    Mutation: {
        postTweet(_, { text, userId }) {
            const newTweet = {
                id: tweets.length + 1,
                text,
            };
            tweets.push(newTweet);
            return newTweet;
        },
        deleteTweet(_, {id}) {
        },
    },
    User:{
        firstName({firstName}){
            return this.firstName;
        },
        fullName({firstName, lastName}){
            return `${firstName} ${lastName}`;
        },
    },
    Tweet:{
        author({userId}){
            return users.find((user) => user.id === userId);
        }
    }
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
    console.log(`Running on ${url}`);
});