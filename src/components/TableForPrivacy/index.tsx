import React from "react";

const TableForPrivacy = () => {
  return (
    <div className=" mx-auto p-4 contain">
      <table className=" bg-white border border-gray-300 ">
        <thead>
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
              Type de cookie
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
              Purpose
            </th>
          </tr>
        </thead>
        <tbody>
          <tr className="bg-gray-100 border-b text-black">
            <td className="px-6 py-4 whitespace-wrap">
              Cookies strictement nécessaires{" "}
            </td>
            <td className="px-6 py-4 whitespace-wrap">
              Il s'agit de cookies nécessaires au fonctionnement de notre site
              web. Il s'agit, par exemple, de cookies qui vous permettent de
              vous connecter à des zones sécurisées de notre site web,
              d'utiliser un panier d'achat ou d'utiliser des services de
              facturation électronique.{" "}
            </td>
          </tr>
          <tr className="bg-white border-b flex-1 text-black">
            <td className="px-6 py-4 nowrap text-black">
              Cookies analytiques/de performance{" "}
            </td>
            <td className="px-6 py-4  whitespace-wrap">
              Cookies analytiques/de performance Ils nous permettent de
              reconnaître et de compter le nombre de visiteurs et de voir
              comment les visiteurs se déplacent sur notre site web lorsqu'ils
              l'utilisent. Cela nous aide à améliorer le fonctionnement de notre
              site web, par exemple en veillant à ce que les utilisateurs
              trouvent facilement ce qu'ils cherchent.
            </td>
          </tr>
          <tr className="bg-gray-100 border-b text-black">
            <td className="px-6 py-4 whitespace-wrap">
              Cookies de fonctionnalité
            </td>
            <td className="px-6 py-4 whitespace-wrap">
              Ceux-ci sont utilisés pour vous reconnaître lorsque vous revenez
              sur notre site Web. Cela nous permet de personnaliser notre
              contenu pour vous, de vous saluer par votre nom et de mémoriser
              vos préférences (par exemple, votre choix de langue ou de région).
              En utilisant le site Web, vous acceptez que nous placions des
              cookies de fonctionnalité.
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default TableForPrivacy;
