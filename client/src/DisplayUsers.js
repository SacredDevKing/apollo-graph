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
