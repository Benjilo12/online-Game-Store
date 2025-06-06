import god from "./images/god.png";
import madden from "./images/madden.jpg";
import messi from "./images/messi.png";

function NewsCard() {
  const cards = [
    {
      img: god,
      title: "Customize your club with FC Points",
      subtitle:
        "Use them in Football Ultimate Team™, the Clubs Store, and more",
    },
    {
      img: messi,
      title: "See the Rest of The World TOTS",
      subtitle:
        "The EA SPORTS FC 25 Rest of The World Team of the Season is here",
    },
    {
      img: madden,
      title: "This year's cover has arrived",
      subtitle: "Superstar Saquon Barkley is your Madden NFL 26 cover star",
    },
  ];
  return (
    <div className="flex flex-wrap gap-9 justify-center p-6 bg-gray-900 text-white mt-6">
      {cards.map((card, index) => (
        <div
          key={index}
          className="bg-[#1e1e2f] rounded-2xl w-[400px] overflow-hidden shadow-lg hover:scale-[1.02] transition-transform"
        >
          <img
            src={card.img}
            alt={card.title}
            className="w-full h-48 object-cover"
          />
          <div className="p-4">
            <h3 className="font-semibold text-white text-lg leading-snug">
              {card.title}
            </h3>
            <p className="text-gray-300 text-sm mt-1">{card.subtitle}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default NewsCard;
