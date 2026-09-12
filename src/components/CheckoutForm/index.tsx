// @ts-nocheck
import {
  ChangeEvent,
  FocusEvent,
  FormEvent,
  FormEventHandler,
  useEffect,
  useState,
} from "react";
import axios from "axios";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { CountryCode, E164Number } from "libphonenumber-js";
import { useParams } from "react-router-dom";
import { validationSchema } from "./validation";
import { NumericFormat } from "react-number-format";
import { Link, useNavigate } from "react-router-dom";
import { getCurrency, getCurrencyName } from "../../utils/functions";
import { sha256, sha224 } from "js-sha256";
import usePost from "../../hooks/usePost";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { loadStripe } from "@stripe/stripe-js";

type Props = {
  tickets: Array<any>;
  totalAmount: number;
  subTotal: number;
  totalbookingFee: number;
  vat: number;
  data: any;
};

interface ICheckoutForm {
  firstName: string;
  lastName: string;
  email: string;
  phoneNo: string;
  terms: boolean;
  userConsent: boolean;
  [key: string]: string | boolean;
}

interface IBoolean {
  [key: string]: boolean;
}

const CheckoutForm = (props: Props) => {
  const { tickets, data, totalAmount, subTotal, totalbookingFee, vat } = props;
  const defaultCountryCode = process.env.REACT_APP_COUNTRYCODE;
  const taxPercent = Number(process.env.REACT_APP_TAXPERCENT);
  const baseUrl = process.env.REACT_APP_BASEURL;
  const MERCHANTACCOUNT = process.env.REACT_APP_MERCHANTACCOUNT;
  const PAYWALLSECRETKEY = process.env.REACT_APP_PAYWALLSECRETKEY;
  const PAYWALLURL = process.env.REACT_APP_PAYWALLURL;
  const NOTIFICATIONKEY = process.env.REACT_APP_NOTIFICATIONKEY;
  const STRIPE_KEY = process.env.REACT_APP_STRIPE_KEY;

  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    phoneNo: "",
    userConsent: false,
    terms: false,
  };

  const [formData, setFormData] = useState<ICheckoutForm>(initialValues);
  const [errors, setErrors] = useState<ICheckoutForm>(initialValues);
  const [touched, setTouched] = useState<IBoolean>({
    firstName: false,
    lastName: false,
    email: false,
    phoneNo: false,
    terms: false,
  });
  const [disabled, setDisabled] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<
    "payzone" | "stripe" | null
  >(null);
  const [discount, setDiscount] = useState("");
  const [ticketDatas, setTicketDatas] = useState("");
  const { firstName, lastName, email, phoneNo, userConsent, terms } = formData;
  const navigate = useNavigate();

  const currency = data && getCurrency(data);
  const currencyName = data && getCurrencyName(data);
  const query = new URLSearchParams(window.location.search);

  useEffect(() => {
    const customId = "toastid";

    if (query.get("success")) {
      toast.success("Order placed! You will receive an email confirmation.", {
        toastId: customId,
      });
    }

    if (query.get("canceled")) {
      toast.error(
        "Order canceled -- continue to shop around and checkout when you're ready."
      );
    }
  }, [query]);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]:
        e.target.name === "terms" || e.target.name === "userConsent"
          ? e.target.checked
          : e.target.value,
    }));
  };

  const handleChange = (value: E164Number) => {
    setFormData((prevState) => ({
      ...prevState,
      phoneNo: value,
    }));
  };

  const onFocus = (e: FocusEvent<HTMLInputElement>) => {
    const { name } = e.target;
    setTouched({ ...touched, [name]: true });
  };

  const onBlur = () => {
    validate();
  };

  useEffect(() => {
    validate();
  }, [formData]);

  const datee = Date.now();
  let f = datee.toString();
  let time = f.substring(0, 10);

  const userDatads = {
    firstName,
    lastName,
    email,
    phoneNo,
    discount,
    currencyName,
  };

  const title = data.title;

  // Payzone Payload
  const payzonePayload = {
    merchantAccount: MERCHANTACCOUNT,
    timestamp: time,
    skin: "vps-1-vue",
    customerId: time,
    customerCountry: "MA",
    customerLocale: "en_US",
    chargeId: time,
    price: totalAmount.toString(),
    currency: "MAD",
    description: title,
    customerName: firstName + " " + lastName,
    customerEmail: email,
    chargeProperties: {
      firstName: firstName,
      title: title,
      lastName: lastName,
      email: email,
      subtotal: subTotal.toString(),
      vat: vat.toString(),
      bookfee: totalbookingFee.toString(),
      currencyName: "MAD",
    },
    memo: JSON.stringify(tickets),
    mode: "DEEP_LINK",
    paymentMethod: "CREDIT_CARD",
    showPaymentProfiles: "true",
    callbackUrl:
      "https://moloyal.com/mosave-ma/script/api/dispense_ticket/payzone_ma",
    successUrl: "https://motickets.ma",
    failureUrl: "https://motickets.ma/failure",
    cancelUrl: "https://motickets.ma/failure",
  };

  const json_payload = JSON.stringify(payzonePayload);
  const signature = sha256(PAYWALLSECRETKEY + json_payload);

  // Stripe Payment Handler
  const handleStripePayment = async () => {
    if (!terms) {
      toast.error("Please accept the terms and conditions");
      return;
    }

    setIsProcessing(true);
    try {
      const ticketData = {
        firstName,
        lastName,
        email,
        phoneNo,
        userConsent,
        terms,
        discount,
        currencyName,
        vat,
        tickets,
        totalAmount,
        subTotal,
        totalbookingFee,
      };

      const response = await axios.post(`${baseUrl}/checkout/stripe_session`, {
        ticketData,
        amount: totalAmount,
        currency: currencyName || "MAD",
        successUrl: `${window.location.origin}/success`,
        cancelUrl: `${window.location.origin}/checkout`,
      });

      if (response.data.url) {
        // Redirect to Stripe Checkout
        window.location.href = response.data.url;
      } else {
        throw new Error("No checkout URL received from server");
      }
    } catch (error) {
      console.error("Stripe payment error:", error);
      toast.error("Failed to initiate Stripe payment. Please try again.");
      setIsProcessing(false);
    }
  };

  const validate = () => {
    validationSchema
      .validate(formData, { abortEarly: false })
      .then(() => {
        setErrors(initialValues);
      })
      .catch((err: any) => {
        const errs: ICheckoutForm = initialValues;
        err.inner.forEach((error: any) => {
          if (touched[error.path]) errs[error.path] = error.message;
        });
        setErrors(errs);
      });

    validationSchema.isValid(formData).then((valid) => setDisabled(!valid));
  };

  const onDiscountChange = (e: ChangeEvent<HTMLInputElement>) => {
    setDiscount(e.target.value);
  };

  const onDiscountClick = () => {};

  return tickets ? (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-gray-900 dark:to-blue-900 py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-[#25aae1] to-blue-800 bg-clip-text text-transparent mb-4">
            Paiement Sécurisé
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Complete your purchase with confidence
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-[#25aae1] to-[#c10006] mx-auto rounded-full mt-4"></div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Left Column - Form */}
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border border-white/20">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 bg-gradient-to-r from-[#25aae1] to-[#1e8fc5] rounded-full flex items-center justify-center">
                <svg
                  className="w-5 h-5 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Informations Personnelles
              </h2>
            </div>

            {/* Payment Method Selection */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Choose Payment Method
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => setSelectedPaymentMethod("stripe")}
                  className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                    selectedPaymentMethod === "stripe"
                      ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
                      : "border-gray-200 dark:border-gray-600 hover:border-blue-300"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                        selectedPaymentMethod === "stripe"
                          ? "border-blue-500 bg-blue-500"
                          : "border-gray-300"
                      }`}
                    >
                      {selectedPaymentMethod === "stripe" && (
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                      )}
                    </div>
                    <div className="text-left">
                      <div className="font-semibold text-gray-900 dark:text-white">
                        Stripe
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        International Payment
                      </div>
                    </div>
                  </div>
                </button>

                {/* <button
                  type="button"
                  onClick={() => setSelectedPaymentMethod("payzone")}
                  className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                    selectedPaymentMethod === "payzone"
                      ? "border-green-500 bg-green-50 dark:bg-green-900/20"
                      : "border-gray-200 dark:border-gray-600 hover:border-green-300"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                        selectedPaymentMethod === "payzone"
                          ? "border-green-500 bg-green-500"
                          : "border-gray-300"
                      }`}
                    >
                      {selectedPaymentMethod === "payzone" && (
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                      )}
                    </div>
                    <div className="text-left">
                      <div className="font-semibold text-gray-900 dark:text-white">
                        Payzone
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        Local Payment
                      </div>
                    </div>
                  </div>
                </button> */}
              </div>
            </div>

            <div className="space-y-6">
              {/* Name Fields */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label
                    htmlFor="firstName"
                    className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300"
                  >
                    <svg
                      className="w-4 h-4 text-[#25aae1]"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                    Prénom
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={firstName}
                    onChange={onChange}
                    onFocus={onFocus}
                    onBlur={onBlur}
                    className="w-full px-4 py-3 bg-white/80 dark:bg-gray-700/80 border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:border-[#25aae1] focus:ring-2 focus:ring-[#25aae1]/20 transition-all duration-300 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                    placeholder="Enter your first name"
                  />
                  <small className="form-error text-red-500 text-sm">
                    {touched?.firstName && errors?.firstName}
                  </small>
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="lastName"
                    className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300"
                  >
                    Nom de famille
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={lastName}
                    onChange={onChange}
                    onFocus={onFocus}
                    onBlur={onBlur}
                    className="w-full px-4 py-3 bg-white/80 dark:bg-gray-700/80 border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:border-[#25aae1] focus:ring-2 focus:ring-[#25aae1]/20 transition-all duration-300 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                    placeholder="Enter your last name"
                  />
                  <small className="form-error text-red-500 text-sm">
                    {touched?.lastName && errors?.lastName}
                  </small>
                </div>
              </div>

              {/* Email Field */}
              <div className="space-y-2">
                <label
                  htmlFor="email"
                  className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300"
                >
                  <svg
                    className="w-4 h-4 text-[#25aae1]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                  Adresse e-mail
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={email}
                  onChange={onChange}
                  onFocus={onFocus}
                  onBlur={onBlur}
                  className="w-full px-4 py-3 bg-white/80 dark:bg-gray-700/80 border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:border-[#25aae1] focus:ring-2 focus:ring-[#25aae1]/20 transition-all duration-300 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                  placeholder="your.email@example.com"
                />
                <small className="form-error text-red-500 text-sm">
                  {touched?.email && errors?.email}
                </small>
              </div>

              {/* Phone Field */}
              <div className="space-y-2">
                <label
                  htmlFor="phoneNo"
                  className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300"
                >
                  <svg
                    className="w-4 h-4 text-[#25aae1]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                  Numéro de téléphone
                </label>
                <div className="relative">
                  <PhoneInput
                    defaultCountry={defaultCountryCode as CountryCode}
                    name="phoneNo"
                    autoComplete="off"
                    id="phoneNo"
                    value={phoneNo}
                    onFocus={onFocus}
                    onChange={handleChange}
                    onBlur={onBlur}
                    className="w-full px-4 py-3 bg-white/80 dark:bg-gray-700/80 border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:border-[#25aae1] focus:ring-2 focus:ring-[#25aae1]/20 transition-all duration-300 text-gray-900 dark:text-white"
                  />
                </div>
                <small className="form-error text-red-500 text-sm">
                  {touched?.phoneNo && errors?.phoneNo}
                </small>
              </div>

              {/* Terms Checkbox */}
              <div className="flex items-start space-x-3 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-100 dark:border-blue-800">
                <div className="flex items-center h-5 mt-1">
                  <input
                    id="terms"
                    name="terms"
                    type="checkbox"
                    checked={terms}
                    onFocus={onFocus}
                    onChange={onChange}
                    onBlur={onBlur}
                    className="w-5 h-5 text-[#25aae1] bg-white border-2 border-gray-300 rounded focus:ring-[#25aae1] focus:ring-2"
                  />
                </div>
                <div className="text-sm">
                  <label
                    htmlFor="terms"
                    className="font-medium text-gray-700 dark:text-gray-300"
                  >
                    J'accepte le/la/les{" "}
                    <Link
                      to="/terms"
                      className="text-[#25aae1] hover:text-[#1e8fc5] underline font-semibold"
                    >
                      termes et conditions
                    </Link>
                  </label>
                  <p className="form-error text-red-500 text-sm mt-1">
                    {touched?.terms && errors?.terms}
                  </p>
                </div>
              </div>

              {/* User Consent Checkbox */}
              <div className="flex items-start space-x-3 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl border border-gray-200 dark:border-gray-600">
                <div className="flex items-center h-5 mt-1">
                  <input
                    id="userConsent"
                    name="userConsent"
                    type="checkbox"
                    checked={userConsent}
                    onFocus={onFocus}
                    onChange={onChange}
                    onBlur={onBlur}
                    className="w-5 h-5 text-[#25aae1] bg-white border-2 border-gray-300 rounded focus:ring-[#25aae1] focus:ring-2"
                  />
                </div>
                <div className="text-sm">
                  <label
                    htmlFor="userConsent"
                    className="font-medium text-gray-700 dark:text-gray-300"
                  >
                    Créer un compte avec les informations ci-dessus.
                  </label>
                </div>
              </div>

              {/* Payment Buttons */}
              <div className="space-y-4">
                {/* Stripe Payment Button - Only show when Stripe is selected */}
                {/* {selectedPaymentMethod === "stripe" && ( */}
                  <button
                    type="button"
                    onClick={handleStripePayment}
                    disabled={disabled || isProcessing}
                    className={`w-full py-4 px-6 rounded-2xl font-bold text-lg transition-all duration-300 flex items-center justify-center gap-3 ${
                      disabled || isProcessing
                        ? "bg-gray-400 cursor-not-allowed text-gray-200"
                        : "bg-gradient-to-r from-[#635bff] to-[#8a85ff] hover:from-[#544fe5] hover:to-[#7a75e5] hover:shadow-2xl hover:scale-105 text-white shadow-lg"
                    }`}
                  >
                    {isProcessing ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Processing...
                      </>
                    ) : (
                      <>
                        <svg
                          className="w-6 h-6"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                        >
                          <path d="M13.976 9.15c-2.172-.806-3.356-1.426-3.356-2.409 0-.831.683-1.305 1.901-1.305 2.227 0 4.515.858 6.09 1.631l.89-5.494C18.252.622 15.697 0 12.165 0 9.667 0 7.75.654 6.417 1.918 5.2 3.094 4.446 4.733 4.446 6.787c0 4.016 2.73 5.435 6.899 6.546 2.172.806 3.356 1.426 3.356 2.409 0 .748-.558 1.305-1.762 1.305-2.484 0-5.25-.956-7.02-1.8L5 21.828c1.2.515 3.28.956 5.96.956 2.72 0 4.77-.645 6.16-1.8 1.35-1.14 2.022-2.78 2.022-4.765 0-4.237-2.73-5.435-6.899-6.546z" />
                        </svg>
                        Pay with Stripe -{" "}
                        <NumericFormat
                          value={Number(totalAmount).toFixed(2)}
                          displayType={"text"}
                          thousandSeparator={true}
                          prefix={`${currency}`}
                        />
                      </>
                    )}
                  </button>
                {/* )} */}

                {/* Payzone Payment Form - Only show when Payzone is selected */}
                {selectedPaymentMethod === "payzone" && (
                  <form action={PAYWALLURL} method="POST">
                    <input type="hidden" name="payload" value={json_payload} />
                    <input type="hidden" name="signature" value={signature} />
                    <button
                      type="submit"
                      disabled={disabled || isProcessing}
                      className={`w-full py-4 px-6 rounded-2xl font-bold text-lg transition-all duration-300 flex items-center justify-center gap-3 ${
                        disabled || isProcessing
                          ? "bg-gray-400 cursor-not-allowed text-gray-200"
                          : "bg-gradient-to-r from-[#25aae1] to-[#c10006] hover:from-[#1e8fc5] hover:to-[#a80005] hover:shadow-2xl hover:scale-105 text-white shadow-lg"
                      }`}
                    >
                      <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                        />
                      </svg>
                      Pay with Payzone -{" "}
                      <NumericFormat
                        value={Number(totalAmount).toFixed(2)}
                        displayType={"text"}
                        thousandSeparator={true}
                        prefix={`${currency}`}
                      />
                    </button>
                  </form>
                )}

                {/* Show message when no payment method is selected */}
                {!selectedPaymentMethod && (
                  <div className="text-center p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-xl border border-yellow-200 dark:border-yellow-800">
                    <p className="text-yellow-800 dark:text-yellow-200 font-medium">
                      Please select a payment method to continue
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Column - Order Summary */}
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border border-white/20">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 bg-gradient-to-r from-[#c10006] to-[#a80005] rounded-full flex items-center justify-center">
                <svg
                  className="w-5 h-5 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                  />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Résumé du billet
              </h2>
            </div>

            {/* Tickets List */}
            <div className="space-y-4 mb-6">
              {tickets.map((item, i) => (
                <div
                  key={i}
                  className="flex justify-between items-center p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl border border-gray-200 dark:border-gray-600"
                >
                  <div>
                    <div className="font-semibold text-gray-900 dark:text-white">
                      {item?.name}
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      {item?.qty} x{" "}
                      <NumericFormat
                        value={Number(item.price).toFixed(2)}
                        displayType={"text"}
                        thousandSeparator={true}
                        prefix={`${currency}`}
                      />
                    </div>
                  </div>
                  <div className="font-bold text-gray-900 dark:text-white">
                    <NumericFormat
                      value={Number(item.price * item.qty).toFixed(2)}
                      displayType={"text"}
                      thousandSeparator={true}
                      prefix={`${currency}`}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Price Breakdown */}
            <div className="space-y-3 border-t border-gray-200 dark:border-gray-600 pt-6">
              <div className="flex justify-between text-gray-600 dark:text-gray-400">
                <span>Total partiel</span>
                <span>
                  <NumericFormat
                    value={Number(subTotal).toFixed(2)}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={`${currency}`}
                  />
                </span>
              </div>

              <div className="flex justify-between text-gray-600 dark:text-gray-400">
                <span>Frais de réservation</span>
                <span>
                  <NumericFormat
                    value={Number(totalbookingFee).toFixed(2)}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={`${currency}`}
                  />
                </span>
              </div>

              <div className="flex justify-between text-gray-600 dark:text-gray-400">
                <span className="flex items-center gap-2">
                  TVA
                  <span className="px-2 py-1 bg-gray-200 dark:bg-gray-600 rounded-full text-xs">
                    {taxPercent}%
                  </span>
                </span>
                <span>
                  <NumericFormat
                    value={Number(vat).toFixed(2)}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={`${currency}`}
                  />
                </span>
              </div>

              {/* Total */}
              <div className="flex justify-between items-center pt-4 border-t border-gray-200 dark:border-gray-600">
                <span className="text-lg font-bold text-gray-900 dark:text-white">
                  Total
                </span>
                <span className="text-2xl font-black text-[#c10006]">
                  <NumericFormat
                    value={Number(totalAmount).toFixed(2)}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={`${currency}`}
                  />
                </span>
              </div>
            </div>

            {/* Payment Method Info */}
            <div className="mt-8 space-y-4">
              {selectedPaymentMethod === "stripe" && (
                <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-200 dark:border-blue-800">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                      <svg
                        className="w-4 h-4 text-white"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M13.976 9.15c-2.172-.806-3.356-1.426-3.356-2.409 0-.831.683-1.305 1.901-1.305 2.227 0 4.515.858 6.09 1.631l.89-5.494C18.252.622 15.697 0 12.165 0 9.667 0 7.75.654 6.417 1.918 5.2 3.094 4.446 4.733 4.446 6.787c0 4.016 2.73 5.435 6.899 6.546 2.172.806 3.356 1.426 3.356 2.409 0 .748-.558 1.305-1.762 1.305-2.484 0-5.25-.956-7.02-1.8L5 21.828c1.2.515 3.28.956 5.96.956 2.72 0 4.77-.645 6.16-1.8 1.35-1.14 2.022-2.78 2.022-4.765 0-4.237-2.73-5.435-6.899-6.546z" />
                      </svg>
                    </div>
                    <div>
                      <div className="font-semibold text-blue-800 dark:text-blue-300">
                        Stripe Secure Payment
                      </div>
                      <div className="text-sm text-blue-600 dark:text-blue-400">
                        Accepts all major credit and debit cards
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {selectedPaymentMethod === "payzone" && (
                <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-xl border border-green-200 dark:border-green-800">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                      <svg
                        className="w-4 h-4 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                        />
                      </svg>
                    </div>
                    <div>
                      <div className="font-semibold text-green-800 dark:text-green-300">
                        Payzone Secure Payment
                      </div>
                      <div className="text-sm text-green-600 dark:text-green-400">
                        Local payment gateway with enhanced security
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {!selectedPaymentMethod && (
                <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl border border-gray-200 dark:border-gray-600">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gray-500 rounded-full flex items-center justify-center">
                      <svg
                        className="w-4 h-4 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                        />
                      </svg>
                    </div>
                    {/* <div>
                      <div className="font-semibold text-gray-800 dark:text-gray-200">
                        Select Payment Method
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        Choose between Stripe or Payzone to proceed with payment
                      </div>
                    </div> */}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : null;
};

export default CheckoutForm;
