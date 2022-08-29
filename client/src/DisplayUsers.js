import { gql, useQuery } from '@apollo/client';

function DisplayUsers() {
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
  const { loading, error, data } = useQuery(GET_ALL_USERS);
  if (error) return <h1>Something went wrong...</h1>;
  if (loading) {
    return <h1>Data is loading...</h1>;
  }

  return (
    <div>
      {data &&
        data.users.map((user) => {
          return (
            <div key={user.id}>
              <h1>{user.name}</h1>
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
