import Image from "next/image";
import Link from "next/link";
import React from "react";

const ministry = [
  {
    id: 1,
    image: "/bg/images/ministries/children.jpg",
    title: "Children Ministry",
    desc: "The Children Ministry is dedicated to nurturing young hearts with the love of Christ, teaching biblical values, and fostering spiritual growth through engaging activities and mentorship. This ministry aims to lay a strong foundation of faith in children, equipping them to grow into godly individuals who impact their generation.",
    url: "/aboutUs/ministries/children",
  },
  {
    id: 2,
    image: "/bg/images/f1.jpg",
    title: "Discipleship Ministry",
    desc: "Maasai Mara christian union discipleship ministry equips believers through biblical teaching, mentoring, and community, fostering spiritual growth, faithfulness, and Christlike living.",
    url: "/aboutUs/ministries/discipleship",
  },
  {
    id: 3,
    image: "/bg/images/f1.jpg",
    title: "Editorial Ministry",
    desc: "The Editorial Ministry in a Christian church is responsible for creating, editing, and managing written and digital content that communicates the church's message, teachings, and activities. This ministry ensures that all publications, whether print or online, align with biblical principles and the church’s vision.",
    url: "/aboutUs/ministries/editorial",
  },
  {
    id: 4,
    image: "/bg/images/ministries/evangelism.jpg",
    title: "Evangelism Ministry",
    desc: "The Evangelism Ministry is dedicated to fulfilling the Great Commission by spreading the message of salvation and equipping believers to share their faith. Through outreach programs, missionary work, and community service, the ministry seeks to bring people closer to Christ.",
    url: "/aboutUs/ministries/evangelism",
  },
  {
    id: 5,
    image: "/bg/images/f1.jpg",
    title: "Intercessory Ministry",
    desc: "The Intercessory Ministry is dedicated to prayer and intercession, standing in the gap for the church, community, and the world. They seek God's guidance, protection, and blessings through fervent and consistent prayer.",
    url: "/aboutUs/ministries/intercessory",
  },
  {
    id: 6,
    image: "/bg/images/f1.jpg",
    title: "Music Ministry",
    desc: "The Music Ministry is dedicated to leading the congregation in worship through music and sound. They play a vital role in creating an atmosphere of praise and reverence, using their talents to glorify God and inspire others.",
    url: "/aboutUs/ministries/music",
  },
  {
    id: 7,
    image: "/bg/images/ministries/technical.jpg",
    title: "Technical Ministry",
    desc: "The Technical Ministry is responsible for managing sound, visuals, and technical equipment during church services and events. They ensure a seamless worship experience by handling audio, video, and other technical aspects with excellence.",
    url: "/aboutUs/ministries/technical",
  },
  {
    id: 8,
    image: "/bg/images/f1.jpg",
    title: "Ushering Ministry",
    desc: "The Ushering Ministry is responsible for creating a welcoming and orderly environment during church services and events. Ushers serve as the first point of contact for worshippers, offering hospitality, guidance, and support to ensure a smooth and reverent worship experience.",
    url: "/aboutUs/ministries/ushering",
  },
];

const MinistryCard = () => {
  return (
    <section className="mt-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 px-4 w-full">
      {ministry.map((ministry, index) => (
        <div
          key={index}
          className="rounded-2xl shadow-lg overflow-hidden flex flex-col bg-gray-50 bg-opacity-70 hover:shadow-2xl transition-shadow duration-300"
        >
          <Image
            src={ministry.image}
            alt={ministry.title}
            width={300}
            height={200}
            className="w-full h-[200px] object-cover"
          />

          <div className="text-gray-800 py-6 px-4 flex-1 flex flex-col justify-between">
            <h1 className="text-xl font-semibold pb-2">{ministry.title}</h1>
            <p className="font-light text-sm pb-4">{ministry.desc}</p>
            <div>
              <Link href={ministry.url}>
                <button className="cursor-pointer bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-all">
                  Read More
                </button>
              </Link>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
};

export default MinistryCard;