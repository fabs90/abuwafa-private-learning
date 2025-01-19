import { useEffect } from "react";

export default function ConfirmAlert({ isOpen, onClose, onConfirm }) {
  useEffect(() => {
    const dialog = document.getElementById("success_dialog");
    if (dialog) {
      if (isOpen) {
        dialog.showModal();
      } else {
        dialog.close();
      }
    }
  }, [isOpen]);

  return (
    <dialog id="success_dialog" className="modal mx-auto">
      <div className="modal-box bg-accent text-white rounded-lg shadow-lg">
        <h3 className="font-bold text-secondarySiena text-2xl text-center mx-auto mb-4">
          Hold up! 🤯
        </h3>
        <p className="text-center text-black text-lg">
          Are you sure the data is correct?
          <br />
          Choose confirm to submit.
        </p>
        <div className="flex justify-center mt-6 gap-8">
          <button
            type="button"
            className="btn btn-success"
            onClick={() => {
              onConfirm();
              onClose();
            }}
          >
            Confirm
          </button>
          <button
            type="button"
            className="btn bg-neutral hover:bg-darkerNeutral"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button onClick={onClose}>close</button>
      </form>
    </dialog>
  );
}
