import React from 'react';
import ReactDOM from 'react-dom/client';

import { RiDeleteBinLine } from "react-icons/ri";
import { RiEdit2Fill } from "react-icons/ri";
import { FaPhone } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

const Card = ({ contact, handleDelete, handleEdit }) => {
  if (!contact) {
    return <p>Loading...</p>; // Veri yüklenene kadar gösterilecek mesaj
  }

  const [name = "", surname = ""] = contact?.name?.split(" ") || [];
  return (
    <div className="card">
      <div className="buttons">
        <button onClick={() => handleEdit(contact.id)}>
          <RiEdit2Fill />
        </button>
        <button onClick={() => handleDelete(contact.id)}>
          <RiDeleteBinLine />
        </button>
      </div>
      {/* Person profile */}
      <h1>
        {name[0]} {surname[0]}
      </h1>
      {/* Name */}
      <h3>{contact.name}</h3>
      {/* position */}
      <p>{contact.positon}</p>
      {/* company */}
      <p>{contact.company}</p>
      {/* Bottom */}
      <div className="bottom">
        <div>
          <span>
            <FaPhone />
          </span>
          <span>{contact.phone}</span>
        </div>
        <div>
          <span>
            <MdEmail />
          </span>
          <span>{contact.email}</span>
        </div>
      </div>
    </div>
  );
};
export default Card;
