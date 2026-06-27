import { useEffect, useState } from "react";
import logo from "./logo.svg";
// import "./App.css";
import "./index.css";
const tempMovieData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
  },
  {
    imdbID: "tt0133093",
    Title: "The Matrix",
    Year: "1999",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg",
  },
  {
    imdbID: "tt6751668",
    Title: "Parasite",
    Year: "2019",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg",
  },
];

const tempWatchedData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
    runtime: 148,
    imdbRating: 8.8,
    userRating: 10,
  },
  {
    imdbID: "tt0088763",
    Title: "Back to the Future",
    Year: "1985",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BZmU0M2Y1OGUtZjIxNi00ZjBkLTg1MjgtOWIyNThiZWIwYjRiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
    runtime: 116,
    imdbRating: 8.5,
    userRating: 9,
  },
];

const average = (arr) =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);
const KEY = "a9c9b81e";

// f84fc31d
// tt0372784
// const query = "interstellar";

export default function App() {
  const [query, setQuery] = useState("batman");
  const [movies, setMovies] = useState([]);
  const [watched, setWatched] = useState([]);
  const [loading, setloading] = useState(false);
  const [error, seterror] = useState("");
  const [selectid, setselectid] = useState(null);
  // .then((res) => res.json())
  // .then((data) => setMovies(data.Search));
  function hendlerselectid(id) {
    setselectid((selectid) => (selectid === id ? null : id));
    console.log(id);
  }
  function hndelercloss() {
    setselectid(null);
  }

  useEffect(() => {
    async function getMovies() {
      console.log("KEY =", KEY);
      console.log("query =", query);
      setloading(true);
      try {
        if (query.length < 3) {
          setMovies([]);
          seterror("");
          return;
        }

        const res = await fetch(
          `https://www.omdbapi.com/?apikey=${KEY}&s=${query}`,
        );

        if (!res.ok) {
          throw new Error("Failed to fetch movies");
        }

        const data = await res.json();
        console.log("API DATA =", data);
        if (data.Response === "False") {
          throw new Error(data.Error);
        }

        setMovies(data.Search);
      } catch (err) {
        console.error(err.message);
        seterror(err.message);
        setMovies([]);
      }
      setloading(false);
    }

    getMovies();
  }, [query]);
  // try {
  //   useEffect(
  //     function () {
  //       async function Moviselist() {
  //         const res = await fetch(
  //           `https://www.omdbapi.com/?apikey=${KEY}&s=${query}`,
  //         );
  //         const data = await res.json();
  //         if (!res.ok) throw new Error("not find error");
  //         console.log(data);
  //         setMovies(data.Search);
  //       }
  //       Moviselist();
  //       if (!query.length < 3) {
  //         setMovies([]);

  //         return;
  //       }
  //     },
  //     [query],
  //   );
  // } catch (err) {
  //   console.log(err.message);
  // }
  // fetch(
  //   `https://www.omdbapi.com/?apikey=${KEY}&S=interstellar`
  //     .then((res) => res.json())
  //     .then((data) => console.log(data)),
  // );

  // const data = await res.json();
  // if (!res.ok) throw new Error("Failed to fetch movies");
  // if (data.Response === "False") throw new Error(data.Error);

  // setMovies(data.Search);
  // console.log(data);

  // function henderdelete(id) {
  //   setWatched((watched) => watched.filter(movies.imdbID !== id));
  // }
  return (
    /////الان برای عبور موویی از بچه استفاده ی کنیم
    <>
      <NavBar movies={movies}>
        <Search query={query} setQuery={setQuery} />
        <Logo />
        <Numberlist movies={movies} />
      </NavBar>
      {/* <Mine  /> */}
      <Mine movies={movies}>
        {/* <Listbox movies={movies} /> */}
        <Box movies={movies}>
          {loading && <Loder />}
          {loading && !error && (
            <Movelist movies={movies} onselectid={hendlerselectid} />
          )}
          {error && <Messsageaerror message={error} />}
          <Movelist movies={movies} onselectid={hendlerselectid} />
        </Box>

        <Box watched={watched}>
          {selectid ? (
            <Moiveslistput
              selectid={selectid}
              oncloss={hndelercloss}
              watched={watched}
            />
          ) : (
            <>
              <Watchedsammary watched={watched} />
              <Watchedmovelist watched={watched} />
            </>
          )}
        </Box>
      </Mine>
    </>
  );
}

function Loder() {
  return (
    <div className="loder">
      <p>....loding</p>
    </div>
  );
}
function Messsageaerror({ message }) {
  return (
    <p className="">
      <span></span> {message}
    </p>
  );
}
///// تغمیر حفاری برای اینکه جزع زیاد بشه کار سختی است
function NavBar({ children }) {
  /////باید ببنیم اجزا قابل اسنفاده مجدد استت اگه هست ارزش  تجزیه کردن دارد
  return <nav className="nav-bar">{children}</nav>; ///////الان ان  واسطه را حذف کردیم
} ////برای ایتکه این تودر تو این اجزا زیاد  گیج کننده نباشد میاد با بچه این حفره را پر می کنیم
function Logo() {
  return (
    <div className="logo">
      <span role="img">🍿</span>
      <h1>usePopcorn</h1>
    </div>
  );
}
function Search({ query, setQuery }) {
  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
    />
  );
}
// function Search({ query, setQuery }) {
//   return (
//     <input
//       className="search"
//       type="text"
//       placeholder="Search movies..."
//       value={query}
//       onChange={(e) => {
//         console.log("typed:", e.target.value);
//         setQuery(e.target.value);
//       }}
//     />
//   );
// }
////////
function Numberlist({ movies }) {
  return (
    <p className="num-results">
      Found <strong>{movies.length}</strong> results
    </p>
  );
} ///// جدا سازی منطقی  میتونیم هر سمت از هم جدا کنیم
function Mine({ children }) {
  return <main className="main">{children}</main>; //// اینجا به دوقسمت قسیم میشه
}
function Box({ children }) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="box">
      <button className="btn-toggle" onClick={() => setIsOpen((open) => !open)}>
        {isOpen ? "–" : "+"}
      </button>
      {isOpen && children}
    </div>
  ); //////حفاری  پایه باید انجام دهیم برای تعدد فیلم ها
}
//// اینا چون شکل هم بودن از روش استفده محح استفده کردیم
/*function Watchedbox({ children }) {
  const [isOpen2, setIsOpen2] = useState(true);

  return (
    <div className="box">
      <button
        className="btn-toggle"
        onClick={() => setIsOpen2((open) => !open)}
      >
        {isOpen2 ? "–" : "+"}
      </button>
      {
        isOpen2 && children /////این لیست تماشا شده ها را از ازیه عبور دهیم
        // <></>
      }
    </div>
  );
}
  */
function Movelist({ movies, onselectid }) {
  ///// اکنون کاری که باید کنیم حفاری پایه است
  ////   لیست مشخصات
  return (
    ////دریافت داده به اجزای عمق  تو در   تو
    <ul className="list">
      {movies?.map(
        (
          movie, ////از فیلم فعلی عبور می کند  به عنوان نقشه پایه است
        ) => (
          <Movie movie={movie} key={movie.imdbID} onselectid={onselectid} />
        ),
      )}
    </ul>
  );
}
function Movie({ movie, onselectid }) {
  console.log("onselectid =", onselectid);

  return (
    <li onClick={() => onselectid(movie.imdbID)}>
      <img src={movie.Poster} alt={`${movie.Title} poster`} />
      <h3>{movie.Title}</h3>
      <div>
        <p>
          <span>🗓</span>
          <span>{movie.Year}</span>
        </p>
      </div>
    </li>
  );
}
function Moiveslistput({ selectid, oncloss, watched }) {
  const [move, setmove] = useState({});
  const [loading, setloading] = useState(false);
  const {
    Title: title,
    Year: year,
    Poster: poster,
    Runtime: runtime,
    imdbRating,
    Plot: plot,
    Released: released,
    Genre: genre,
    Actors: actors,
    Director: director,
    userRating,
  } = move;
  const moviveadd = {
    imdbRating: selectid,
    title,
    year,
    poster,
    imdbRating: Number(imdbRating),
  };
  const [userating, setuserating] = useState("");
  useEffect(
    function () {
      async function getlsit() {
        setloading(true);
        try {
          setmove([]);
          const res = await fetch(
            `https://www.omdbapi.com/?apikey=${KEY}&s=${selectid}`,
          );

          if (!res.ok) {
            throw new Error("Failed to fetch movies");
          }

          const data = await res.json();
          setmove(data);
          getlsit();
          console.log("API DATA =", data);
          if (data.Response === "False") {
            throw new Error(data.Error);
          }

          // setmove(data.Search);
        } catch (err) {
          console.error(err.message);
          setmove([]);
        }
        setloading(false);
      }

      getlsit();
    },
    [selectid],
  );

  return (
    // <div className="details">
    //   <button className="btn-back" onClick={oncloss}>
    //     <></>
    //   </button>
    //   <h2>Selected Movie ID</h2>
    //   <p>{selectid}</p>
    // </div>
    <div className="details">
      {loading ? (
        <Loder />
      ) : (
        <>
          <button className="btn-back" onClick={oncloss}></button>
          <img src={poster} alt={`${move}move `} />
          <header>
            <div className="detaills-overview">
              <h2>{title}</h2>
              <p>
                {released} {runtime}
              </p>
              <p>{genre}</p>
              <p>
                <span></span>
                {imdbRating} imde reating
              </p>
            </div>
          </header>
          <section>
            <div className="rating">
              <>
                {/* <StarRating
                  maxrating={10}
                  size={24}
                  onsetrating={setuserating}
                /> */}
                {/* {" "} */}

                <button className="btn-add"></button>
              </>

              <p>yue rate move</p>
            </div>

            <p>
              <em>{plot}</em>
            </p>
            <p>{actors}</p>
            <p>{director}</p>
          </section>
        </>
      )}
    </div>
  );
}
function Watchedsammary({ watched }) {
  /////اگر همه چیز عبور شده یغنی این فیلم دید ه شده اسن ما این به والد پاس دادیم
  const avgImdbRating = average(watched.map((movie) => movie.imdbRating));
  const avgUserRating = average(watched.map((movie) => movie.userRating));
  const avgRuntime = average(watched.map((movie) => movie.runtime));
  return (
    <div className="summary">
      <h2>Movies you watched</h2>
      <div>
        <p>
          <span>#️⃣</span>
          <span>{watched.length} movies</span>
        </p>
        <p>
          <span>⭐️</span>
          <span>{avgImdbRating}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{avgUserRating}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{avgRuntime} min</span>
        </p>
      </div>
    </div>
  );
}
function Watchedmovelist({ watched }) {
  return (
    <ul className="list">
      {watched.map((movie) => (
        <Wahtmoive movie={movie} key={movie.imdbID} />
      ))}
    </ul>
  );
}
function Wahtmoive({ movie }) {
  return (
    <li>
      <img src={movie.Poster} alt={`${movie.Title} poster`} />
      <h3>{movie.Title}</h3>
      <div>
        <p>
          <span>⭐️</span>
          <span>{movie.imdbRating}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{movie.userRating}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{movie.runtime} min</span>
        </p>
      </div>
    </li>
  );
}
