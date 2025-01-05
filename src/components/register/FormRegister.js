import Image from "next/image";

export default function FormRegister(params) {
  return (
    <>
      {/* Card */}
      <div
        className="card w-full sm:w-full md:w-3/4  rounded-lg shadow-lg"
        style={{ backgroundColor: "#edf6f6" }}
      >
        <div className="card-body items-center text-center w-full">
          <Image
            src={"/img/abuwafalogo.png"}
            alt="Logo Abuwafa"
            width={217}
            height={67}
          />
          <div className="mt-6 w-full">
            <h2>Contact Admin</h2>
          </div>
        </div>
      </div>
    </>
  );
}
