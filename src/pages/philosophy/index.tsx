import { Link } from "react-router-dom";
import CorporateBanner from "../../components/corporateBanner";

const Philosophy = () => {
  return (
    <div className="">
      <div>
        <CorporateBanner />
      </div>
      {/* End of Bannee */}
      <h1 className=" flex justify-center text-4xl text-[#25aae1]">
        Valeurs fondamentales
      </h1>
      <div className="relative overflow-hidden bg-gray-900 pt-16 pb-32 space-y-24">
        <div className="relative">
          <div className="lg:mx-auto lg:grid lg:max-w-7xl lg:grid-flow-col-dense lg:grid-cols-2 lg:gap-24 lg:px-8 ">
            <div className="mx-auto max-w-xl px-6 lg:mx-0 lg:max-w-none lg:py-16 lg:px-0 ">
              <div>
                <div className="mt-6">
                  <h2 className="text-3xl font-bold tracking-tight text-white">
                    Innovation:
                  </h2>
                  <p className="mt-4 text-lg text-gray-300">
                    Nous adoptons l'innovation pour redéfinir l'expérience de
                    billetterie, en introduisant des solutions de pointe qui
                    simplifient le processus tant pour les organisateurs que
                    pour les participants.
                  </p>
                  <div className="mt-6">
                    <Link
                      className="inline-flex rounded-lg bg-[#25aae1] px-4 py-1.5 text-base font-semibold leading-7 text-white shadow-sm ring-1 ring-[#25aae1] hover:bg-blue-400 hover:ring-blue-400"
                      to="/contact"
                    >
                      En savoir plus
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-12 sm:mt-16 lg:mt-0">
              <div className="-mr-48 pl-6 md:-mr-16 lg:relative lg:m-0 lg:h-full lg:px-0">
                <img
                  loading="lazy"
                  width="647"
                  height="486"
                  className="w-full rounded-xl shadow-2xl ring-1 ring-black ring-opacity-5 lg:absolute lg:left-0 lg:h-full lg:w-auto lg:max-w-none"
                  style={{ color: "transparent" }}
                  src="https://images.unsplash.com/photo-1569144157591-c60f3f82f137"
                  alt="blue"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="relative">
          <div className="lg:mx-auto lg:grid lg:max-w-7xl lg:grid-flow-col-dense lg:grid-cols-2 lg:gap-24 lg:px-8 ">
            <div className="mx-auto max-w-xl px-6 lg:mx-0 lg:max-w-none lg:py-16 lg:px-0 lg:col-start-2">
              <div>
                <div className="mt-6">
                  <h2 className="text-3xl font-bold tracking-tight text-white">
                    Accessibilité:
                  </h2>
                  <p className="mt-4 text-lg text-gray-300">
                    Nous nous engageons à rendre les événements accessibles à
                    tous. Notre plateforme garantit l'inclusivité, permettant à
                    des publics variés de participer à une large gamme
                    d'expériences.
                  </p>
                  <div className="mt-6">
                    <Link
                      className="inline-flex rounded-lg bg-[#25aae1] px-4 py-1.5 text-base font-semibold leading-7 text-white shadow-sm ring-1 ring-[#25aae1] hover:bg-blue-400 hover:ring-blue-400"
                      to="/login"
                    >
                      Learn More
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-12 sm:mt-16 lg:mt-0">
              <div className="-ml-48 pr-6 md:-ml-16 lg:relative lg:m-0 lg:h-full lg:px-0">
                <img
                  alt="Inbox user interface"
                  loading="lazy"
                  width="647"
                  height="486"
                  className="w-full rounded-xl shadow-xl ring-1 ring-black ring-opacity-5 lg:absolute lg:right-0 lg:h-full lg:w-auto lg:max-w-none"
                  style={{ color: "transparent" }}
                  src="https://images.unsplash.com/photo-1599134842279-fe807d23316e"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="relative">
          <div className="lg:mx-auto lg:grid lg:max-w-7xl lg:grid-flow-col-dense lg:grid-cols-2 lg:gap-24 lg:px-8 ">
            <div className="mx-auto max-w-xl px-6 lg:mx-0 lg:max-w-none lg:py-16 lg:px-0 ">
              <div>
                <div className="mt-6">
                  <h2 className="text-3xl font-bold tracking-tight text-white">
                    Fiabilité:
                  </h2>
                  <p className="mt-4 text-lg text-gray-300">
                    La confiance est la base de notre service. Nous donnons la
                    priorité à la fiabilité dans tous les aspects, des
                    transactions sécurisées aux informations précises sur la
                    billetterie.
                  </p>
                  <div className="mt-6">
                    <Link
                      className="inline-flex rounded-lg bg-[#25aae1] px-4 py-1.5 text-base font-semibold leading-7 text-white shadow-sm ring-1 ring-[#25aae1] hover:bg-blue-400 hover:ring-blue-400"
                      to="/login"
                    >
                      En savoir plus
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-12 sm:mt-16 lg:mt-0">
              <div className="-mr-48 pl-6 md:-mr-16 lg:relative lg:m-0 lg:h-full lg:px-0">
                <img
                  alt="bluz"
                  loading="lazy"
                  width="646"
                  height="485"
                  className="w-full rounded-xl shadow-2xl ring-1 ring-black ring-opacity-5 lg:absolute lg:left-0 lg:h-full lg:w-auto lg:max-w-none transparent"
                  style={{ color: "transparent" }}
                  src="https://images.unsplash.com/photo-1483478550801-ceba5fe50e8e"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="relative">
          <div className="lg:mx-auto lg:grid lg:max-w-7xl lg:grid-flow-col-dense lg:grid-cols-2 lg:gap-24 lg:px-8 ">
            <div className="mx-auto max-w-xl px-6 lg:mx-0 lg:max-w-none lg:py-16 lg:px-0 lg:col-start-2">
              <div>
                <div className="mt-6">
                  <h2 className="text-3xl font-bold tracking-tight text-white">
                    Communauté:
                  </h2>
                  <p className="mt-4 text-lg text-gray-300">
                    MoTickets est bien plus qu'une plateforme ; c'est une
                    communauté. Nous favorisons les connexions en rassemblant
                    les gens autour d'une passion commune pour les événements et
                    les expériences en direct.
                  </p>
                  <div className="mt-6">
                    <Link
                      className="inline-flex rounded-lg bg-[#25aae1] px-4 py-1.5 text-base font-semibold leading-7 text-white shadow-sm ring-1 ring-[#25aae1] hover:bg-blue-400 hover:ring-blue-400"
                      to="/login"
                    >
                      En savoir plus
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-12 sm:mt-16 lg:mt-0">
              <div className="-ml-48 pr-6 md:-ml-16 lg:relative lg:m-0 lg:h-full lg:px-0">
                <img
                  alt="Inbox user interface"
                  loading="lazy"
                  width="647"
                  height="486"
                  className="w-full rounded-xl shadow-xl ring-1 ring-black ring-opacity-5 lg:absolute lg:right-0 lg:h-full lg:w-auto lg:max-w-none"
                  style={{ color: "transparent" }}
                  src="https://images.unsplash.com/photo-1599134842279-fe807d23316e"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Philosophy;
