import React, { useEffect, useState } from "react";

const url = "https://course-api.com/react-tours-project";

const Layout = () => {
  const [tours, setTours] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [readMore, setReadMore] = useState(false);

  const handleButton = (id) => {
    const newTours = tours.filter((tour) => tour.id !== id);
    setTours(newTours);
  };
  useEffect(() => {
    fetch(url)
      .then((resp) => {
        if (resp.status >= 200 && resp.status <= 299) {
          setIsLoading(false);
          return resp.json();
        } else {
          setIsError(true);
          setIsLoading(false);
          console.log(resp);
          throw new Error(resp.statusText);
        }
      })
      .then((tours) => {
        setTours(tours);
        setIsError(false);
      })
      .catch((error) => console.log(error));

    return () => {
      console.log(tours);
      console.log("data success");
    };
  }, []);

  if (isLoading) {
    return (
      <>
        <h1>Loading...</h1>
      </>
    );
  }
  if (isError) {
    return (
      <div>
        <h2>The Page is missing</h2>
      </div>
    );
  }

  return (
    <div>
      {tours.map((tour) => {
        console.log(tour);
        return (
          <div key={tour.id} className="my-auto p-4">
            <div className="items-center flex flex-col">
              <img src={tour.image} alt="photos" className="h-48 w-32" />
              <div>
                <h1 className="text-xl">{tour.name}</h1>
                <p className="text-sm text-gray-600">
                  {readMore ? tour.info : `${tour.info.substring(0, 200)}...`}
                </p>
                <button type="button" onClick={() => setReadMore(!readMore)}>
                  {readMore ? "Show Less" : "Read More"}
                </button>
              </div>
              <button
                className="p-2 bg-green-300 hover:bg-blue-400"
                type="button"
                onClick={() => handleButton(tour.id)}
              >
                Not Interested
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Layout;
