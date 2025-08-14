// @ts-nocheck
import {
  ChangeEvent,
  FocusEvent,
  FormEvent,
  FormEventHandler,
  useEffect,
  useState,
} from "react";

import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { CountryCode, E164Number } from "libphonenumber-js";
import ContentWrapper from "../../components/ContentWrapper";

import { NumericFormat } from "react-number-format";
import { Link, useNavigate } from "react-router-dom";
import { getCurrency, getCurrencyName } from "../../utils/functions";

import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type Props = {
  tickets: Array<any>;
  ticketData: Array<any>;
  data: any;
  stripeData: any;
};

interface ICheckoutForm {
  firstName: string;
  lastName: string;
  email: string;
  phoneNo: string;

  userConsent: boolean;
  [key: string]: string | boolean;
}

interface IBoolean {
  [key: string]: boolean;
}

const SuccessComponent = (props: Props) => {
  // console.log(props);
  const { stripeData, data } = props;
  const defaultCountryCode = process.env.REACT_APP_COUNTRYCODE;
  const taxPercent = Number(process.env.REACT_APP_TAXPERCENT);
  const baseUrl = process.env.REACT_APP_BASEURL;
  //console.log(ticketData);
  const [tickets, setTickets] = useState(null);
  const [stripe, setStripe] = useState(null);
  const [userData, setUserData] = useState(data);
  const [ticketData, setTicketData] = useState(null);
  const [validatePay, setValidatePay] = useState(false);
  const [loading, setLoading] = useState(true);
  //console.log(stripeData);
  const currency = tickets && getCurrency(tickets.currency);
  const navigate = useNavigate();

  const currencyName = tickets && getCurrencyName(tickets.currency);
  const query = new URLSearchParams(window.location.search);

  // useEffect(() => {
  //   const createOrder = async () => {
  //     try {
  //       const res = await userRequest.post("/orders", {
  //         userId: currentUser._id,
  //         products: cart.products.map((item) => ({
  //           productId: item._id,
  //           quantity: item._quantity,
  //         })),
  //         amount: cart.total,
  //         address: data.billing_details.address,
  //       });
  //       setOrderId(res.data._id);
  //     } catch {}
  //   };
  //   data && createOrder();
  // }, [cart, data, currentUser]);
  //

  //  const { data, loading } =  usePost(`/dispense/ticket`, {
  //             tickets : tickets,
  //             userdata: data,
  //             currency: currencycode
  //        });

  // const { tickdata, loading } =  usePost(`/dispense/ticket`, {
  //   tickets : tickets,
  //   userdata: data,
  //   currency: currencycode
  // });

  // console.log(tickdata)

  useEffect(() => {
    // Check to see if this is a redirect back from Checkout
    const customId = "toastid";
    const GetSession = async (sessionid) => {
      try {
        const session = await axios.post(`${baseUrl}/retrieve/stripe_session`, {
          sessionid: sessionid,
        });

        const user = session.data.session.metadata;
        setUserData(user);
        //console.log(userData);

        const stripeSession = session.data.session;
        setStripe(stripeSession);
        //console.log(stripeSession);

        const tacks = session.data.lineitem;
        setTickets(tacks);
      } catch (error) {
        // console.log(error);
        toast.error(error, {
          toastId: customId,
        });
      }
    };
    if (query.get("session_id")) {
      const sessionid = query.get("session_id");
      // console.log(sessionid);

      sessionid && GetSession(sessionid);
    }

    if (query.get("canceled")) {
      toast.error(
        "Commande annulée – continuez à faire vos achats et passez à la caisse quand vous êtes prêt."
      );
    }
  }, []);

  const resetState = () => {
    //setTickets({});
    setStripe({});
    setUserData({});
    //setTickData({});
    // console.log(tickets);
  };

  useEffect(() => {
    //console.log(tickets);

    const MakeRequest = async () => {
      const customId2 = "toastid2";
      try {
        // console.log(tickets);
        // console.log(stripe);
        // console.log(userData);

        //      const { data, loading } =  usePost(`/stripe/payment`, {
        //       tokenId : stripeToken.id,
        //       amount: totalAmount*100,
        //       currency: currencycode
        //  });
        const res = await axios
          .post(`${baseUrl}/dispense/internationalticket-stripenew`, {
            userdata: userData,
            stripeData: stripe,
            ticketData: tickets,
          })
          .then((res: any) => {
            console.log(res.data);
            console.log(res.data.error);
            console.log(res.data.message);
            // setLoading(false);
            // setData(res?.name === "AxiosError" ? null : res);
            setTimeout(() => {
              // toast.success("Order placed! You will receive an email confirmation.", {
              //   toastId: customId2
              // });
              if (res.data.error === false) {
                setValidatePay(true);
              }
              setLoading(false);

              resetState();
              //setData(res?.name === "AxiosError" ? null : res);
            }, 5000 * 1);
          });

        //toast(res.data.error);
      } catch (error) {
        console.log(error);
      }
    };

    tickets && MakeRequest();
  }, [tickets]);

  // console.log(data);

  return (
    <div className="detailsBanner">
      {!loading ? (
        <div
          style={{
            height: "100vh",

            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            color: "white",
          }}
        >
          {!validatePay ? (
            <>
              <span
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "black",
                }}
              >
                Le paiement est invalide ! Veuillez contacter l'administrateur.
              </span>
              <button
                onClick={() => navigate("/")}
                style={{
                  padding: 10,
                  marginTop: 20,
                  alignItems: "center",
                  justifyContent: "center",
                  color: "black",
                }}
                className="flex w-full items-center justify-center rounded-md border border-transparent bg-red-600 px-6 py-3 text-base font-medium text-black shadow-sm hover:bg-red-700"
              >
                Aller à la page d'accueil.
              </button>
            </>
          ) : (
            <>
              <span
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "black",
                }}
              >
                Les billets ont été achetés avec succès.
              </span>
              <button
                onClick={() => navigate("/")}
                style={{
                  marginTop: 20,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "white",
                }}
                className="flex w-full items-center justify-center rounded-md border border-transparent bg-red-600 px-6 py-3 text-base font-medium text-black shadow-sm hover:bg-red-700"
              >
                Aller à la page d'accueil.
              </button>
            </>
          )}
        </div>
      ) : (
        <div className="detailsBannerSkeleton">
          <ContentWrapper>
            <div className="left skeleton"></div>
            <div className="right">
              <span
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "red",
                  marginTop: "1rem",
                }}
              >
                Chargement... Ne pas actualiser<br></br>
              </span>
              {[1, 2, 3, 4, 5, 6, 7].map((item, i) => (
                <div key={i} className="row skeleton"></div>
              ))}
            </div>
          </ContentWrapper>
        </div>
      )}
    </div>
  );
};

export default SuccessComponent;
