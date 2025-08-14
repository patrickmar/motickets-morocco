import moment from "moment";
import "moment/locale/fr"; // Import French locale
import { BsInstagram, BsTwitterX } from "react-icons/bs";
import logo from "./../../assets/logo/motickets_logo_-.png";
import fleximage1 from "./../../assets/images/fleximage1.jpeg";
import { company, guests, hosts } from "../../constant";
import { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { Link } from "react-router-dom";

const baseUrl = process.env.REACT_APP_BASEURL;
type Props = {};

const Footer = (props: Props) => {
  const [email, setEmail] = useState("");
  moment.locale("fr"); // Set moment to use the French locale

  const subscribe = async () => {
    try {
      const res = await axios
        .post(`${baseUrl}/save/subscription`, {
          email: email,
        })
        .then((res: any) => {
          !res.data.error ? toast(res.data.message) : toast(res.data.message);
        });
      console.log(res);
    } catch (error) {
      toast("email not saved, please try again later");
    }
  };
  return (
    <footer className="bg-gray-200 w-full">
      <div className="w-full max-w-[1200px] py-10 px-4 sm:px-6 lg:px-8 lg:pt-20 mx-auto">
        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
          <div className="col-span-full lg:col-span-1 lg:-mt-[18px]">
            <Link
              className="flex-none text-xl font-semibold text-gray-900 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
              to="#"
              aria-label="Brand"
            >
              <img src={logo} alt="MoTickets" />
            </Link>
          </div>
          {/* End Col */}

          <div className="col-span-1">
            <h4 className="font-semibold text-gray-900">Pour les invités</h4>

            <div className="mt-3 grid space-y-3">
              {guests.map((item, i) => (
                <p key={i}>
                  <Link
                    className="inline-flex gap-x-2 text-gray-700 hover:text-red-500"
                    to={item.url}
                  >
                    {item.name}
                  </Link>
                </p>
              ))}
            </div>
          </div>
          {/* End Col */}

          <div className="col-span-1">
            <h4 className="font-semibold text-gray-900">Pour les hôtes</h4>
            <div className="mt-3 grid space-y-3">
              {hosts.map((item, i) => (
                <p key={i}>
                  <Link
                    className="inline-flex gap-x-2 text-gray-700 hover:text-red-500 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                    to={item.url}
                  >
                    {item.name}
                  </Link>
                </p>
              ))}
            </div>
          </div>
          {/* End Col */}

          <div className="col-span-1">
            <h4 className="font-semibold text-gray-900">Entreprise</h4>
            <div className="mt-3 grid space-y-3">
              {company.map((item, i) => (
                <p key={i}>
                  <Link
                    className="inline-flex gap-x-2 text-gray-700 hover:text-red-500 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                    to={item.url}
                  >
                    {item.name}
                  </Link>
                </p>
              ))}
            </div>
          </div>
          {/* End Col */}

          <div className="col-span-2">
            <h4 className="font-semibold text-gray-900">S'abonner</h4>

            <form>
              <div className="mt-4 flex flex-col items-center gap-2 sm:flex-row sm:gap-3 bg-white rounded-lg p-2 dark:bg-gray-800">
                <div className="w-full">
                  <label htmlFor="search" className="sr-only">
                    Rechercher
                  </label>
                  <input
                    type="text"
                    id="search"
                    name="subscribe"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="py-3 px-4 block w-full border-transparent rounded-lg text-sm focus:border-red-500 focus:ring-red-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-transparent dark:text-gray-400 dark:focus:ring-gray-600"
                    placeholder="Entrez votre e-mail"
                  />
                </div>
                <button
                  className="w-full sm:w-auto whitespace-nowrap p-3 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-red-600 text-white hover:bg-red-700 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                  type="button"
                  onClick={subscribe}
                >
                  S'abonner
                </button>
              </div>
              <p className="mt-3 text-sm text-gray-700">
                Abonnez-vous pour être notifié lorsque nous publions de nouveaux
                billets.{" "}
              </p>
            </form>
          </div>
          {/* End Col */}
        </div>
        {/* End Grid */}
        <div className="flex flex-col mt-5 md:flex-row">
          <div>
            <img src={fleximage1} alt="box" />
          </div>
          {/* <div>
            <img src={fleximage} alt="box2" />
          </div> */}
        </div>

        <div className="mt-5 sm:mt-12 grid gap-y-2 sm:gap-y-0 sm:flex sm:justify-between sm:items-center">
          <div className="flex justify-between items-center">
            <p className="text-sm text-gray-900">
              © {moment().format("YYYY")} MoLoyal. Tous droits réservés En
              association avec Bizzy Bizznez Maroc
            </p>
          </div>
          {/* End Col */}

          {/* Social Brands */}
          <div className="justify-center flex">
            <Link
              className="w-10 h-10 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-white hover:bg-white/10 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:ring-1 focus:ring-gray-600"
              to="https://instagram.com/moticketsapp"
            >
              <BsInstagram className="flex-shrink-0 w-4 h-4" />
            </Link>
            <Link
              className="w-10 h-10 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-white hover:bg-white/10 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:ring-1 focus:ring-gray-600"
              to="https://x.com/moticketsapp"
            >
              <BsTwitterX className="flex-shrink-0 w-4 h-4" />
            </Link>
          </div>
          {/* {/* End Social Brands */}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
