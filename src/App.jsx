import React, { useState, useEffect } from "react";
import axios from "axios";
import { RiSearchLine } from "react-icons/ri";
import { IoMenu } from "react-icons/io5";
import { HiMiniSquares2X2 } from "react-icons/hi2";
import { IoPersonAdd } from "react-icons/io5";
import Card from "./components/Card";
import Modal from "./components/Modal";
import "./assets/style.scss";

axios.defaults.baseURL = "http://localhost:3000";

function App() {
  const [contacts, setContacts] = useState([]);
  const [filteredContacts, setFilteredContacts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [contactToEdit, setContactToEdit] = useState(null);

  useEffect(() => {
    axios
      .get("/contact")
      .then((res) => {
        setContacts(res.data);
        setFilteredContacts(res.data);
      })
      .catch((err) => {
        alert("Veri alınırken bir hata oluştu.");
        console.error("API Hata:", err);
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const text = e.target.elements.searchInput.value.trim().toLowerCase();

    if (!text) {
      setFilteredContacts(contacts);
      return;
    }

    const filtered = contacts.filter((contact) =>
      ["name", "position", "company", "phone", "email"].some(
        (key) => {
          const value = contact[key];
          return value && value.toString().toLowerCase().includes(text);
        }
      )
    );

    setFilteredContacts(filtered);
    e.target.elements.searchInput.value = "";
  };

  const handleDelete = (id) => {
    const res = confirm("Kişiyi silmek istediğinize emin misiniz?");
    if (res) {
      axios
        .delete(`/contact/${id}`)
        .then(() => {
          setContacts((prevContacts) =>
            prevContacts.filter((contact) => contact.id !== id)
          );
          setFilteredContacts((prevFiltered) =>
            prevFiltered.filter((contact) => contact.id !== id)
          );
        })
        .catch((err) => {
          alert("Silme işlemi sırasında hata oluştu");
          console.error("Silme hatası:", err);
        });
    }
  };

  const handleEdit = (id) => {
    const contact = contacts.find((contact) => contact.id === id);
    setContactToEdit(contact);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setContactToEdit(null);
  };

  return (
    <div className="app">
      <header>
        <h1>Rehber</h1>
        <div>
          <form onSubmit={handleSubmit}>
            <button type="submit">
              <RiSearchLine />
            </button>
            <input type="text" name="searchInput" placeholder="Kişi aratınız..." />
          </form>
          <button className="ns">
            <IoMenu />
          </button>
          <button className="ns">
            <HiMiniSquares2X2 />
          </button>
          <button onClick={() => setIsModalOpen(true)} className="add">
            <IoPersonAdd />
            <span>Yeni Kişi</span>
          </button>
        </div>
      </header>
      <main>
        {filteredContacts.length === 0 ? (
          <p>Aradığınız kriterlere uyan kişi bulunamadı.</p>
        ) : (
          filteredContacts.map((contact) => (
            <Card
              key={contact.id}
              contact={contact}
              handleDelete={handleDelete}
              handleEdit={handleEdit}
            />
          ))
        )}
      </main>

      {isModalOpen && (
        <Modal
          contacts={contacts}  // contacts'ı Modal'a gönderiyoruz
          contact={contactToEdit}
          setIsModalOpen={setIsModalOpen}
          setContacts={setContacts}
          setFilteredContacts={setFilteredContacts}
          handleModalClose={handleModalClose}
        />
      )}
    </div>
  );
}

export default App;
