import GameDetails from "../components/GameDetails";
import GameSwiper from "../components/GameSwiper";
import NewsCard from "../components/NewsCard";

function DisplayPage({ games }) {
  return (
    <section className="home ">
      <div className="container-fluid">
        <div className="row">
          <GameSwiper games={games} />
        </div>
        <div>
          <NewsCard />
        </div>
        <div className="m-7 text-3xl ml-25 text-emerald-500">
          <h1>Most Popular</h1>
        </div>
        <div>
          <GameDetails />
        </div>
      </div>
    </section>
  );
}

export default DisplayPage;
