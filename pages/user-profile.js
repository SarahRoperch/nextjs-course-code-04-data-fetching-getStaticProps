function UserProfilPage(props) {
  return <h1>{props.userName}</h1>;
}

export default UserProfilPage;

export async function getServerSideProps(context) {
  const { params, req, res } = context;

  console.log - "Sever side code";

  return { props: { userName: "Max" } };
}
