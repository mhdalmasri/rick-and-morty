import React, { Component } from "react";
import ApolloClient, { gql } from "apollo-boost";
import { ApolloProvider, Query } from "react-apollo";
import "./App.css";

const client = new ApolloClient({
  uri: "https://rickandmortyapi.com/graphql/"
});

class App extends Component {
  state = {
    page: 1
  };
  render() {
    return (
      <div>
        <ApolloProvider client={client}>
          <div>
            <button
              onClick={() => this.setState({ page: this.state.page - 1 })}
            >
              Pre
            </button>
            <button onClick={() => this.setState({ page: 1 })}>1</button>
            <button onClick={() => this.setState({ page: 2 })}>2</button>
            <button onClick={() => this.setState({ page: 3 })}>3</button>
            <button
              onClick={() => this.setState({ page: this.state.page + 1 })}
            >
              Next
            </button>
            <span>Page #{this.state.page}</span>
          </div>
          <div className="App">
            <Query
              query={gql`
            {
              characters(page:${this.state.page}) {
                info {
                  count
                  next
                  prev
                  pages
                }
                results {
                  name
                  id
                  image
                  status
                  gender
                }
              }
            }
          `}
            >
              {({
                loading,
                error,
                data: { characters: { info, results } = {} }
              }) => {
                console.log(loading, error, info, results);
                if (loading) return <p>Loading...</p>;
                if (error) return <p>Error :(</p>;

                return  results.map(({ name, id ,image,index, status, gender}) => <div className="result" key={id}><p>{name}</p>
                <p>{gender} / {status}</p>
                <img src={image} alt="q" /></div>
                );
               
              }}
            </Query>
          </div>
        </ApolloProvider>
      </div>
    );
  }
}

export default App;
