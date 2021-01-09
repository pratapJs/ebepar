import React from "react";
import Hero from "../components/home/Hero";

import FeaturedProducts from "../components/home/FeaturedProducts";
import BestSellers from "../components/home/BestSellers";
import NewArrivals from "../components/home/NewArrivals";

const HomePage = () => {
	return (
		<div>
			<Hero />

			<FeaturedProducts />
			<BestSellers />
			<NewArrivals />
		</div>
	);
};

export default HomePage;
