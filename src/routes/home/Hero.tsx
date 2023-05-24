import { Link } from 'react-router-dom';
import IframeHero from './IframeHero';
import { useEffect, useState } from 'react';

const Hero = () => {
  const [h1Visible, setH1Visible] = useState(false);
  const [dividerVisible, setDividerVisible] = useState(false);
  const [pVisible, setPVisible] = useState(false);
  const [buttonVisible, setButtonVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => setH1Visible(true), 0);
    setTimeout(() => setDividerVisible(true), 400);
    setTimeout(() => setPVisible(true), 800);
    setTimeout(() => setButtonVisible(true), 1200);
  }, []);

  return (
    <section
      className="group/hero hero h-screen overflow-x-hidden px-4 bg-gradient-to-r from-primary to-neutral text-white bg-fixed pt-16 md:pt-0"
      style={{ backgroundImage: `url("bg-dark.png")` }}
    >
      <div className="h-full w-full text-start flex justify-around items-center">
        <div className="max-w-xl space-y-8 mx-auto">
          <h1
            className={`text-5xl md:text-7xl font-bold font-lobster transition-opacity duration-1000 ease-in-out ${
              h1Visible ? 'opacity-100' : 'opacity-0'
            }`}
          >
            Raconte nous tes aventures !
          </h1>
          <div
            className={`h-px transition-width duration-1000 ease-in-out ${
              dividerVisible ? 'w-full max-w-sm' : 'w-0'
            } bg-white`}
          />
          <p
            className={`transition-opacity duration-1000 ease-in-out ${
              pVisible ? 'opacity-100' : 'opacity-0'
            }`}
          >
            Si vous êtes passionné de voyage et que vous avez envie de partager
            vos expériences avec le monde entier, alors vous êtes au bon
            endroit. Notre site vous offre tout ce dont vous avez besoin pour
            créer votre propre blog de voyage et raconter vos aventures. Bon
            voyage !
          </p>
          <Link
            to="./createblog"
            className={`btn btn-secondary w-full max-w-sm transition-opacity duration-1000 ease-in-out ${
              buttonVisible ? 'opacity-100' : 'opacity-0'
            }`}
          >
            Crée ton blog
          </Link>
        </div>
        <div className="hidden md:flex relative md:w-1/2 h-full overflow-hidden">
          <IframeHero />
        </div>
      </div>
    </section>
  );
};

export default Hero;
