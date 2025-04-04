import { Link } from "react-router-dom";
import ProfileBanner from "../../components/profileBanner";

const Profile = () => {
  return (
    <div className="">
      <div>
        <ProfileBanner />
      </div>
      {/* End of Bannee */}
      <h1 className=" flex justify-center text-4xl text-[#25aae1] py-8">
        Offres principales
      </h1>
      <div className="relative overflow-hidden bg-gray-900 pt-16 pb-32 space-y-24">
        <div className="relative">
          <div className="lg:mx-auto lg:grid lg:max-w-7xl lg:grid-flow-col-dense lg:grid-cols-2 lg:gap-24 lg:px-8 ">
            <div className="mx-auto max-w-xl px-6 lg:mx-0 lg:max-w-none lg:py-16 lg:px-0 ">
              <div>
                <div className="mt-6">
                  <h2 className="text-3xl font-bold tracking-tight text-white">
                    Plateforme MoTickets:
                  </h2>
                  <p className="mt-4 text-lg text-gray-300">
                    Une plateforme de billetterie robuste et conviviale qui
                    répond à une large gamme d'événements, des concerts et
                    festivals aux conférences et rassemblements locaux.
                  </p>
                  <div className="mt-6">
                    <Link
                      className="inline-flex rounded-lg bg-[#25aae1] px-4 py-1.5 text-base font-semibold leading-7 text-white shadow-sm ring-1 ring-[#25aae1] hover:bg-blue-400 hover:ring-blue-400"
                      to="#"
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
                  alt="lazy"
                  loading="lazy"
                  width="647"
                  height="486"
                  className="w-full rounded-xl shadow-2xl ring-1 ring-black ring-opacity-5 lg:absolute lg:left-0 lg:h-full lg:w-auto lg:max-w-none"
                  style={{ color: "transparent" }}
                  src="https://res.cloudinary.com/deluxe-bluz/image/upload/v1708428673/istockphoto-1483001823-612x612_b5j7jh.jpg"
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
                    Solutions innovantes :
                  </h2>
                  <p className="mt-4 text-lg text-gray-300">
                    Intégration continue de fonctionnalités innovantes, telles
                    que les programmes de fidélité, les portefeuilles numériques
                    et les analyses en temps réel, pour améliorer l'expérience
                    globale de l'événement.
                  </p>
                  <div className="mt-6">
                    <Link
                      className="inline-flex rounded-lg bg-[#25aae1] px-4 py-1.5 text-base font-semibold leading-7 text-white shadow-sm ring-1 ring-[#25aae1] hover:bg-blue-400 hover:ring-blue-400"
                      to="#"
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
                  src="https://res.cloudinary.com/deluxe-bluz/image/upload/v1708428356/istockphoto-1484912807-612x612_h5zj8e.jpg"
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
                    Engagement communautaire :
                  </h2>
                  <p className="mt-4 text-lg text-gray-300">
                    Un focus dédié à la création d'une communauté dynamique
                    autour d'intérêts communs, favorisant l'interaction entre
                    les passionnés d'événements.{" "}
                  </p>
                  <div className="mt-6">
                    <Link
                      className="inline-flex rounded-lg bg-[#25aae1] px-4 py-1.5 text-base font-semibold leading-7 text-white shadow-sm ring-1 ring-[#25aae1] hover:bg-blue-400 hover:ring-blue-400"
                      to="#"
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
                  src="https://res.cloudinary.com/deluxe-bluz/image/upload/v1708427732/jigar-panchal-1RdbckbHAL0-unsplash_u8rnts.jpg"
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
                    Proposition de valeur unique (PVU) :
                  </h2>
                  <p className="mt-4 text-lg text-gray-300">
                    MoTickets se distingue par son engagement envers
                    l'innovation, l'accessibilité et la création de communauté.
                    Notre plateforme va au-delà de la billetterie
                    conventionnelle, offrant une expérience holistique qui
                    s'étend du moment de l'achat jusqu'à la joie partagée de
                    participer aux événements.
                  </p>
                  <div className="mt-6">
                    <Link
                      className="inline-flex rounded-lg bg-[#25aae1] px-4 py-1.5 text-base font-semibold leading-7 text-white shadow-sm ring-1 ring-[#25aae1] hover:bg-blue-400 hover:ring-blue-400"
                      to="#"
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
                  src="https://res.cloudinary.com/deluxe-bluz/image/upload/v1708429840/istockphoto-1460160897-170667a_kzq7gi.webp"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <h1 className=" flex justify-center text-4xl text-[#25aae1] py-8">
        Valeurs clés
      </h1>
      <div className="relative overflow-hidden bg-gray-900 pt-16 pb-32 space-y-24">
        <div className="relative">
          <div className="lg:mx-auto lg:grid lg:max-w-7xl lg:grid-flow-col-dense lg:grid-cols-2 lg:gap-24 lg:px-8 ">
            <div className="mx-auto max-w-xl px-6 lg:mx-0 lg:max-w-none lg:py-16 lg:px-0 ">
              <div>
                <div className="mt-6">
                  <h2 className="text-3xl font-bold tracking-tight text-white">
                    Orientation client :
                  </h2>
                  <p className="mt-4 text-lg text-gray-300">
                    Placer les besoins et la satisfaction de nos clients au cœur
                    de chaque décision et solution.
                  </p>
                  <div className="mt-6">
                    <Link
                      className="inline-flex rounded-lg bg-[#25aae1] px-4 py-1.5 text-base font-semibold leading-7 text-white shadow-sm ring-1 ring-[#25aae1] hover:bg-blue-400 hover:ring-blue-400"
                      to="#"
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
                  width="647"
                  height="486"
                  className="w-full rounded-xl shadow-2xl ring-1 ring-black ring-opacity-5 lg:absolute lg:left-0 lg:h-full lg:w-auto lg:max-w-none"
                  style={{ color: "transparent" }}
                  src="https://res.cloudinary.com/deluxe-bluz/image/upload/v1708430123/istockphoto-1135379129-612x612_dr6ayt.jpg"
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
                    Intégrité:
                  </h2>
                  <p className="mt-4 text-lg text-gray-300">
                    Respecter les normes les plus élevées d'intégrité dans
                    toutes nos interactions, transactions et partenariats.
                  </p>
                  <div className="mt-6">
                    <Link
                      className="inline-flex rounded-lg bg-[#25aae1] px-4 py-1.5 text-base font-semibold leading-7 text-white shadow-sm ring-1 ring-[#25aae1] hover:bg-blue-400 hover:ring-blue-400"
                      to="#"
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
                  src="https://res.cloudinary.com/deluxe-bluz/image/upload/v1708430465/istockphoto-1607523727-612x612_toctka.jpg"
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
                    Adaptabilité:
                  </h2>
                  <p className="mt-4 text-lg text-gray-300">
                    Accepter le changement et rester agile pour répondre aux
                    besoins évolutifs de l'industrie dynamique des événements.
                  </p>
                  <div className="mt-6">
                    <Link
                      className="inline-flex rounded-lg bg-[#25aae1] px-4 py-1.5 text-base font-semibold leading-7 text-white shadow-sm ring-1 ring-[#25aae1] hover:bg-blue-400 hover:ring-blue-400"
                      to="#"
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
                  src="https://res.cloudinary.com/deluxe-bluz/image/upload/v1708430572/istockphoto-1923572690-612x612_qkhir4.jpg"
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
                    Collaboration :
                  </h2>
                  <p className="mt-4 text-lg text-gray-300">
                    Favoriser la collaboration entre notre équipe, les
                    organisateurs d'événements et les participants pour créer
                    une communauté unie et dynamique.{" "}
                  </p>
                  <div className="mt-6">
                    <Link
                      className="inline-flex rounded-lg bg-[#25aae1] px-4 py-1.5 text-base font-semibold leading-7 text-white shadow-sm ring-1 ring-[#25aae1] hover:bg-blue-400 hover:ring-blue-400"
                      to="#"
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
                  src="https://res.cloudinary.com/deluxe-bluz/image/upload/v1708430786/istockphoto-999831610-612x612_fsmcl0.jpg"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
