import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

type BestCity = {
  id: number;
  city: string;
};

const BestCities = () => {
  const bestCities: BestCity[] = [
    { id: 1, city: "Bangalore" },
    { id: 2, city: "Mumbai" },
    { id: 3, city: "kochi" },
    { id: 4, city: "delhi" },
    { id: 5, city: "pune" },
    { id: 7, city: "kolkata" },
    { id: 8, city: "goa" },
  ];

  return (
    <div className="container-custom py-12">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-text-primary">
          We deliver to popular cities like
        </h2>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {bestCities.map((item) => (
          <Link key={item.id} href="/" className="group">
            <div className="card p-4 h-full transition-all duration-200 hover:shadow-md hover:border-primary/20">
              <div className="flex justify-center items-center">
                <span className="text-sm font-medium text-text-primary group-hover:text-primary transition-colors capitalize">
                  {item.city}
                </span>
              </div>
            </div>
          </Link>
        ))}

        <button className="group">
          <div className="card p-4 h-full transition-all duration-200 hover:shadow-md hover:border-primary/20">
            <div className="flex justify-center items-center gap-1">
              <span className="text-sm font-semibold text-text-secondary group-hover:text-primary transition-colors">
                Show more
              </span>
              <FontAwesomeIcon
                icon={faChevronDown}
                size="xs"
                className="text-text-secondary group-hover:text-primary transition-colors"
              />
            </div>
          </div>
        </button>
      </div>
    </div>
  );
};

export default BestCities;
