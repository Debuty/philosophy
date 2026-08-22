import React from "react";
import { Box } from "@mui/material";
import FeaturesSection from "./components/FeaturesSection/FeaturesSection";
import FeaturedPhilosophers from "./components/FeaturedPhilosophers/FeaturedPhilosophers";
import CallToAction from "./components/CallToAction/CallToAction";
import HeroSection from "./components/HeroSection/HeroSection";
import LatestArticles from "./components/LatestArticles/LatestArticles";
import "./Home.scss";

const Home: React.FC = () => {
  return (
    <Box className="home">
      <HeroSection />
      <LatestArticles />
      <FeaturedPhilosophers />
      <FeaturesSection />
      <CallToAction />
    </Box>
  );
};

export default Home;
