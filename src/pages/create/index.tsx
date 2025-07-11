import React, { useState, useRef, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "../../assets/css/quill.css";
import { QuillFormats } from "../../constant";
// import moment from "moment";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { useNavigate } from "react-router-dom";
import { customAlphabet } from "nanoid";
import FinancialCard from "../dashboard/FinancialCard";
import Editor from "react-simple-wysiwyg";

interface User {
  id: string;
}

interface TicketCategory {
  name: string;
  price: string;
  discountPrice: string;
  walletDiscount: string;
  qty: string;
  numOfPeople: string;
}

interface Category {
  name: string;
  price: string;
  discountPrice: string;
  walletDiscount: string;
  qty: string;
  numOfPeople: string;
}

type CurrencySymbolMap = {
  [key: string]: string;
  GBP: "£";
  USD: "$";
  NGN: "₦";
  EUR: "€";
  // Add more currencies if needed
};

const currencySymbolMap: CurrencySymbolMap = {
  GBP: "£",
  USD: "$",
  NGN: "₦",
  EUR: "€",
  // Add more currencies if needed
};

interface StartInfo {
  date: string;
  time: string;
}

interface EventData {
  eventTitle: string;
  venue: string;
  startTime: string;
  endTime: string;
  startDate: string;
  endDate: string;
  description: string;
  ticketCategories: Category[];
  chargesBearer: string;
  currency: string;
  eventType: string;
  banner: File[];
  start: StartInfo[];
  end: StartInfo[];
}

const BaseUrl = `${process.env.REACT_APP_BASEURL}/host_create/eventticket`;

const CreateEventForm: React.FC = () => {
  const formats = QuillFormats;
  const [step, setStep] = useState<number>(1);
  // const [selectedState, setSelectedState] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionError, setSubmissionError] = useState<string | null>(null);
  const [showInformation, setShowInformation] = useState(false);
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  // const [formData, setFormData] = useState<FormData>(new FormData());
  const navigate = useNavigate();

  const user = useSelector(
    (state: RootState) => state.auth.user
  ) as User | null;
  const hostid = user?.id || "";

  const [eventData, setEventData] = useState<EventData>({
    eventTitle: "",
    venue: "",
    startTime: "",
    endTime: "",
    startDate: "",
    endDate: "",
    description: "",
    ticketCategories: [
      {
        name: "Regular",
        price: "200",
        discountPrice: "0",
        walletDiscount: "0",
        qty: "10",
        numOfPeople: "1",
      },
    ],
    chargesBearer: "client",
    currency: "",
    eventType: "",
    banner: [],
    start: [
      {
        date: "",
        time: "",
      },
    ],
    end: [
      {
        date: "",
        time: "",
      },
    ],
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setEventData({ ...eventData, [name]: value });
  };

  const fileInputRef = useRef<HTMLInputElement>(null);

  // const handleImageClick = () => {
  //   if (fileInputRef.current) {
  //     fileInputRef.current.click();
  //   }
  // };

  const handleNextStep = () => {
    setStep(step + 1);
  };

  const handlePreviousStep = () => {
    setStep(step - 1);
  };

  const handleDescriptionChange = (e: { target: { value: string } }) => {
    setEventData((prev) => ({
      ...prev,
      description: e.target.value,
    }));
  };

  const handleAddCategory = () => {
    const newCategory: Category = {
      name: "",
      price: "",
      discountPrice: "0",
      walletDiscount: "0",
      qty: "",
      numOfPeople: "",
    };

    setEventData((prevData) => ({
      ...prevData,
      ticketCategories: [...prevData.ticketCategories, newCategory],
    }));
  };

  const handleCategoryChange = (
    index: number,
    key: keyof TicketCategory,
    value: string | number
  ) => {
    const newCategories = [...eventData.ticketCategories];
    newCategories[index] = { ...newCategories[index], [key]: value };
    setEventData({ ...eventData, ticketCategories: newCategories });
  };

  const handleCurrencyChange = (currency: string) => {
    setEventData({ ...eventData, currency });
  };

  const handleDeleteCategory = (index: number) => {
    const updatedCategories = [...eventData.ticketCategories];
    updatedCategories.splice(index, 1);
    setEventData({ ...eventData, ticketCategories: updatedCategories });
  };

  const ampmOptions = ["AM", "PM"];

  const [startAmPm, setStartAmPm] = useState<string>("AM");
  const [endAmPm, setEndAmPm] = useState<string>("AM");

  const handleStartAmPmChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setStartAmPm(e.target.value);
  };

  const handleEndAmPmChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setEndAmPm(e.target.value);
  };

  const handleStartDateChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const newStart = [...eventData.start];
    newStart[index].date = e.target.value;
    setEventData({ ...eventData, start: newStart });
  };

  const handleEndDateChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const newEnd = [...eventData.end];
    newEnd[index].date = e.target.value;
    setEventData({ ...eventData, end: newEnd });
  };

  const handleStartTimeChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const newStart = [...eventData.start];
    newStart[index].time = e.target.value;
    setEventData({ ...eventData, start: newStart });
  };

  const handleEndTimeChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const newEnd = [...eventData.end];
    newEnd[index].time = e.target.value;
    setEventData({ ...eventData, end: newEnd });
  };

  const isStepFieldsFilled = () => {
    switch (step) {
      case 1:
        return (
          eventData.eventTitle.trim() !== "" &&
          eventData.venue.trim() !== "" &&
          selectedImages.length > 0
        );
      case 2:
        return (
          eventData.start[0].date !== "" &&
          eventData.end[0].date !== "" &&
          eventData.start[0].time !== "" &&
          eventData.end[0].time !== ""
        );
      case 3:
        return (
          eventData.description.trim() !== "" && eventData.eventType !== ""
        );
      case 4:
        return (
          eventData.chargesBearer !== "" &&
          eventData.currency !== "" &&
          eventData.ticketCategories.every((category) =>
            Object.values(category).every((value) => value.trim() !== "")
          )
        );
      default:
        return false;
    }
  };

  const isLastStepFieldsFilled = () => {
    const {
      eventTitle,
      venue,
      description,
      chargesBearer,
      currency,
      eventType,
      start,
      end,
    } = eventData;
    return (
      !!eventTitle &&
      !!venue &&
      !!selectedImages.length &&
      start[0].time !== "" &&
      end[0].time !== "" &&
      !!description &&
      !!chargesBearer &&
      !!currency &&
      !!eventType
    );
  };

  const handleImageDelete = (index: number) => {
    const updatedImages = [...selectedImages];
    updatedImages.splice(index, 1);
    setSelectedImages(updatedImages);
  };

  const handleEventTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    setEventData({ ...eventData, eventType: value });
  };
  // Function to convert base64 string to Blob
  // Function to convert base64 string to Blob
  const base64ToBlob = (base64String: string): Blob => {
    const byteString = atob(base64String.split(",")[1]);
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const uint8Array = new Uint8Array(arrayBuffer);
    for (let i = 0; i < byteString.length; i++) {
      uint8Array[i] = byteString.charCodeAt(i);
    }
    return new Blob([arrayBuffer], { type: "image/png" }); // Adjust the type accordingly
  };

  const handleNewImageChange = (files: FileList | null) => {
    if (files) {
      const selectedImagesArray = Array.from(files);
      if (selectedImagesArray.length + selectedImages.length > 5) {
        toast.error(`Vous ne pouvez pas sélectionner plus de cinq images`);
        return;
      }
      setSelectedImages((prevImages) => [
        ...prevImages,
        ...selectedImagesArray,
      ]);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!hostid) {
      toast("Veuillez vous connecter");
      navigate("/login");
    }
    setIsSubmitting(true);

    try {
      const formData = new FormData();
      formData.append("hostid", hostid);

      Object.entries(eventData).forEach(([key, value]) => {
        if (key === "ticketCategories") {
          value.forEach((category: any, index: number) => {
            Object.entries(category).forEach(([subKey, subValue]) => {
              formData.append(
                `ticketCategories[${index}][${subKey}]`,
                String(subValue)
              );
            });
          });
        } else if (Array.isArray(value)) {
          value.forEach((item: any, index: number) => {
            Object.entries(item).forEach(([subKey, subValue]) => {
              formData.append(`${key}[${index}][${subKey}]`, String(subValue));
            });
          });
        } else {
          formData.append(key, String(value));
        }
      });

      const nanoid = customAlphabet("123456789", 11); // Define custom alphabet

      for (let i = 0; i < selectedImages.length; i++) {
        const base64 = await getBase64(selectedImages[i]);
        const blob = base64ToBlob(base64);
        const elevenDigitName = nanoid(); // Generate an eleven-digit name
        const fileExtension = selectedImages[i].name.split(".").pop(); // Get the file extension
        const banner = new File([blob], `${elevenDigitName}.${fileExtension}`, {
          type: selectedImages[i].type,
          lastModified: selectedImages[i].lastModified,
        });
        formData.append("banner[]", banner);
        console.log(`Renamed Image: ${banner.name}`);
      }

      // Create an object to log
      const logObject: { [key: string]: any } = {};
      formData.forEach((value, key) => {
        if (key === "banner[]") {
          if (!logObject[key]) {
            logObject[key] = [];
          }
          logObject[key].push(value);
        } else {
          logObject[key] = value;
        }
      });
      console.log(logObject);

      const response = await fetch(BaseUrl, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Échec de la création de l'événement");
      }

      const data = await response.json();
      if (data.error === false) {
        toast.success(data.message);
        navigate("/dashboard", {
          state: {
            selectedMenu: "Event",
            selectedEventOption: "MyEvent",
          },
        });
      } else {
        throw new Error(data.message || "Unknown error");
      }
    } catch (error: any) {
      setSubmissionError(
        error.message || "Erreur lors de la création de l'événement"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const getBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        if (reader.result && typeof reader.result === "string") {
          resolve(reader.result);
        } else {
          reject(new Error("Failed to read file as data URL."));
        }
      };
      reader.onerror = (error) => reject(error);
    });
  };

  // Function to format time to hh:mm:ss format
  const formatTime = (time: string): string => {
    const [hours, minutes] = time.split(":").map((part) => parseInt(part));
    const paddedHours = hours < 10 ? `0${hours}` : `${hours}`;
    const paddedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
    return `${paddedHours}:${paddedMinutes}:00`;
  };

  console.log(formatTime);

  const handleInformationClick = () => {
    setShowInformation((prevShowInformation) => !prevShowInformation);
  };

  useEffect(() => {
    if (!hostid) {
      toast.error("Please log in");
      navigate("/login");
    }
  }, [hostid, navigate]);

  return (
    <div className="flex items-center justify-center">
      <div className="bg-gray-100 p-8 rounded shadow-lg w-4/5 lg:w-3/5 mt-24">
        <h2 className="text-2xl font-semibold mb-4 text-gray-900">
          Créer un événement
        </h2>
        <form onSubmit={handleSubmit}>
          {step === 1 && (
            <>
              <div className="mb-4">
                <label htmlFor="title" className="block text-gray-600 mb-2">
                  Titre de l'événement
                </label>
                <input
                  type="text"
                  id="eventTitle"
                  name="eventTitle"
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                  value={eventData.eventTitle}
                  onChange={handleChange}
                  required
                  placeholder="Da Ministry reunion"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="venue" className="block text-gray-600 mb-2">
                  Lieu de l'événement
                </label>
                <input
                  type="text"
                  id="venue"
                  name="venue"
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                  value={eventData.venue}
                  onChange={handleChange}
                  required
                  placeholder="London, England"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="banner" className="block text-gray-600">
                  Images de l'événement (jusqu'à 5)
                </label>
                <div className="border border-dashed p-12 rounded-md">
                  <div className="flex items-center">
                    <label
                      htmlFor="banner"
                      className="cursor-pointer bg-[#25aae1] text-white px-4 py-2 rounded-md mr-2 focus:outline-none"
                    >
                      Ajouter une image de l'événement
                    </label>
                    <input
                      type="file"
                      id="banner"
                      name="banner"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => handleNewImageChange(e.target.files)}
                      ref={fileInputRef}
                      multiple
                      required
                    />
                    {/* Information icon */}
                    <div
                      className="cursor-pointer bg-gray-300 text-gray-600 rounded-full flex items-center justify-center w-6 h-6 text-sm lg:w-8 lg:h-8 lg:text-base"
                      onClick={handleInformationClick}
                      style={{ fontSize: "0.75rem" }}
                    >
                      i
                    </div>
                  </div>
                </div>
                <div className="mt-2 flex flex-wrap">
                  {selectedImages.map((banner, index) => (
                    <div key={index} className="mr-2 mb-2 relative">
                      {/* Image preview */}
                      <img
                        src={URL.createObjectURL(banner)}
                        alt={`Event  ${index + 1}`}
                        className="h-24 w-24 object-cover border rounded-md"
                      />
                      {/* Delete button */}
                      <button
                        type="button"
                        className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
                        onClick={() => handleImageDelete(index)}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          className="w-4 h-4"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Add information tooltip or modal */}
              {showInformation && (
                <div className="bg-white p-4 border rounded-md">
                  <p className=" italic text-blue-400">
                    Les graphiques de l'événement doivent de préférence inclure
                    les dimensions (220 par 330 px) et (500 par 550 px), mais
                    toute taille fournie peut être redimensionnée pour
                    s'adapter. Les formats pris en charge sont jpg, jpeg, png,
                    gif.
                  </p>
                </div>
              )}
            </>
          )}

          {step === 2 && (
            <>
              <div className="mb-4">
                <label htmlFor="startDate" className="block text-gray-600 mb-2">
                  Date de début
                </label>
                <input
                  type="date"
                  id="startDate"
                  name="startDate"
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                  value={eventData.start[0].date} // Assuming you want to bind to the first element of the start array
                  onChange={(e) => handleStartDateChange(e, 0)} // Pass index to handle function if needed
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="endDate" className="block text-gray-600 mb-2">
                  Date de fin
                </label>
                <input
                  type="date"
                  id="endDate"
                  name="endDate"
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                  value={eventData.end[0].date} // Assuming you want to bind to the first element of the end array
                  onChange={(e) => handleEndDateChange(e, 0)} // Pass index to handle function if needed
                  required
                />
              </div>

              <div className="mb-4">
                <label htmlFor="startTime" className="block text-gray-600 mb-2">
                  Heure de début
                </label>
                <div className="flex items-center">
                  <input
                    type="time"
                    id="startTime"
                    name="startTime"
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                    value={eventData.start[0].time}
                    onChange={(e) => handleStartTimeChange(e, 0)}
                    required
                  />
                  <select
                    value={startAmPm}
                    onChange={handleStartAmPmChange}
                    className="ml-2 px-2 py-1 border rounded-md focus:outline-none focus:border-blue-500"
                  >
                    {ampmOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="mb-4">
                <label htmlFor="endTime" className="block text-gray-600 mb-2">
                  Heure de fin
                </label>
                <div className="flex items-center">
                  <input
                    type="time"
                    id="endTime"
                    name="endTime"
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                    value={eventData.end[0].time}
                    onChange={(e) => handleEndTimeChange(e, 0)}
                    required
                  />
                  <select
                    value={endAmPm}
                    onChange={handleEndAmPmChange}
                    className="ml-2 px-2 py-1 border rounded-md focus:outline-none focus:border-blue-500"
                  >
                    {ampmOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </>
          )}
          {step === 3 && (
            <>
              <div className="mb-4" data-name="description">
                <label
                  htmlFor="description"
                  className="block mb-2 text-sm font-medium text-black "
                >
                  Description
                </label>
                <Editor
                  value={eventData.description || ""}
                  onChange={handleDescriptionChange}
                  containerProps={{
                    className:
                      "add-new-post__editor mb-1 text-gray-900 bg-gray-50",
                    style: {
                      height: "400px", // Set your desired height
                      width: "800px", // Set your desired width
                    },
                  }}
                />
                <p className="text-xs text-gray-400">
                  Donnez une description complète. Pas plus de 3000 mots.
                </p>
              </div>
              <div className="mb-4">
                <select
                  id="eventType"
                  name="eventType"
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                  value={eventData.eventType}
                  onChange={handleEventTypeChange}
                >
                  <option value="">Sélectionner le type d'événement</option>
                  <option value="Festival">Festival</option>
                  <option value="Conference">Conférence</option>
                  <option value="Seminar">Séminaire</option>
                  <option value="Executive Meeting">Réunion exécutive</option>
                  <option value="Webinar">Webinaire</option>
                  <option value="Comedy and Standup">
                    Comédie et Stand-up
                  </option>
                  <option value="Musical Show">Spectacle musical</option>
                  <option value="Trade Fair">Foire commerciale</option>
                  <option value="Charity Events/Fundraisers">
                    Événements caritatifs/Collectes de fonds
                  </option>
                  <option value="Club Nights and Bars">
                    Soirées en club et bars
                  </option>
                  <option value="Concerts">Concerts</option>
                  <option value="Cultural Events">Événements culturels</option>
                  <option value="Trade Show">Salon professionnel</option>
                  <option value="Film Screenings">Projections de films</option>
                  <option value="Galas/Dinners">Galas/Dîners</option>
                  <option value="Gigs">Concerts</option>
                  <option value="Sports Events">Événements sportifs</option>
                  <option value="Theatre/Performing Arts">
                    Théâtre/Arts de la scène
                  </option>
                  <option value="Workshops">Ateliers</option>
                  <option value="Others">Autres</option>
                </select>
              </div>
            </>
          )}

          {step === 4 && (
            <>
              <div className="flex space-x-4 mb-4">
                <div className="flex-1" style={{ display: "none" }}>
                  <label
                    htmlFor="bearer"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Responsable des frais
                  </label>
                  <select
                    id="bearer"
                    name="bearer"
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                    value={eventData.chargesBearer}
                    onChange={(e) =>
                      setEventData({
                        ...eventData,
                        chargesBearer: e.target.value,
                      })
                    }
                  >
                    <option value="">Sélectionner le porteur</option>
                    <option value="client">Client</option>
                    <option value="moloyal">MoTickets</option>
                  </select>
                </div>

                <div className="flex-1">
                  <label
                    htmlFor="currency"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Monnaie
                  </label>
                  <select
                    id="currency"
                    name="currency"
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                    value={eventData.currency}
                    onChange={(e) => handleCurrencyChange(e.target.value)}
                  >
                    <option value="">Sélectionner la devise</option>
                    <option value="GBP">GBP</option>
                    <option value="USD">USD</option>
                    <option value="NGN">NGN</option>
                    <option value="EUR">EUR</option>
                    <option value="MAD">MAD</option>
                  </select>
                </div>
              </div>

              <h3 className="text-xl font-semibold mb-4 text-black">
                Catégories de billets
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full mb-4">
                  <thead className="bg-[#25aae1]">
                    <tr>
                      <th className="px-4 py-2">Nom</th>
                      <th className="px-4 py-2">
                        Prix ({currencySymbolMap[eventData.currency]})
                      </th>
                      {/* <th className="px-4 py-2">
                        Prix réduit(
                        {currencySymbolMap[eventData.currency]})
                      </th> */}

                      {/* <th className="px-4 py-2">Réduction portefeuille</th> */}
                      <th className="px-4 py-2">Qty</th>
                      <th className="px-4 py-2">Nombre de personnes</th>
                      <th className="px-4 py-2">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {eventData.ticketCategories.map((category, index) => (
                      <tr key={index}>
                        <td className="border px-4 py-2">
                          <input
                            type="text"
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                            value={category.name}
                            onChange={(e) =>
                              handleCategoryChange(
                                index,
                                "name",
                                e.target.value
                              )
                            }
                          />
                        </td>
                        <td className="border px-4 py-2">
                          <input
                            type="text"
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                            value={category.price}
                            onChange={(e) =>
                              handleCategoryChange(
                                index,
                                "price",
                                e.target.value
                              )
                            }
                          />
                        </td>
                        <td
                          className="border px-4 py-2"
                          style={{ display: "none" }}
                        >
                          <input
                            type="text"
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                            value={category.discountPrice}
                            onChange={(e) =>
                              handleCategoryChange(
                                index,
                                "discountPrice",
                                e.target.value
                              )
                            }
                          />
                        </td>
                        <td
                          className="border px-4 py-2"
                          style={{ display: "none" }}
                        >
                          <input
                            type="text"
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                            value={category.walletDiscount}
                            onChange={(e) =>
                              handleCategoryChange(
                                index,
                                "walletDiscount",
                                e.target.value
                              )
                            }
                          />
                        </td>
                        <td className="border px-4 py-2">
                          <input
                            type="text"
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                            value={category.qty}
                            onChange={(e) =>
                              handleCategoryChange(index, "qty", e.target.value)
                            }
                          />
                        </td>
                        <td className="border px-4 py-2">
                          <input
                            type="text"
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                            value={category.numOfPeople}
                            onChange={(e) =>
                              handleCategoryChange(
                                index,
                                "numOfPeople",
                                e.target.value
                              )
                            }
                          />
                        </td>
                        <td className="border px-4 py-2">
                          <button
                            type="button"
                            className="text-red-500"
                            onClick={() => handleDeleteCategory(index)}
                          >
                            Supprimer
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <button
                type="button"
                className="text-white bg-[#25aae1] px-4 py-2 rounded-md"
                onClick={handleAddCategory}
              >
                Ajouter une catégorie{" "}
              </button>
            </>
          )}

          <div className="mt-6 flex justify-between">
            {step !== 1 && (
              <button
                type="button"
                className="text-white bg-[#c10006] px-6 py-2 rounded-md"
                onClick={handlePreviousStep}
              >
                Précédent
              </button>
            )}
            {step !== 4 ? (
              <button
                type="button"
                className="text-white bg-[#25aae1] px-6 py-2 rounded-md disabled:opacity-70 disabled:cursor-not-allowed"
                onClick={handleNextStep}
                disabled={!isStepFieldsFilled()}
              >
                Suivant
              </button>
            ) : (
              <button
                type="submit"
                className="text-white bg-[#25aae1] px-6 py-2 rounded-md disabled:opacity-70 disabled:cursor-not-allowed"
                disabled={!isLastStepFieldsFilled() || isSubmitting}
              >
                {isSubmitting ? "Soumission en cours..." : "Soumettre"}
              </button>
            )}
          </div>
        </form>
        {submissionError && (
          <div className="text-red-500 mt-4">{submissionError}</div>
        )}
      </div>
    </div>
  );
};

export default CreateEventForm;
