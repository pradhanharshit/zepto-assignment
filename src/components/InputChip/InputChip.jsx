import React, { useEffect, useState } from "react";
import { Users } from "../../data/user-data";

const InputChip = () => {
  const [users, setUsers] = useState(Users);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [input, setInput] = useState("");
  const [backspaceCount, setBackspaceCount] = useState(0);
  const [lastChip, setLastChip] = useState({});

  const removeUserFromChips = (user) => {
    const chips = selectedUsers?.filter((selectedUser) => {
      return selectedUser?.userName !== user?.userName;
    });
    setSelectedUsers(chips);
  };

  const addUserToChips = (user) => {
    const chips = [...selectedUsers, user];
    setSelectedUsers(chips);
  };

  const getLastChip = () => {
    console.log(selectedUsers);
    const getLastChip =
      selectedUsers?.length > 0 ? selectedUsers[selectedUsers?.length - 1] : {};
    setLastChip(getLastChip);
    console.log(lastChip);
  };

  useEffect(() => {}, [lastChip]);

  useEffect(() => {
    setUsers(
      Users?.filter((user) => {
        return user?.userName.toLowerCase().includes(input.toLowerCase());
      }).filter((user) => {
        return !selectedUsers?.some(
          (selectedUser) =>
            selectedUser?.userName === user?.userName &&
            selectedUser?.email === user?.email
        );
      })
    );
  }, [selectedUsers, input]);

  return (
    <div className="w-[700px] mt-10">
      <p className="text-3xl font-bold text-blue-400 text-center">Pick Users</p>
      <div className="mt-8 border-b-4 border-blue-500">
        <div className="chip-input-div flex space-x-2 flex-wrap">
          {selectedUsers?.map((selectedUser) => {
            return (
              <div
                className="chip flex space-x-3 bg-slate-300 p-1 rounded-3xl m-1"
                style={
                  lastChip?.userName === selectedUser?.userName &&
                  lastChip?.email === selectedUser?.email
                    ? { border: "1px solid blue" }
                    : {}
                }
              >
                <p>{selectedUser?.userName}</p>
                <p
                  className="cursor-pointer"
                  onClick={() => {
                    removeUserFromChips(selectedUser);
                  }}
                >
                  ❌
                </p>
              </div>
            );
          })}
          <div className="relative m-2">
            <input
              className="border-none focus:outline-none"
              type="text"
              placeholder="Add new user..."
              value={input}
              onChange={(e) => {
                setInput(e.target.value);
              }}
              onKeyDown={(e) => {
                console.log("pressed");
                if (e.key === "Backspace" && input === "") {
                  if (backspaceCount === 0) {
                    setBackspaceCount(1);
                    getLastChip();
                  } else if (backspaceCount === 1) {
                    setBackspaceCount(0);
                    removeUserFromChips(lastChip);
                  }
                } else {
                  setLastChip({});
                }
              }}
            />
            {users?.length > 0 && (
              <div
                className="absolute top-10 w-[400px] shadow-xl shadow-gray-600 rounded-lg overflow-y-scroll max-h-[250px]"
                style={{
                  height: `25*${users?.length}px`,
                }}
              >
                {users?.map((user) => {
                  return (
                    <div
                      className="flex justify-between hover:bg-slate-200 cursor-pointer p-2 rounded-lg"
                      onClick={() => {
                        addUserToChips(user);
                        setLastChip({});
                      }}
                    >
                      <p>{user?.userName}</p>
                      <p className="text-left">{user?.email}</p>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InputChip;
