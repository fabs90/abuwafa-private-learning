import Image from "next/image";

export default function CardDashboard({
  title,
  data,
  icon,
  width = 50,
  height = 50,
  isAdminPage = false,
}) {
  return (
    <div
      className={`card bg-base-100 md:w-[259px] lg:w-64 shadow-xl ${
        isAdminPage ? "admin-card" : ""
      }`}
    >
      <div className="card-body text-center font-bold ">
        {icon && (
          <div className="flex justify-center">
            {typeof icon === "object" ? (
              <Image
                src={icon.src}
                alt={`${title} icon`}
                width={width}
                height={height}
              />
            ) : (
              <span className="w-6 h-6">{icon}</span>
            )}
          </div>
        )}
        {isAdminPage ? (
          <h2 className="text-2xl font-bold text-primary">{title}</h2>
        ) : (
          <h2>{title}</h2>
        )}
        <p>{data}</p>
      </div>
    </div>
  );
}
