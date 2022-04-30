export function DisplayUser({ name, pic, delteButton, editButton }) {
  return (
    <div className="user_container">
      <div className="user_container-info">
        <h3 className="user-name">{name}</h3>
        <div className="added_notes">
          <p>{pic}</p>
        </div>

        <section className="icons-box">
          <div className="like-container"> {editButton}</div>
          <div className="icon-container">{delteButton}</div>
        </section>
      </div>
    </div>
  );
}

// export function EditCounter() {
//   const { user_id } = useParams(); //important
//   const [user, setUser] = useState(null);
//   useEffect(() => {
//     fetch(`https://614ed775b4f6d30017b483a0.mockapi.io/users/${user_id}`, {
//       method: "GET"
//     })
//       .then((data) => data.json())
//       .then((mvs) => setUser(mvs));
//   }, []);

//   // return user ? <UpdatedNewUser user={user} /> : "";
//   //updateMovies is child ... is hanliding the display part...
//   return user ? <Counter user={user} /> : "";
// }

//=====================================================================================

// function Counter() {
//   const [like, SetLike] = useState(0);
//   const [dislike, SetDisLike] = useState(0);

//   return (
//     <div>
//       <button onClick={() => SetLike(like + 1)}>
//         <span aria-label="like" role="img">
//           👍{" "}
//         </span>
//         {like}
//       </button>
//       <button onClick={() => SetDisLike(dislike + 1)}>
//         <span aria-label="like" role="img">
//           👎{" "}
//         </span>
//         {dislike}
//       </button>
//     </div>
//   );
// }
