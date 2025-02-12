const Modal = ({ title, message }) => {
  return (
    <>
      <dialog id="modal" className="modal">
        <div className="modal-box">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <h3 className="font-bold text-lg">{title}</h3>
          <p className="py-4">{message}</p>
        </div>
      </dialog>
    </>
  );
};

export default Modal;
