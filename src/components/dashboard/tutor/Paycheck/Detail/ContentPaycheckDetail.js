export default function ContentPaycheckDetail(params) {
  return (
    <>
      <div className="card bg-white w-full p-4">
        <h2 className="card-title mb-3">Paycheck Batch - December 2024</h2>
        <hr />
        <div className="grid grid-rows card-body gap-10">
          <div>
            <div className="grid grid-rows gap-5">
              <div className="flex flex-col gap-5">
                <div className="flex flex-row items-center justify-between">
                  <h2 className="text-secondary font-bold">Paid To</h2>
                  <h2 className="mx-auto font-medium">Mr. Hanif</h2>
                </div>
                <div className="flex flex-row items-center justify-between">
                  <h2 className="text-secondary font-bold">Start Date</h2>
                  <h2 className="mx-auto font-medium">1/1/2025</h2>
                </div>
                <div className="flex flex-row items-center justify-between">
                  <h2 className="text-secondary font-bold">End Date</h2>
                  <h2 className="mx-auto font-medium">31/1/2025</h2>
                </div>
                <div className="flex flex-row items-center justify-between">
                  <h2 className="text-secondary font-bold">Salary</h2>
                  <h2 className="mx-auto font-medium">Rp.2.000.000</h2>
                </div>
                <hr></hr>
                <div>
                  <h2>Detail session</h2>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
