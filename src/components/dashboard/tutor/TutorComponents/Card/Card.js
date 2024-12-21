import Image from "next/image";

export default function CardDashboard({ title, data, icon }) {
  return (
    <div className="card bg-base-100 md:w-[259px] lg:w-64 shadow-xl">
      <div className="card-body text-center font-bold">
        {icon && (
          <div className="flex justify-center">
            {typeof icon === "object" ? (
              <Image
                src={icon.src}
                alt={`${title} icon`}
                width={50}
                height={50}
              />
            ) : (
              <span className="w-6 h-6">{icon}</span>
            )}
          </div>
        )}
        <h2>{title}</h2>
        <p>{data}</p>
      </div>
    </div>
  );
}
