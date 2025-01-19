import { useEffect } from "react";

export default function SuccessAlert({ isOpen, onClose }) {
  useEffect(() => {
    const dialog = document.getElementById("confirm_dialog");
    if (dialog) {
      if (isOpen) {
        dialog.showModal();
      } else {
        dialog.close();
      }
    }
  }, [isOpen]);

  return (
    <dialog id="confirm_dialog" className="modal mx-auto">
      <div className="modal-box bg-accent text-white rounded-lg shadow-lg">
        <h3 className="font-bold text-secondarySiena text-2xl text-center mx-auto mb-4">
          Success!😊✨
        </h3>
        <p className="text-center text-black text-lg">
          Your data has been submitted successfully.
          <br />
        </p>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button onClick={onClose}>close</button>
      </form>
    </dialog>
  );
}
