// graphql, apollo server test
import { ApolloServer, gql } from "apollo-server";
import fetch from "node-fetch";

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
        """
        Is the sum of firstName + lastName as a string
        """
        fullName:String
    }
    """ 
    Tweet objects represents a resource for a tweet.
    """

    type Tweet{
        id:ID
        text: String
        author:User
    }
    type Query{
        allMovies:[Movie!]!
        allUsers:[User!]!
        allTweets: [Tweet]
        tweet(id:ID!): Tweet
        ping: String
        movie(id: String!): Movie
    }    
    type Mutation{
        postTweet(text:String!, userId:ID!): Tweet!
        deleteTweet(id:ID!): Boolean!
    }   
    type Movie {
        id: Int!
        url: String
        imdb_code: String!
        title: String
        title_english: String!
        title_long: String!
        slug: String!
        year: Int!
        rating: Float!
        runtime: Float!
        genres: [String]!
        summary: String
        description_full: String!
        synopsis: String
        yt_trailer_code: String!
        language: String!
        background_image: String!
        background_image_original: String!
        small_cover_image: String!
        medium_cover_image: String!
        large_cover_image: String!
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
        allMovies() {
            return fetch("https://yts.mx/api/v2/list_movies.json")
            .then((response)  => response.json())
            .then((json) => json.data.movies);
        },
        movie(root,{id}) {
            return fetch(`https://yts.mx/api/v2/movie_details.json?movie_id=${id}`
            // ,{
            //     headers: {
            //     'Content-Type': 'application/json',
            //     },
            //     }
                )
            .then((response)  => response.json())
            .then((json) => json.data.movie);
        }
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