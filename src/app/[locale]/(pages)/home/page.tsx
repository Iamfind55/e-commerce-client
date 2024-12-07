"use client";

import React from "react";
import Image from "next/image";
import ProductCard from "@/components/ProductCard";
import { Link } from "@/navigation";
import { NextIcon } from "@/icons/page";
import GlobalSlider from "./slider";

// images
import category01 from "/public/images/category01.webp";
import category02 from "/public/images/category02.webp";
import category03 from "/public/images/category03.webp";
import category04 from "/public/images/category04.webp";
import category05 from "/public/images/category05.webp";
import category06 from "/public/images/category06.webp";
import category07 from "/public/images/category07.webp";
import category08 from "/public/images/category08.webp";
import bannerImage01 from "/public/images/banner01.webp";
import bannerImage02 from "/public/images/banner02.webp";
import bannerImage03 from "/public/images/banner03.webp";
import bannerImage04 from "/public/images/banner04.webp";
import bannerImage05 from "/public/images/banner05.webp";
import bannerImage06 from "/public/images/banner06.webp";
import sliderImage01 from "/public/images/slider01.jpg";
import sliderImage02 from "/public/images/slider02.jpg";
import sliderImage03 from "/public/images/slider03.jpg";

export default function Home() {
  const categoryImages = [
    { src: category01, alt: "Category 1", width: 200, height: 600 },
    { src: category02, alt: "Category 2", width: 200, height: 600 },
    { src: category03, alt: "Category 3", width: 200, height: 500 },
    { src: category04, alt: "Category 4", width: 200, height: 500 },
    { src: category05, alt: "Category 5", width: 200, height: 500 },
    { src: category06, alt: "Category 6", width: 200, height: 600 },
    { src: category07, alt: "Category 7", width: 200, height: 500 },
    { src: category08, alt: "Category 8", width: 200, height: 500 },
  ];

  const bannerImages01 = [
    { src: bannerImage01, alt: "Slider Image 1", width: 200, height: 500 },
    { src: bannerImage02, alt: "Slider Image 2", width: 200, height: 600 },
  ];

  const bannerImages02 = [
    { src: bannerImage03, alt: "Slider Image 1", width: 200, height: 500 },
    { src: bannerImage04, alt: "Slider Image 2", width: 200, height: 600 },
  ];

  const bannerImages03 = [
    { src: bannerImage05, alt: "Slider Image 1", width: 200, height: 500 },
    { src: bannerImage06, alt: "Slider Image 2", width: 200, height: 600 },
  ];

  const products = [
    {
      id: "123",
      price: "250",
      name: "Product1",
      description: "This is the first product in our system now.",
    },
    {
      id: "124",
      price: "300",
      name: "Product2",
      description: "This is the second product, a little better.",
    },
    {
      id: "125",
      price: "150",
      name: "Product3",
      description: "The third product, perfect for casual use.",
    },
    {
      id: "126",
      price: "200",
      name: "Product4",
      description: "Our fourth product, optimized for comfort.",
    },
    {
      id: "127",
      price: "350",
      name: "Product5",
      description: "The fifth product, top-of-the-line quality.",
    },
    {
      id: "128",
      price: "400",
      name: "Product6",
      description: "The sixth product, with premium features.",
    },
  ];

  const products02 = [
    {
      id: "1231",
      price: "250",
      name: "Product1",
      description: "This is the first product in our system now.",
    },
    {
      id: "1241",
      price: "300",
      name: "Product2",
      description: "This is the second product, a little better.",
    },
    {
      id: "1251",
      price: "150",
      name: "Product3",
      description: "The third product, perfect for casual use.",
    },
    {
      id: "1261",
      price: "200",
      name: "Product4",
      description: "Our fourth product, optimized for comfort.",
    },
    {
      id: "1271",
      price: "350",
      name: "Product5",
      description: "The fifth product, top-of-the-line quality.",
    },
    {
      id: "1281",
      price: "400",
      name: "Product6",
      description: "The sixth product, with premium features.",
    },
    {
      id: "12312",
      price: "250",
      name: "Product7",
      description: "This is the first product in our system now.",
    },
    {
      id: "12412",
      price: "300",
      name: "Product8",
      description: "This is the second product, a little better.",
    },
    {
      id: "12512",
      price: "150",
      name: "Product9",
      description: "The third product, perfect for casual use.",
    },
    {
      id: "12612",
      price: "200",
      name: "Product10",
      description: "Our fourth product, optimized for comfort.",
    },
    {
      id: "12712",
      price: "350",
      name: "Product11",
      description: "The fifth product, top-of-the-line quality.",
    },
    {
      id: "12812",
      price: "400",
      name: "Product12",
      description: "The sixth product, with premium features.",
    },
  ];

  const sliderImages = [
    { src: sliderImage01, alt: "Slider Image 1" },
    { src: sliderImage02, alt: "Slider Image 2" },
    { src: sliderImage03, alt: "Slider Image 3" },
  ];

  return (
    <div className="my-4 sm:my-6">
      <div className="flex items-center justify-center flex-col gap-6">
        <div className="container flex flex-col gap-6 px-2 sm:px-0">
          <div className="h-auto w-full">
            <GlobalSlider images={sliderImages} height={96} slidePerview={1} />
          </div>
          <div className="flex flex-col items-start justify-start gap-2">
            <p className="text-second_black text-sm sm:text-md">Categories:</p>
            <div className="w-full h-auto grid grid-cols-2 gap-2 sm:gap-4 lg:grid-cols-4">
              {categoryImages.map((image, index) => (
                <Link href="/category" key={index + 1}>
                  <Image
                    className="w-full h-full rounded cursor-pointer transition-transform duration-300 ease-in-out hover:scale-105 hover:rounded-md"
                    src={image.src}
                    alt={image.alt}
                    width={image.width}
                    height={image.height}
                  />
                </Link>
              ))}
            </div>
          </div>
          <div className="flex flex-col items-start justify-start gap-2">
            <p className="text-second_black text-sm sm:text-md">
              Best seller products:
            </p>
            <div className="w-full h-auto grid grid-cols-2 gap-2 sm:gap-4 lg:grid-cols-6">
              {products.map((product) => (
                <ProductCard
                  key={product.id}
                  id={product.id}
                  price={product.price}
                  name={product.name}
                  description={product.description}
                />
              ))}
            </div>
          </div>
          <div className="hidden sm:flex w-full h-auto grid grid-cols-2 gap-4 lg:grid-cols-2">
            {bannerImages01.map((image, index) => (
              <Image
                key={index + 1}
                className="w-full h-full rounded-md cursor-pointer"
                src={image.src}
                alt={image.alt}
                width={image.width}
                height={image.height}
              />
            ))}
          </div>
          <div className="block sm:hidden h-auto w-full">
            <GlobalSlider
              images={bannerImages01}
              height={96}
              slidePerview={1}
            />
          </div>
          <div className="flex flex-col items-start justify-start gap-2">
            <p className="text-second_black text-sm sm:text-md">
              Popular products:
            </p>
            <div className="w-full h-auto grid grid-cols-2 gap-2 sm:gap-4 lg:grid-cols-6">
              {products.map((product) => (
                <ProductCard
                  key={product.id}
                  id={product.id}
                  price={product.price}
                  name={product.name}
                  description={product.description}
                />
              ))}
            </div>
          </div>
          <div className="hidden sm:flex w-full h-auto grid grid-cols-2 gap-4 lg:grid-cols-2">
            {bannerImages02.map((image, index) => (
              <Image
                key={index + 1}
                className="w-full h-full rounded-md cursor-pointer"
                src={image.src}
                alt={image.alt}
                width={image.width}
                height={image.height}
              />
            ))}
          </div>
          <div className="block sm:hidden h-auto w-full">
            <GlobalSlider
              images={bannerImages02}
              height={96}
              slidePerview={1}
            />
          </div>
          <div className="flex flex-col items-start justify-start gap-2">
            <div className="flex items-center justify-between w-full">
              <p className="text-second_black text-sm sm:text-md">
                All recommended products:
              </p>
              <Link
                href="#"
                className="text-neon_pink p-2 rounded text-sm flex items-center justify-center gap-2 hover:text-neon_blue"
              >
                View more
                <NextIcon size={18} />
              </Link>
            </div>
            <div className="w-full h-auto grid grid-cols-2 gap-2 sm:gap-4 lg:grid-cols-6">
              {products02.map((product) => (
                <ProductCard
                  key={product.id}
                  id={product.id}
                  price={product.price}
                  name={product.name}
                  description={product.description}
                />
              ))}
            </div>
          </div>
          <div className="hidden sm:flex w-full h-auto grid grid-cols-2 gap-4 lg:grid-cols-2">
            {bannerImages03.map((image, index) => (
              <Image
                key={index + 1}
                className="w-full h-full rounded-md cursor-pointer"
                src={image.src}
                alt={image.alt}
                width={image.width}
                height={image.height}
              />
            ))}
          </div>
          <div className="block sm:hidden h-auto w-full">
            <GlobalSlider
              images={bannerImages03}
              height={96}
              slidePerview={1}
            />
          </div>
          <div className="hidden sm:block text-second_black flex items-start justify-start flex-col gap-6">
            <h3 className="text-second_black text-md sm:text-lg uppercase">
              about us:
            </h3>
            <div className="flex items-start justify-start flex-col gap-4">
              <p className="text-second_black text-md mt-4">
                The benefits of plateform use:
              </p>
              <ul className="text-sm pl-2 sm:pl-4 flex items-start justify-start gap-2 flex-col font-extralight">
                <li>
                  1. do not need to worry about the source of goods, the
                  platform adopts ERP management system, take a lot of
                  e-commerce platform quality sources, we only need to shelve
                  the products that we think are easy to sell
                </li>
                <li>
                  2. Do not need to spend money on stockpiling, no economic
                  pressure, there are customers in your store to buy goods, you
                  only need to submit an order, do not need to worry about the
                  accumulation of goods, not sold, etc.
                </li>
                <li>
                  3. Simple operation, convenient, goods throughout the delivery
                  tracking by the platform, if there is a loss of goods and
                  other situations, the platform will be unified processing
                </li>
                <li>
                  4. Do not need to waste time and energy in the management of
                  the store, a cell phone is easy to handle, easy to withdraw
                  money at any time.
                </li>
                <li>
                  5. Do not need any rent and deposit, the platform promises no
                  deposit in the future, so that users can use the platform more
                  easily.
                </li>
                <li>
                  6. One-on-one customer service, if you have any problems with
                  your goods, please contact the artificial customer service in
                  a timely manner.
                </li>
                <li>
                  7. Timely replenishment of supplies, daily we will have
                  specialized technical staff, if there is a shortage of goods,
                  we will promptly replenish the situation, so that users do not
                  need to worry about the lack of commodities to choose goods,
                  etc.
                </li>
                <li>
                  8. Diversity of goods, because we have many manufacturers, so
                  we have a better classification of goods (in the home page),
                  so that users can accurately find the goods they want!
                </li>
                <li>
                  9. The platform has specialized quality inspectors for the
                  quality of goods, so you don't need to worry about the quality
                  of goods and other issues.
                </li>
                <li>
                  10. The variety of goods, the platform will have specialized
                  staff, from time to time to add new products, to follow the
                  progress of social trends
                </li>
                <li>
                  11. The cost of startup and maintenance are much lower than
                  traditional trading business.
                </li>
                <li>
                  12. Develop batches, coupons and discount marketing strategies
                  more easily
                </li>
                <li>
                  13. Better product pricing and feature comparisons are more
                  likely to be offered.
                </li>
              </ul>
            </div>

            <div className="flex items-start justify-start flex-col gap-2">
              <p className="text-second_black text-md mt-4">
                Prohibited and Restricted Goods Policy:
              </p>
              <ul className="text-sm pl-2 sm:pl-4 flex items-start justify-start gap-2 flex-col font-extralight">
                <li>
                  It is the Seller's responsibility to ensure that their
                  merchandise complies with all legal requirements prior to
                  being posted on the Platform and is licensed for posting and
                  available for sale in accordance with the DHL Policy. For the
                  convenience of Sellers, DHL has provided below a
                  non-exhaustive list of prohibited and restricted items that
                  are not permitted to be sold on the Platform, and DHL will
                  update this policy from time to time as necessary. Sellers are
                  encouraged to visit this page periodically for updates.
                </li>
              </ul>
            </div>

            <div className="flex items-start justify-start flex-col gap-2">
              <p className="text-second_black text-md mt-4">
                Consequences of Violations:
              </p>
              <p className="text-sm pl-2 font-extralight">
                Sellers who violate this Prohibited and Restricted Categories
                Policy may be subject to a number of adverse actions against
                them, including, but not limited to, any or all of the
                following:
              </p>
              <ul className="text-sm pl-2 sm:pl-4 flex items-start justify-start gap-2 flex-col font-extralight">
                <li>
                  i). Removal/downgrading of posted items or information and/or
                  restriction of items from the shelves
                </li>
                <li>
                  ii). Withholding of Prohibited Items contained in an order or
                  items not permitted to be sold on the Platform
                </li>
                <li>iii). Restrict account privileges</li>
                <li>iv). Suspension and termination of accounts</li>
                <li>
                  v). Freezing of account funds or, if necessary, direct setoff
                  of account funds to cover Shopee's losses
                </li>
                <li>vi). Legal action</li>
              </ul>
            </div>

            <div className="flex items-start justify-start flex-col gap-2">
              <p className="text-second_black text-md mt-4">
                Imitation Guns, Military and Police Supplies, Dangerous Weapons
                Category:
              </p>
              <ul className="text-sm pl-2 sm:pl-4 flex items-start justify-start gap-2 flex-col font-extralight">
                <li>1. firearms, ammunition, arms and imitations</li>
                <li>
                  2. control instruments that can cause others to temporarily
                  lose the ability to resist and cause significant bodily harm
                  to others
                </li>
                <li>
                  3. equipment, accessories, ancillary products related to
                  firearms, ammunition and arms, as well as crafts derived from
                  imitations
                </li>
                <li>
                  4. control instruments that may be used to endanger the
                  personal safety of others, such as control-type knives,
                  accessories of bows and crossbows, and throwing sticks, darts,
                  axes, blowguns, knives with bloodletting grooves, as well as
                  electric shocks used for personal defense
                </li>
                <li>
                  5. self-defense devices, equipment and facilities such as
                  aerosol sprayers and liquid sprays that may cause injury to
                  the human body
                </li>
                <li>
                  6. police and military uniforms, symbols, equipment and
                  products
                </li>
                <li>
                  7. goods or information related to religion, racial
                  discrimination or anti-religious beliefs
                </li>
              </ul>
            </div>

            <div className="flex items-start justify-start flex-col gap-2">
              <p className="text-second_black text-md mt-4">
                Flammable and explosive, toxic chemicals and drugs:
              </p>
              <ul className="text-sm pl-2 sm:pl-4 flex items-start justify-start gap-2 flex-col font-extralight">
                <li>1. flammable and explosive goods</li>
                <li>2. corrosive goods</li>
                <li>3. radioactive substances</li>
                <li>4. highly toxic chemicals</li>
                <li>
                  5. Drugs, drug-making materials, drug-making chemicals and
                  addictive drugs
                </li>
                <li>6. fireworks and firecrackers</li>
                <li>
                  7. Hazardous chemicals whose sale is prohibited by national or
                  regional lists
                </li>
                <li>8. drug paraphernalia and accessories</li>
                <li>
                  9. relevant tutorials and books introducing methods of making
                  inflammable and explosive materials
                </li>
              </ul>
            </div>

            <div className="flex items-start justify-start flex-col gap-2">
              <p className="text-second_black text-md mt-4">
                The category of destructive information that endangers national
                security, political and social stability:
              </p>
              <ul className="text-sm pl-2 sm:pl-4 flex items-start justify-start gap-2 flex-col font-extralight">
                <li>
                  1. information containing reactionary, undermining national
                  unity, undermining sovereignty and territorial integrity,
                  undermining social stability, involving state secrets,
                  disrupting social order, promoting terrorism, extremism,
                  inciting ethnic hatred, undermining national unity,
                  propagating cults and superstitions, promoting religion,
                  racial discrimination, etc., or laws and regulations prohibit
                  the publication and dissemination of books, audio-visual
                  products, videos, documents, and materials, and the state
                  expressly eliminates or stops the sale of books and
                  commodities. books, audio-visual products, videos, documents,
                  and commodities that the state has explicitly eliminated or
                  stopped selling, etc
                </li>
                <li>
                  2. Commodities or information that damage the honor and
                  reputation of the country, distort, scandalize, blaspheme,
                  deny the deeds and spirit of heroes and martyrs, glorify the
                  historical facts of aggression by other countries or promote
                  militaristic ideology, or make personal attacks on political
                  figures
                </li>
                <li>
                  3. books and magazines related to politics and collectible
                  classified books, audio-visual products, videos and documents
                  that are not suitable for domestic distribution
                </li>
                <li>
                  4. philatelic stamps prohibited by the State and philatelic
                  products produced without the approval of the postal
                  administration, as well as postal products issued after 1949
                  that contain the words "Republic of China"
                </li>
                <li>
                  5. Information on political activities such as campaigns,
                  elections, and public debates on political issues
                </li>
              </ul>
            </div>

            <div className="flex items-start justify-start flex-col gap-2">
              <p className="text-second_black text-md mt-4">
                Pornographic vulgarity and aphrodisiacs:
              </p>
              <ul className="text-sm pl-2 sm:pl-4 flex items-start justify-start gap-2 flex-col font-extralight">
                <li>
                  1. pornographic and obscene commodities, pornographic
                  advertisements and sexual services
                </li>
                <li>
                  2. Audio-visual products and videos containing pornographic
                  and obscene content; pornographic escort and solicitation
                  services; accounts and invitation codes of adult website
                  forums
                </li>
                <li>
                  3. Oral or topical aphrodisiac commodities that can cause
                  others to temporarily lose their ability to resist and blur
                  their consciousness; artificial hymens; erotic products such
                  as "triazolam", "fly powder", "fly water" and so on. etc
                </li>
                <li>
                  4. Software and pictures used to disseminate pornographic
                  information; audio-visual products containing erotic, violent
                  and vulgar content; original underwear and related products
                </li>
                <li>
                  5. Animation, reading materials, games and pictures containing
                  erotic, violent and vulgar contents
                </li>
                <li>6. Internet vulgar products</li>
              </ul>
            </div>

            <div className="flex items-start justify-start flex-col gap-2">
              <p className="text-second_black text-md mt-4">
                Products or services involving personal safety and privacy:
              </p>
              <ul className="text-sm pl-2 sm:pl-4 flex items-start justify-start gap-2 flex-col font-extralight">
                <li>
                  1. Software and equipment used for eavesdropping, stealing
                  privacy or secrets
                </li>
                <li>
                  2. Devices used for illegal camera, recording, forensic and
                  other purposes
                </li>
                <li>
                  3. identity cards and identity card verification and reading
                  devices
                </li>
                <li>
                  4. software, tools, tutorials and products for stealing or
                  cracking account passwords
                </li>
                <li>
                  5. personal privacy information and internal enterprise data;
                  personal cell phone positioning, telephone list inquiry, bank
                  account inquiry and other services
                </li>
                <li>
                  6. selling, transferring, recycling bank cards that have been
                  invalidated or used for collection purposes
                </li>
                <li>
                  7. automobile seat belt buckles and other automobile
                  accessories with traffic safety hazards class of goods
                </li>
              </ul>
            </div>

            <div className="flex items-start justify-start flex-col gap-2">
              <p className="text-second_black text-md mt-4">
                Drugs, medical equipment category:
              </p>
              <ul className="text-sm pl-2 sm:pl-4 flex items-start justify-start gap-2 flex-col font-extralight">
                <li>
                  1. psychotropic, narcotic, toxic, radioactive, stimulant,
                  birth control drugs; non-drugs added medicinal ingredients;
                  Drug Administration and Drug Administration identified and
                  banned by the national publicity of the production, use of
                  drugs (except for the second item of this item)
                </li>
                <li>
                  2. Drugs, blood products or medical devices used for the
                  prevention and treatment of human diseases; drugs that have
                  not been approved by the Drug Administration for production,
                  import, or sale without inspection
                </li>
                <li>
                  3. Injectable whitening injections, lipolysis injections,
                  filler injections, slimming injections and other cosmetic
                  injections for human injection of goods
                </li>
              </ul>
            </div>

            <div className="flex items-start justify-start flex-col gap-2">
              <p className="text-second_black text-md mt-4">
                Illegal services and tickets:
              </p>
              <ul className="text-sm pl-2 sm:pl-4 flex items-start justify-start gap-2 flex-col font-extralight">
                <li>
                  1. Forgery and alteration of documents, certificates, official
                  seals, security labels, etc. issued by state organs or
                  specific institutions, as well as services that can only be
                  provided by state organs or specific institutions
                </li>
                <li>
                  2. bills (and services) that can still be used or used for
                  reimbursement, foreign trade documents that can still be used
                  as well as services that act as an agent for customs
                  clearance, manifests, commodity inspection, and documentation
                  procedures
                </li>
                <li>
                  3. answers to official state-level examinations that have not
                  yet been publicly released
                </li>
                <li>
                  4. Fortune-telling, fortune-telling, feng shui, puja and other
                  feudal superstition-type services
                </li>
                <li>5. automobile-type violations on behalf of the service</li>
              </ul>
            </div>

            <div className="flex items-start justify-start flex-col gap-2">
              <p className="text-second_black text-md mt-4">
                Merchandise that violates State administrative regulations or is
                unsuitable for trading without permission:
              </p>
              <ul className="text-sm pl-2 sm:pl-4 flex items-start justify-start gap-2 flex-col font-extralight">
                <li>
                  1. Counterfeit and altered currency, as well as printing
                  equipment
                </li>
                <li>
                  2. Renminbi and currencies in circulation in various
                  countries, as well as imitations of Renminbi and currencies in
                  circulation in various countries
                </li>
                <li>
                  3. cultural relics suspected of violating the relevant
                  provisions of the Law of the People's Republic of China on the
                  Protection of Cultural Relics
                </li>
                <li>4. tobacco monopolies and tobacco-specific machinery</li>
                <li>5. unauthorized fund-raising goods</li>
                <li>
                  6. unauthorized licensed merchandise of the Olympic Games,
                  World Exposition, Asian Games, etc
                </li>
                <li>
                  7. tobacco labels, tobacco shells, tobacco cards, tobacco
                  boxes and other commodities
                </li>
                <li>
                  8. currencies of various countries in circulation in large
                  quantities and currency exchange services
                </li>
                <li>
                  9. Post office parcels, EMS special delivery, express delivery
                  and other logistics documents and single number
                </li>
                <li>
                  10. commodities subsidized by the state or issued free of
                  charge that cannot be transferred privately
                </li>
                <li>
                  11 military, state organs, special supply, special supply of
                  goods, and so on
                </li>
                <li>12 radio stations (stations)</li>
              </ul>
            </div>

            <div className="flex items-start justify-start flex-col gap-2">
              <p className="text-second_black text-md mt-4">
                virtual goods category:
              </p>
              <ul className="text-sm pl-2 sm:pl-4 flex items-start justify-start gap-2 flex-col font-extralight">
                <li>
                  1. without the state record of online games, game cards,
                  currency and other related services commodities
                </li>
                <li>
                  2. plug-ins, private services related to online games category
                  of goods
                </li>
                <li>
                  3. game point card or platform card commodities that the
                  official has stopped operating
                </li>
                <li>4. virtual lottery commodities</li>
                <li>
                  5. virtual service commodities whose time cannot be inquired
                </li>
                <li>
                  6. network accounts, dead guarantee accounts and other types
                  of accounts
                </li>
                <li>7. iTunes account and user recharge goods</li>
                <li>
                  8. auto-delivered OneCard series goods and OneCard series
                  goods sold at face value under any recharge method
                </li>
                <li>9. virtual brush service goods</li>
                <li>
                  10. commodities that cannot be inquired into and returned in
                  installments. 11. commodities with unlimited time and traffic
                </li>
                <li>
                  11. unlimited time and traffic, unqueryable time, and Internet
                  access fee cards or fee packages and SIM cards known as
                  loophole cards, group cards, internal cards, and test cards
                </li>
                <li>
                  12. virtual commodities such as slow charging cards that
                  cannot actually be credited within seventy-two hours
                </li>
                <li>13. SP business self-consumption commodities</li>
                <li>14. domain names, e-mail addresses, etc</li>
                <li>15. Virtual currencies in offshore accounts</li>
                <li>
                  16. Bitcoin, Litecoin, Yuanbao coin and other virtual currency
                  transactions
                </li>
                <li>
                  17. computer software and related goods, such as: software for
                  scientific research (e.g., a bank's operating system, a
                  network company's database program, a missile launch program);
                  unauthorized software (e.g., tapes or CD-ROMs without
                  registration numbers, OEM software not bundled with the
                  equipment); shareware; Beta or unpublished software;
                  decryption software (for cracking passwords of licensed
                  software); and software with serial numbers, software with
                  serial numbers, software with words such as "crack" and
                  "pirate"; software that can extract numbers such as Mark Six,
                  fortune-telling, horse-racing, etc.; upgraded and compressed
                  carriers stored in flash memory
                </li>
                <li>
                  18. virtual services, such as insurance services, contracts,
                  etc
                </li>
                <li>
                  19. network breaking, wall flipping software and vpn proxy
                  services.
                </li>
              </ul>
            </div>

            <div className="flex items-start justify-start flex-col gap-2">
              <p className="text-second_black text-md mt-4">
                Classes of animals and plants, animal and plant organs, and
                animal trapping implements:
              </p>
              <ul className="text-sm pl-2 sm:pl-4 flex items-start justify-start gap-2 flex-col font-extralight">
                <li>1. human organs and remains</li>
                <li>
                  2. living bodies, internal organs, any limbs, skins, furs,
                  specimens or other manufactured products of animals of
                  national or regional key protection categories, endangered
                  animals, extinct animals and fossils of existing animals of
                  national protection level 2 or above
                </li>
                <li>
                  3. living plants, soil, seeds of state-protected categories
                </li>
                <li>
                  4. living bodies, internal organs, any limbs, skins, specimens
                  or other manufactured products of terrestrial wild animals
                  under state protection or with important economic or
                  scientific research value
                </li>
                <li>5. equipment and accessories related to electric traps</li>
                <li>
                  6. cat and dog meat, cat and dog fur, shark's fin, bear bile
                  and their manufactured products
                </li>
              </ul>
            </div>

            <div className="flex items-start justify-start flex-col gap-2">
              <p className="text-second_black text-md mt-4">
                The category of software, tools or equipment involving illegal
                gains such as theft and illegal use:
              </p>
              <ul className="text-sm pl-2 sm:pl-4 flex items-start justify-start gap-2 flex-col font-extralight">
                <li>
                  1. illegal proceeds such as smuggling, theft, robbery, etc
                </li>
                <li>
                  2. illegal paraphernalia such as gambling equipment,
                  examination cheating tools, automobile running meter
                  equipment, etc
                </li>
                <li>
                  3. satellite signal transceiver devices and software;
                  instruments or equipment used for radio signal shielding
                </li>
                <li>
                  4. lock picking tools, lock picking services and their related
                  tutorials and books
                </li>
                <li>
                  5. multiple numbers on a single card; wireless network cards
                  with the function of scrabbling, as well as devices whose
                  descriptive information informs members that they can be used
                  for scrabbling
                </li>
                <li>6. software suspected of fraud and other illegal uses</li>
                <li>
                  7. merchandise that may be used to evade traffic control
                </li>
                <li>
                  8. lights that emit light using DC feeds on telephone lines
                </li>
                <li>
                  9. all types of text messages, emails, software and services
                </li>
                <li>10. pirated and imitation products</li>
                <li>
                  11. goods or services that infringe on the intellectual
                  property rights and other legitimate rights and interests of
                  others
                </li>
                <li>
                  12. commodities that users do not have the right to dispose
                  of; 13. illegal marketing commodities
                </li>
                <li>13. illegal marketing goods</li>
              </ul>
            </div>

            <div className="flex items-start justify-start flex-col gap-2">
              <p className="text-second_black text-md mt-4">
                Other categories:
              </p>
              <ul className="text-sm pl-2 sm:pl-4 flex items-start justify-start gap-2 flex-col font-extralight">
                <li>
                  1. Commodities produced by producers who do not have
                  production qualifications or do not comply with national,
                  local, industrial or corporate mandatory standards
                </li>
                <li>
                  2. commodities identified, announced or recalled by
                  authoritative quality inspection departments or manufacturers,
                  commodities that the state has explicitly ordered to be
                  eliminated or stopped selling, commodities that have expired,
                  expired, or deteriorated, as well as food products,
                  condiments, skin care products and other manufactured products
                  containing poppy seeds
                </li>
                <li>
                  3. software or services that interfere with the normal order
                  of the platform, such as seconds killers and related software
                  used to increase the probability of successful seconds kills
                </li>
                <li>
                  4. commodities whose product standards, certification marks,
                  ingredients and contents stated on the commodities themselves
                  or on the outer packaging do not comply with national
                  regulations
                </li>
                <li>
                  5. cell phone direct dialing cards and direct dialing
                  services, telephone callback cards and callback services
                </li>
                <li>6. cell phone card stickers with cracking function</li>
                <li>7. commodities prohibited for export</li>
                <li>
                  8. commodities that require authorization from the state or
                  relevant government departments, such as: cable TV,
                  dish-shaped artificial satellite antennas, etc
                </li>
                <li>
                  9. Alarms that are not authorized by the relevant authorities
                  or belong to the prohibited production, sale and possession
                </li>
                <li>
                  10. Pagers (including stock, digital and Chinese) with no
                  service fee (information fee) for life
                </li>
                <li>
                  11. Other commodities whose trading is strictly prohibited by
                  laws and regulations and commodities that DHL deems unsuitable
                  for trading on this platform
                </li>
                <li>
                  12. commodities that users do not have the right to dispose
                  of; 13. illegal marketing commodities
                </li>
                <li>13. illegal marketing goods</li>
              </ul>
              <p className="text-sm pl-2 font-extralight">
                In addition to the prohibited and restricted commodities listed
                above, other commodities that are prohibited from entering or
                leaving the country, illegal or restricted in the jurisdiction
                of the buyer and/or seller, or commodities that may be used to
                encourage illegal or restricted activities are prohibited and
                restricted commodities. Sellers of merchandise that requires a
                special license should provide DHL with documentation in
                advance, and DHL assumes no responsibility or liability for
                reviewing the buyer's qualifications.
              </p>
              <p className="text-sm pl-2 font-extralight">
                If you see a listing that violates DHL policies, please report
                it to DHL by clicking the "Report this product" or "Report this
                user" button in the drop-down menu on the product or user page.
                In the event of a violation of this policy, DHL will send an
                email, system message, and push notification to the seller
                informing them that their listing has been removed from the
                Platform, and DHL will send a push notification to the buyer of
                the listing. You should ensure that your cell phone is set to
                receive push notifications in a timely manner.
              </p>
              <p className="text-sm pl-2 font-extralight">
                If you have any other questions, please contact a human customer
                via Telegram during service hours.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
