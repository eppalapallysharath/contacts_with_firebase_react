import React, { useEffect, useState } from "react";
import {
  collection,
  addDoc,
  getDoc,
  deleteDoc,
  doc,
  updateDoc,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { db, auth } from "../firebaseConfig";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";

const Home = () => {
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const [name, setName] = useState("");
  const [contacts, setContacts] = useState([]);
  const [editId, setEditId] = useState(null);
  const userId = localStorage.getItem("userId") || auth.currentUser.uid;
  const navigate = useNavigate();
  const handleAdd = async () => {
    try {
      if (editId) {
        await updateDoc(doc(db, "contacts", editId), {
          name,
          phoneNumber: number,
          email,
        });
        setEditId(null);
        setEmail("");
        setName("");
        setNumber("");
        toast("Contact updated successfully");
      } else {
        await addDoc(collection(db, "contacts"), {
          userId: userId,
          name: name,
          email: email,
          phoneNumber: number,
        });
        setEmail("");
        setName("");
        setNumber("");
        toast("Contact Added Successfully");
      }
    } catch (error) {
      console.log(error);
      toast(error.code);
    }
  };

  const fetchContacts = async () => {
    const q = query(collection(db, "contacts"), where("userId", "==", userId));
    const querySnapshot = await getDocs(q);
    setContacts(
      querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
    );
  };

  const handleDelete = async (docId) => {
    await deleteDoc(doc(db, "contacts", docId));
    fetchContacts();
  };

  const handleEdit = async (contact) => {
    setEditId(contact.id);
    setName(contact.name);
    setEmail(contact.email);
    setNumber(contact.phoneNumber);
  };

  const handleLogout = () => {
    localStorage.removeItem("userId");
    auth.signOut();
    navigate("/login");
  };

  useEffect(() => {
    fetchContacts();
  }, [contacts]);

  return (
    <div className="container mt-5">
      <h2> Welcome, {"sharath"}</h2>
      <button className="btn btn-secondary mb-5" onClick={handleLogout}>
        Logout
      </button>
      <div className="mb-3">
        <input
          type="text"
          className="form-control mb-2"
          placeholder="Name"
          onChange={(e) => setName(e.target.value)}
          required
          value={name}
        />
        <input
          type="text"
          className="form-control mb-2"
          placeholder="Phone Number"
          onChange={(e) => setNumber(e.target.value)}
          required
          value={number}
        />
        <input
          type="email"
          className="form-control mb-2"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          required
          value={email}
        />
        <button className="btn btn-primary" onClick={handleAdd}>
          {editId ? "Update contact" : "Add Contact"}
        </button>
      </div>
      <ul className="list-group">
        {contacts?.map((contact) => (
          <li
            className="list-group-item d-flex justify-content-between align-items center"
            key={contact.id}
          >
            <p>
              {" "}
              <b>Name </b> {contact.name}
            </p>
            <p>
              <b>email </b>
              {contact.email}
            </p>
            <p>
              <b>Phone Number </b>
              {contact.phoneNumber}
            </p>
            <div>
              <button
                className="btn btn-warning mx-2"
                onClick={() => handleEdit(contact)}
              >
                Edit
              </button>
              <button
                className="btn btn-danger"
                onClick={() => handleDelete(contact.id)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
