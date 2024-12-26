export default function ContentPaycheckDetail(params) {
  return (
    <>
      <div className="card bg-white w-full p-4">
        <h2 className="card-title mb-3">Paycheck Batch - December 2024</h2>
        <hr />
        <div className="grid grid-cols-2 card-body gap-10">
          <div>
            <div className="grid grid-rows gap-5">
              <div className="flex flex-row items-center justify-between">
                <h2 className="text-secondary font-bold">Paid To</h2>
                <h2 className="mx-auto font-medium">Mr. Hanif</h2>
              </div>
            </div>
          </div>
          <div className="flex flex-row items-center justify-between">
            <div>1</div>
            <div>2</div>
          </div>
        </div>
      </div>
    </>
  );
}
