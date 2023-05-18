import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const LeftSideNav = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch("https://62-dragon-news-server.vercel.app/news-categories")
      .then((res) => res.json())
      .then((data) => setCategories(data));
  }, []);
  return (
    <div>
      <div>
        {categories.map((category) => (
          <p key={category.id}>
            <Link to={`/category/${category.id}`}>{category.name} </Link>
          </p>
        ))}
      </div>
    </div>
  );
};

export default LeftSideNav;

