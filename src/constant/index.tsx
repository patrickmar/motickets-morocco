const imgurl = process.env.REACT_APP_BASEURL;

export const currencies = [
  // {
  //   name: "NGN",
  //   value: "₦",
  // },
  // {
  //   name: "USD",
  //   value: "$",
  // },
  // {
  //   name: "EUR",
  //   value: "€",
  // },
  {
    name: "NGN",
    value: "₦",
  },
];

export const countries = [
  // {
  //   name: "Morocco",
  //   url: "https://motickets.co.uk",
  //   code: "MA",
  // },
  // {
  //   name: "United States",
  //   url: "https://motickets.co",
  //   code: "US",
  // },
  {
    name: "Nigeria",
    url: "https://motickets.ng",
    code: "NG",
  },
  {
    name: "United Kingdom",
    url: "https://motickets.co.uk",
    code: "GB",
  },
  // {
  //   name: "Ghana",
  //   url: "https://motickets.co",
  //   code: "GH",
  // },
];

export const guests = [
  {
    name: "Trouver des événements",
    url: "events",
  },
  // {
  //   name: "Join a Community",
  //   url: "",
  // },
  // {
  //   name: "Info Hub",
  //   url: "",
  // },
];

export const hosts = [
  {
    name: "Organisateurs",
    url: "/organisers",
  },
  // {
  //   name: 'MoLoyal Agent App',
  //   url: 'https://play.google.com/store/apps/details?id=com.avantecs.moloyal',
  // },
  {
    name: "APK de l'agent MoTickets",
    url: "../MoTickets_Agent_App.apk",
  },
  {
    name: "Application Web de l'Agent",
    url: "https://motickets-agent-web.netlify.app",
  },

  {
    name: "Aide",
    url: "/faq",
  },
];

export const QuillFormats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
  "color",
];

export const company = [
  {
    name: "Philosophie d'entreprise",
    url: "corporate-philosophy",
  },
  {
    name: "Profil de l'entreprise",
    url: "corporate-profile",
  },
  // {
  //   name: "Our Partners",
  //   url: "",
  // },
  {
    name: "Termes et conditions",
    url: "/terms",
  },
  {
    name: "Contactez-nous",
    url: "/contact-us",
  },
];

export const offers = [
  {
    title: "test title",
    url: "/organisers#create",
    imgs: `${imgurl}/offer_images/1.png`,
  },
  {
    title: "test titl",
    url: "/organisers#flexible",
    imgs: `${imgurl}/offer_images/2.png`,
  },
  {
    title: "test title",
    url: "/organisers#reward",
    imgs: `${imgurl}/offer_images/3.png`,
  },
  {
    title: "test title",
    url: "/organisers#analytics",
    imgs: `${imgurl}/offer_images/4.png`,
  },
  {
    title: "test title",
    url: "/organisers#moticketsapp",
    imgs: `${imgurl}/offer_images/5.png`,
  },
];
