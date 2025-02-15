import { useState } from "react";
import TextField from "./TextField";

const CreateChannelModal = ({ submitAction, ref }) => {
  const [channelName, setChannelName] = useState("");
  return (
    <dialog id="create-channel-modal" className="modal" ref={ref}>
      <div className="modal-box">
        <form method="dialog">
          {/* if there is a button in form, it will close the modal */}
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
            ✕
          </button>
          <h3 className="font-bold text-lg mb-4">Create Channel</h3>
          <div className="mb-4">
            <TextField
              type={"text"}
              placeholder={"Channel Name"}
              value={channelName}
              onChange={(e) => setChannelName(e.target.value)}
            />
          </div>
          <div className="flex justify-end">
            <button
              className="btn btn-secondary mr-3"
              onClick={(e) => {
                e.preventDefault();
                submitAction(channelName);
                setChannelName("");
              }}
            >
              Create
            </button>
            <button className="btn btn-active btn-neutral">Cancel</button>
          </div>
        </form>
      </div>
    </dialog>
  );
};

export default CreateChannelModal;
