import { BiSolidDollarCircle } from "react-icons/bi";
import { Link } from "react-router-dom";
import verify1 from "../../assets/images/verify1.png";
import verify2 from "../../assets/images/verify2.png";
import verify3 from "../../assets/images/verify3.png";
import live from "../../assets/images/live.png";
import f10 from "../../assets/images/f10.png";
import f11 from "../../assets/images/f11.png";
import f9 from "../../assets/images/f9.png";
import p012 from "../../assets/images/p012.png";
import star from "../../assets/images/star.png";
import star1 from "../../assets/images/star1.png";

import { FaMailBulk } from "react-icons/fa";

function Organisers() {
  return (
    <div className="bg-gray-100">
      {/* <Navbar /> */}
      <section
        className="lg:h-[721px] bg-gray-700"
        style={{
          backgroundImage: `url('https://res.cloudinary.com/djhz5a2ba/image/upload/v1706870766/f2ugvbcviq7bxwirmiek.png')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="grid max-w-screen-xl px-4 pt-20 pb-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12 lg:pt-44 ">
          <div className="mr-auto place-self-center lg:col-span-7">
            <h1 className="max-w-2xl mb-4 text-4xl font-extrabold leading-none  md:text-5xl xl:text-6x text-white">
              Succès de l'événement <br />
              Fidélité assurée.
            </h1>

            <p className="max-w-2xl mb-6 font-normal text-white lg:mb-8 md:text-lg lg:te">
              La billetterie d'événements sans effort et la création de
              communauté s'unissent <br />
              dans une plateforme de gestion d'événements <br /> fluide pour
              créer des événements mémorables.
            </p>

            <b className="space-y-4 sm:flex sm:space-y-0 sm:space-x-4">
              <Link
                to="/"
                target="_blank"
                className="inline-flex items-center justify-center bg-red-700 w-full px-5 py-3 text-sm font-medium text-center text-white border border-gray-200 rounded-full sm:w-auto  focus:ring-4 focus:ring-gray-100 dark:text-white dark:border-red-700 hover:bg-red-400"
              >
                Voir tous les événements
              </Link>

              <Link
                to="mailto:help@motickets.co.uk"
                target="_blank"
                className="inline-flex items-center justify-center  w-full px-5 py-3 text-sm font-medium text-center text-white bg-[#0A0D36] border  rounded-full sm:w-auto focus:ring-4  hover:text-white "
              >
                Demander une démo{" "}
              </Link>
            </b>
          </div>

          <div className="hidden lg:mt-0 lg:col-span-5 lg:flex">
            <img
              src={live}
              alt="hero "
              className="w-full h-full rounded-[50px]  border-8"
            />
          </div>
        </div>
      </section>

      {/* custom */}
      <section
        id="create"
        className="pt-20 lg:pt-[120px] pb-12 lg:pb-[90px] relative z-20 overflow-hidden bg-gray-100 "
      >
        <div className="">
          <div className="flex flex-wrap px-4">
            <div className="w-full px-4">
              <div className="text-center mx-auto mb-[60px] lg:mb-20 max-w-[510px]">
                <h2
                  className="
                font-bold
                text-3xl
                sm:text-4xl
                md:text-[40px]
                text-[#25aae1]
                mb-4
                "
                >
                  Créer et personnaliser des événements
                </h2>
              </div>
            </div>
          </div>
          <div className="flex flex-wrap justify-center mx-4">
            <div className="w-full md:w-1/2 lg:w-1/3 px-2 h-auto">
              <div
                className="
                bg-white
                rounded-xl
                relative
                z-10
                overflow-hidden
                border border-[#25aae1] border-opacity-20
                shadow-pricing
                py-10
                px-8
                sm:p-12
                md:py-auto
                lg:py-10 lg:px-6
                xl:p-12
                mb-10             "
              >
                {/* <span className="text-primary font-semibold text-lg block mb-4">
              Personal
            </span> */}
                <img src={p012} alt="pasonal" className="w-24 h-24" />
                <h2 className="font-bold text-dark mb-5 text-[42px]">
                  Billetterie polyvalente
                </h2>
                <p
                  className="
               text-body-color
                pb-8
                mb-8
                leading-[30.8px]
                text-xl h-[250px]"
                >
                  Offrez des variétés de billets illimitées et adaptez les
                  allocations pour répondre aux besoins de votre événement.
                  Réservez les places en toute simplicité et concevez des plans
                  pour garantir une expérience fluide aux participants.{" "}
                </p>

                <div></div>
              </div>
            </div>
            <div className="w-full md:w-1/2 lg:w-1/3 px-2 h-auto">
              <div
                className="
             bg-white
             rounded-xl
             relative
             z-10
             overflow-hidden
             border border-[#25aae1] border-opacity-20
             shadow-pricing
             py-10
             px-8
             md:py-auto
             sm:p-12
             lg:py-10 lg:px-6
             xl:p-12
             mb-10
             "
              >
                {/* <span className="text-primary font-semibold text-lg block mb-4">
              Business
            </span> */}
                <BiSolidDollarCircle className="w-24 h-24 text-red-500" />
                <h2 className="font-bold text-dark mb-5 text-[42px]">
                  Gestion flexible des frais
                </h2>
                <p
                  className="
                 text-body-color
                pb-8
                mb-8
                leading-[30.8px]
                text-xl
              h-[250px]
                "
                >
                  Choisissez si vous souhaitez facturer des frais couverts par
                  le client pour générer des revenus supplémentaires ou couvrir
                  le coût vous-même. Notre plateforme vous permet de
                  personnaliser les structures de frais en fonction de vos
                  objectifs.
                </p>
              </div>
            </div>
            <div className="w-full md:w-1/2 lg:w-1/3 px-2 h-auto">
              <div
                className="
             bg-white
             rounded-xl
             relative
             z-10
             overflow-hidden
             border border-[#25aae1] border-opacity-20
             shadow-pricing
             py-10
             px-8
             sm:p-12
             md:py-auto

             lg:py-10 lg:px-6
             xl:p-12
             mb-10
             "
              >
                <FaMailBulk className="w-24 h-24" />
                <h2 className="font-bold text-dark mb-5 md:text-[42px] text-[32px]">
                  Communication automatisée
                </h2>
                <p
                  className="
                 text-body-color
                pb-8
                mb-8
                leading-[30.8px]
                text-xl h-[250px]
                "
                >
                  Cela permet aux organisateurs d'envoyer des e-mails
                  personnalisés, y compris des confirmations, des mises à jour
                  et des sondages post-événements aux participants, renforçant
                  ainsi l'engagement.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Testimonial */}
      <div id="flexible" className="container  mx-auto md:px-6 bg-gray-100">
        <div className="mb-32 text-center">
          <h2 className="mb-12 text-3xl font-bold text-[#25aae1]">
            Paiements flexibles et sécurisés
          </h2>

          <div className="grid gap-x-6 md:grid-cols-3 lg:gap-x-12 container">
            <div className="mb-12 md:mb-0">
              <div className="mb-6 flex justify-center">
                <img
                  src={f11}
                  className="w-32 h-32 rounded-full shadow-lg dark:shadow-black/20"
                  alt="f11"
                />
              </div>
              <h5 className="mb-2 text-lg font-bold text-[#25aae1]">
                Options de paiement flexibles
              </h5>
              <h6 className="mb-4 font-medium text-gray-900 dark:text-primary-400 ">
                Les clients peuvent choisir parmi différents types de cartes et
                utiliser Google Pay, Apple Pay et PayPal pour les paiements.
              </h6>
            </div>
            <div className="mb-12 md:mb-0">
              <div className="mb-6 flex justify-center">
                <img
                  src={f9}
                  className="w-32 h-32 rounded-full shadow-lg dark:shadow-black/20"
                  alt="f9"
                />
              </div>
              <h5 className="mb-2 text-lg font-bold text-[#25aae1]">
                Paiements sécurisés
              </h5>
              <h6 className="mb-4 font-medium text-gray-900 dark:text-primary-400 ">
                Nous avons conclu un partenariat avec Stripe pour un traitement
                sécurisé des paiements, garantissant la confidentialité et la
                sécurité à chaque étape.
              </h6>
            </div>
            <div className="mb-0">
              <div className="mb-6 flex justify-center">
                <img
                  src={f10}
                  className="w-32 h-32 rounded-full shadow-lg dark:shadow-black/20"
                  alt="f10"
                />
              </div>
              <h5 className="mb-2 text-lg font-bold text-[#25aae1]">
                Options de paiement simplifiées{" "}
              </h5>
              <h6 className="mb-4 font-medium text-gray-900 dark:text-primary-400 ">
                Un clic pour les clients réguliers, paiement en tant qu'invité
                pour les nouveaux clients.
              </h6>
            </div>
          </div>
        </div>
      </div>

      {/* Reward */}
      <section
        id="reward"
        className="flex md:flex-row flex-col md:py-16  py-6  md:-mt-[130px] items-center justify-center bg-gray-100"
      >
        <div className="flex justify-center  border-4 border-gray-600 rounded-[50px] w-[350px] ml-12 h-[500px] mx-uto bg-white ">
          <div className=" flex flex-col ">
            <h1 className="font-bold text-3xl font mt-12 mb-8 text-center">
              Récompensez chaque parcours événementiel
            </h1>
            <p className=" leading-[30.8px]  px-4">
              Élevez votre événement avec notre programme exclusif de
              récompenses de fidélité ! Ravis les acheteurs de billets avec des
              avantages pour les achats fréquents, la participation aux
              événements et l'engagement actif au sein de la communauté.
            </p>
            <div className="flex items-center justify-center mt-2">
              <img src={star1} className="w-full h-full" alt="star1" />
            </div>
          </div>
        </div>
        <div className="flex justify-center  border-4 border-gray-600 rounded-[50px] w-[350px] ml-12 h-[500px] mx-uto bg-white">
          <div className=" flex flex-col">
            <h1 className="font-bold text-3xl font mt-12 mb-8 text-center">
              Événements basés sur les données
            </h1>
            <p className=" leading-[30.8px]  px-4">
              Plongez dans l'assistance, la fidélisation et l'engagement en
              toute simplicité. Notre plateforme offre des analyses complètes
              pour améliorer chaque aspect de vos événements et favoriser la
              croissance de la communauté.
            </p>
            <div className="flex items-center justify-center mt-12">
              <img src={star} className="w-24 h-24 " alt="star" />
            </div>
          </div>
        </div>
      </section>

      {/* Exhibition */}

      <div
        id="moticketsapp"
        className="container  mx-auto md:px-6 md:py-24 bg-gray-100 mb-4 "
      >
        <div className="flex justify-center items-center">
          <h2 className="mb-12 text-3xl font-bold text-[#25aae1]">
            Application MoTicket Agent
          </h2>
        </div>
        <section className="mb-32 text-center">
          <div className="grid gap-x-6 md:grid-cols-3 lg:gap-x-12">
            <div className="mb-12 md:mb-0">
              <div className="mb-6 flex justify-center">
                <img
                  src={verify1}
                  className="w-32 h-32 rounded-full shadow-lg dark:shadow-black/20"
                  alt="verify"
                />
              </div>
              <h5 className="mb-2 text-lg font-bold text-[#25aae1]">
                Vérification du détenteur de billet
              </h5>
              <h6 className="mb-4 font-medium text-gray-900 dark:text-primary-400 ">
                Ne galérez plus jamais avec la numérisation des billets !
                Vérifiez facilement les détenteurs de billets en utilisant leur
                numéro de téléphone ou leur adresse e-mail.
              </h6>
            </div>
            <div className="mb-12 md:mb-0">
              <div className="mb-6 flex justify-center">
                <img
                  src={verify2}
                  className="w-32 h-32 rounded-full shadow-lg dark:shadow-black/20"
                  alt="verify2"
                />
              </div>
              <h5 className="mb-2 text-lg font-bold text-[#25aae1]">
                Validation de billet
              </h5>
              <h6 className="mb-4 font-medium text-gray-900 dark:text-primary-400">
                Enregistrez facilement les invités lors des événements à l'aide
                de notre application Agent.
              </h6>
            </div>
            <div className="mb-0">
              <div className="mb-6 flex justify-center">
                <img
                  src={verify3}
                  className="w-32 h-32 rounded-full shadow-lg dark:shadow-black/20"
                  alt="verify3"
                />
              </div>
              <h5 className="mb-2 text-lg font-bold text-[#25aae1]">
                Vente à l'entrée simplifiée
              </h5>
              <h6 className="mb-4 font-medium text-gray-900 dark:text-primary-400">
                Utilisez notre application Agent pour vendre des billets sur
                place en toute simplicité.
              </h6>
            </div>
          </div>
        </section>
        <div className="container mx-auto flex flex-col justify-around p-4 text-center  lg:flex-row">
          <div className="flex flex-col justify-center lg:text-left">
            <h1 className="py-2 text-3xl font-medium leadi title-font text-gray-900">
              Téléchargez l'application MoLoyal Agent ici
            </h1>
          </div>
          <div className="flex flex-col items-center justify-center flex-shrink-0 mt-6 space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4 lg:ml-4 lg:mt-0 lg:justify-end">
            {/* <Link
              to="https://play.google.com/store/apps/details?id=com.avantecs.moloyal&hl=en&gl=US"
              target="_blank"
            > */}
            <Link to="../MoTickets_Agent_App.apk" target="_blank">
              <button className="inline-flex items-center px-6 py-3 rounded-lg bg-[#25aae1] text-white mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  className="fill-current w-7 h-7 text-white"
                >
                  <path d="M 5.4160156 2.328125 L 12.935547 10.158203 C 13.132547 10.363203 13.45925 10.363203 13.65625 10.158203 L 15.179688 8.5742188 C 15.405688 8.3392188 15.354312 7.956875 15.070312 7.796875 C 11.137313 5.571875 6.2620156 2.811125 5.4160156 2.328125 z M 3.140625 2.8476562 C 3.055625 3.0456562 3 3.2629063 3 3.5039062 L 3 20.591797 C 3 20.788797 3.044375 20.970625 3.109375 21.140625 L 11.576172 12.324219 C 11.762172 12.131219 11.762172 11.826813 11.576172 11.632812 L 3.140625 2.8476562 z M 17.443359 9.2578125 C 17.335484 9.2729375 17.233297 9.32375 17.154297 9.40625 L 15.015625 11.632812 C 14.829625 11.825812 14.829625 12.130219 15.015625 12.324219 L 17.134766 14.529297 C 17.292766 14.694297 17.546141 14.729188 17.744141 14.617188 C 19.227141 13.777188 20.226563 13.212891 20.226562 13.212891 C 20.725562 12.909891 21.007 12.443547 21 11.935547 C 20.992 11.439547 20.702609 10.981938 20.224609 10.710938 C 20.163609 10.676937 19.187672 10.124359 17.763672 9.3183594 C 17.664172 9.2623594 17.551234 9.2426875 17.443359 9.2578125 z M 13.296875 13.644531 C 13.165875 13.644531 13.034047 13.696328 12.935547 13.798828 L 5.4746094 21.566406 C 6.7566094 20.837406 11.328781 18.249578 15.050781 16.142578 C 15.334781 15.981578 15.386156 15.599281 15.160156 15.363281 L 13.65625 13.798828 C 13.55775 13.696328 13.427875 13.644531 13.296875 13.644531 z"></path>
                </svg>
                <span className="flex flex-col items-start ml-4 leading">
                  <span className="mb-1 text-xs text-white">Télécharger</span>
                  {/* <span className="font-semibold title-font text-white">
                    Google Play
                  </span> */}
                </span>
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* Pricing */}
      <div
        id="analytics"
        className="container -mt-14 mx-auto md:px-6 bg-gray-100 py-24"
      >
        <div className="">
          <h2 className="mb-12 -mt-16 text-center text-3xl font-bold text-gray-900">
            Tarification
          </h2>

          <div className="grid gap-6 lg:grid-cols-3 lg:gap-x-12">
            <div className="mb-6 lg:mb-0">
              <div className="block h-full rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-white">
                <div className="border-b-2 border-neutral-100 border-opacity-100 p-6 text-center dark:border-opacity-10">
                  <p className="mb-4 text-sm uppercase">
                    <strong>Basique (Événements gratuits)</strong>
                  </p>
                  <h3 className="mb-6 text-3xl">
                    <strong>Gratuit *</strong>
                  </h3>

                  <button
                    type="button"
                    className="inline-block w-full rounded bg-[#c10006] px-6 pt-2.5 pb-2 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                    data-te-ripple-init
                    data-te-ripple-color="light"
                  >
                    Commencer
                  </button>
                </div>
                <h6 className="p-6 font-semibold">Ce qui est inclus :</h6>
                <div className="p-6">
                  <ol className="list-inside">
                    <li className="mb-4 flex">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="2"
                        stroke="currentColor"
                        className="mr-3 h-5 w-5 text-[#25aae1] dark:text-primary-400"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M4.5 12.75l6 6 9-13.5"
                        />
                      </svg>
                      Aucun frais pour jusqu'à 100 billets gratuits.{" "}
                    </li>
                    <li className="mb-4 flex">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="2"
                        stroke="currentColor"
                        className="mr-3 h-5 w-5 text-[#25aae1] dark:text-primary-400"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M4.5 12.75l6 6 9-13.5"
                        />
                      </svg>
                      Des frais de 0,39 £ par billet gratuit après 100 billets.{" "}
                    </li>
                    <li className="mb-4 flex">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="2"
                        stroke="currentColor"
                        className="mr-3 h-5 w-5 text-[#25aae1] dark:text-primary-400"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M4.5 12.75l6 6 9-13.5"
                        />
                      </svg>
                      Service Client
                    </li>
                  </ol>
                </div>
              </div>
            </div>

            <div className="mb-6 lg:mb-0">
              <div className="block h-full rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-white">
                <div className="border-b-2 border-neutral-100 border-opacity-100 p-6 text-center dark:border-opacity-10">
                  <p className="mb-4 text-sm uppercase text-black">
                    <strong>Standard (Événements Payants)</strong>
                  </p>
                  <h3 className="mb-6 text-3xl">
                    <strong className="text-black">5% +DH0.49</strong>
                    <small>/Billet</small>
                  </h3>
                  <button
                    type="button"
                    className="inline-block w-full rounded bg-[#c10006] px-6 pt-2.5 pb-2 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                    data-te-ripple-init
                    data-te-ripple-color="light"
                  >
                    Commencer
                  </button>
                </div>
                <h6 className="p-6 font-semibold">Ce qui est inclus:</h6>
                <div className="p-6">
                  <ol className="list-inside">
                    <li className="mb-4 flex">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="2"
                        stroke="currentColor"
                        className="mr-3 h-5 w-5 text-[#25aae1] dark:text-primary-400"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M4.5 12.75l6 6 9-13.5"
                        />
                      </svg>
                      Analytique de l'Audience
                    </li>
                    <li className="mb-4 flex">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="2"
                        stroke="currentColor"
                        className="mr-3 h-5 w-5 text-[#25aae1] dark:text-primary-400"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M4.5 12.75l6 6 9-13.5"
                        />
                      </svg>
                      Types de Billets Illimités
                    </li>

                    <li className="mb-4 flex">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="2"
                        stroke="currentColor"
                        className="mr-3 h-5 w-5 text-[#25aae1] dark:text-primary-400"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M4.5 12.75l6 6 9-13.5"
                        />
                      </svg>
                      Accès à l'application Agent
                    </li>
                  </ol>
                </div>
              </div>
            </div>

            <div className="mb-6 lg:mb-0">
              <div className="block h-full rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-white">
                <div className="border-b-2 border-neutral-100 border-opacity-100 p-6 text-center dark:border-opacity-10">
                  <p className="mb-4 text-sm uppercase">
                    <strong>Entreprise</strong>
                  </p>
                  <h3 className="mb-6 text-3xl">
                    {/* <strong>Large & Complex Events</strong> */}
                    <strong>Prix Personnalisés</strong>
                  </h3>
                  <Link to="mailto:help@motickets.co.uk">
                    <button
                      type="button"
                      className="inline-block w-full rounded bg-[#c10006] px-6 pt-2.5 pb-2 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                      data-te-ripple-init
                      data-te-ripple-color="light"
                    >
                      Contactez-nous
                    </button>
                  </Link>
                </div>
                <h6 className="p-6 font-semibold">Ce qui est inclus:</h6>
                <div className="p-6">
                  <ol className="list-inside">
                    <li className="mb-4 flex">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="2"
                        stroke="currentColor"
                        className="mr-3 h-5 w-5 text-[#25aae1] dark:text-primary-400"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M4.5 12.75l6 6 9-13.5"
                        />
                      </svg>
                      Obtenez de l'aide pour planifier votre événement.
                    </li>
                    <li className="mb-4 flex">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="2"
                        stroke="currentColor"
                        className="mr-3 h-5 w-5 text-[#25aae1] dark:text-primary-400"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M4.5 12.75l6 6 9-13.5"
                        />
                      </svg>
                      Prix adaptés à vos besoins.
                    </li>
                    <li className="mb-4 flex">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="2"
                        stroke="currentColor"
                        className="mr-3 h-5 w-5 text-[#25aae1] dark:text-primary-400"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M4.5 12.75l6 6 9-13.5"
                        />
                      </svg>
                      Fonctionnalités Standard
                    </li>
                    <li className="mb-4 flex">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="2"
                        stroke="currentColor"
                        className="mr-3 h-5 w-5 text-[#25aae1] dark:text-primary-400"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M4.5 12.75l6 6 9-13.5"
                        />
                      </svg>
                      Support Premium
                    </li>
                    <li className="mb-4 flex">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="2"
                        stroke="currentColor"
                        className="mr-3 h-5 w-5 text-[#25aae1] dark:text-primary-400"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M4.5 12.75l6 6 9-13.5"
                        />
                      </svg>
                      Responsable de compte dédié
                    </li>
                  </ol>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Organisers;
