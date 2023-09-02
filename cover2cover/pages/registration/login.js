import PocketBase from "pocketbase";
import { useForm } from "react-hook-form";
const pb = new PocketBase("http://127.0.0.1:8090"); // The database server

export default function Registration() {
  const [isLoading, setLoading] = useState(false);
  const [dummy, setDummy] = useState(0);
  const { register, handleSubmit } = useForm();

  const isLoggedIn = pb.authStore.isValid;

  async function login(data) {
    setLoading(true);
    try {
      const authData = await pb
        .collection("users")
        .authWithPassword(data.email, data.password);
    } catch (e) {
      alert("Something went wrong");
    }
    setLoading(false);
  }

  function logout() {
    pb.authStore.clear();
    setDummy(Math.random());
  }

  if (isLoggedIn)
    return (
      <>
        <h1>Logged In: {pb.authStore.model.email}</h1>
        <button onClick={logout}>Log Out</button>
      </>
    );

  return (
    <>
      {isLoading && <p>Loading...</p>}
      <h1>Please Log In</h1>
      <form onSubmit={handleSubmit(login)}>
        <input type="text/" placeholder="email" {...register("email")} />
        <input
          type="password/"
          placeholder="password"
          {...register("password")}
        />
        <button type="submit" disabled={isLoading}>
          {isLoading ? "Loading" : "Login"}
        </button>
      </form>
    </>
  );
}
