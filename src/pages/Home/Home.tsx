import React from "react";
import Card from "../../components/Card/Card.tsx";

const Home: React.FC = () => {

  const cardFields = [
    {
      description: "Easily monitor the status of all your job applications in one place, from applied to hired.",
      icon: "",
      subtitle: "Manage Progress",
      title: "Track Applications"
    },


    {
      description: "Capture and review important details about each application to stay prepared and informed throughout your job search journey.",
      icon: "",
      subtitle: "Stay Prepared",
      title: "Stay Informed"
    },
    {
      description: "Keep all job-related information, such as company contacts and interview notes, neatly organized.",
      icon: "",
      subtitle: "Stay Organized",
      title: "Organize Details"
    },
  ];

  return (
    <div className="Home flex flex-col justify-center items-center">
      <div>
        <h1 className="m-4 font-bold text-4xl">Take Control of Your Job Hunt!</h1>
        <p className="m-2 text-md">Streamline your search, discover opportunities, and land your dream job with
          ease.</p>
      </div>
      <div>
        <h2 className="m-4 font-bold text-3xl">Features</h2>
      </div>
      <div className="flex flex-row m-2">
        {cardFields.map((card) => (
          <Card
            description={card.description}
            icon={card.icon}
            subtitle={card.subtitle}
            title={card.title}
          />
        ))}
      </div>
    </div>
  )
}

export default Home;
