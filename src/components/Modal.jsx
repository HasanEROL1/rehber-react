import React, { useState, useEffect } from "react";
import axios from "axios";

const Modal = ({
  contacts,
  contact,
  setIsModalOpen,
  setContacts,
  setFilteredContacts,
  handleModalClose,
}) => {
  const [formData, setFormData] = useState({
    name: "",
    positon: "",  
    company: "",
    phone: "",
    email: "",
  });

  useEffect(() => {
    if (contact) {
      setFormData({
        name: contact.name || "",
        positon: contact.positon || "",  
        company: contact.company || "",
        phone: contact.phone || "",
        email: contact.email || "",
      });
    }
  }, [contact]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedContact = { ...contact, ...formData };

    if (contact) {
      axios
        .put(`/contact/${contact.id}`, updatedContact)
        .then((res) => {
          const updatedContacts = contacts.map((c) =>
            c.id === contact.id ? res.data : c
          );
          setContacts(updatedContacts);
          setFilteredContacts(updatedContacts);
          handleModalClose();
        })
        .catch((err) => {
          console.error("Güncelleme işlemi sırasında hata oluştu", err);
        });
    } else {
      axios
        .post("/contact", formData)
        .then((res) => {
          setContacts((prevContacts) => [...prevContacts, res.data]);
          setFilteredContacts((prevContacts) => [...prevContacts, res.data]);
          handleModalClose();
        })
        .catch((err) => {
          console.error("Yeni kişi eklerken hata oluştu", err);
        });
    }
  };

  return (
    <div className="modal">
      <div className="modal-inner">
        <button type="button" onClick={handleModalClose}>
          Kapat
        </button>
        <h2>{contact ? "Kişiyi Düzenle" : "Yeni Kişi Ekle"}</h2>

        <form onSubmit={handleSubmit}>
          <div>
            <label>Adı:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Pozisyon:</label>
            <input
              type="text"
              name="positon"  
              value={formData.positon}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Şirket:</label>
            <input
              type="text"
              name="company"
              value={formData.company}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Telefon:</label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <button type="submit">{contact ? "Kaydet" : "Ekle"}</button>
        </form>
      </div>
    </div>
  );
};

export default Modal;
