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
      </div>
    </section>
  );
}

export default DisplayPage;
