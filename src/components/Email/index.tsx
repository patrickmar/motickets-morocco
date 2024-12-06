import React from "react";
import motickets from "../../assets/logo/motickets_logo_-.png";

const EmailTemplate = () => {
  return (
    <section className="flex flex-col max-w-2xl px-6 py-24 mx-auto bg-gray-50 dark:bg-gray-900">
      <header>
        <a href="#">
          <img
            className="w-auto h-7 sm:h-8"
            src={motickets}
            alt="Motickets Logo"
          />
        </a>
      </header>

      <main className="mt-12">
        <h2 className="text-gray-700 dark:text-gray-200">Hi Olivia,</h2>

        <p className="mt-2 leading-loose text-gray-600 dark:text-gray-300">
          Thank you for completing your registration into{" "}
          <span className="font-semibold">Motickets</span>.
        </p>

        <button className="px-6 py-2 mt-4 text-sm font-medium tracking-wider text-white capitalize transition-colors duration-300 transform bg-[#25aae1] rounded-lg hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80">
          Continue to Explore
        </button>

        <p className="mt-8 text-gray-600 dark:text-gray-300">
          Thanks, <br />
          Motickets
        </p>
      </main>

      <footer className="flex flex-col mt-8">
        <p className="text-gray-500 dark:text-gray-400">
          This email was sent to{" "}
          <a
            href="#"
            className="text-[#25aae1] hover:underline "
            target="_blank"
            rel="noopener noreferrer"
          >
            help@motickets.co.uk
          </a>
          . If you'd rather not receive this kind of email, you can{" "}
          <a
            href="#"
            className="text-[#25aae1] hover:underline dark:text-blue-400"
          >
            unsubscribe
          </a>{" "}
          or{" "}
          <a
            href="#"
            className="text-[#25aae1] hover:underline dark:text-blue-400"
          >
            manage your email preferences
          </a>
          .
        </p>

        <p className="mt-3 text-gray-500 dark:text-gray-400">
          © {new Date().getFullYear()} Motickets. All Rights Reserved.
        </p>
      </footer>
    </section>
  );
};

export default EmailTemplate;
