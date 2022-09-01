import { gql, useQuery, useMutation } from '@apollo/client';
import { useState } from 'react';

function DisplayUsers() {
  // User states
  const [name, setName] = useState('');
  const [country, setCountry] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState(0);

  // GraphQL Queries
  const GET_ALL_USERS = gql`
    query GetAllUsers {
      users {
        id
        name
        age
        email
        username
      }
    }
  `;

  const CREATE_USER_MUTATION = gql`
    mutation CreateUser($createUserInput: CreateUserInput!) {
      createUser(input: $createUserInput) {
        name
        country
        username
        email
        age
      }
    }
  `;

  // Use queries/mutations
  const { loading, error, data, refetch } = useQuery(GET_ALL_USERS);
  const [createUser] = useMutation(CREATE_USER_MUTATION);
  if (error) return <h1>Something went wrong...</h1>;
  if (loading) {
    return <h1>Data is loading...</h1>;
  }

  return (
    <div>
      <div>
        <input
          type='text'
          placeholder='Name...'
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type='text'
          placeholder='Country...'
          onChange={(e) => setCountry(e.target.value.toUpperCase())}
        />
        <input
          type='text'
          placeholder='Username...'
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type='text'
          placeholder='Email...'
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type='number'
          placeholder='Age...'
          onChange={(e) => setAge(Number(e.target.value))}
        />
        <button
          onClick={() => {
            createUser({
              variables: {
                createUserInput: { name, country, username, email, age },
              },
            });

            // Update dom w/o page refresh when adding user
            refetch();
          }}
        >
          Create User
        </button>
      </div>
      <h1>USERS LIST</h1>
      {data &&
        data.users.map((user) => {
          return (
            <div key={user.id}>
              <h2>{user.name}</h2>
              <p>Age: {user.age}</p>
              <p>Email: {user.email}</p>
              <p>Username: {user.username}</p>
            </div>
          );
        })}
    </div>
  );
}

export default DisplayUsers;
