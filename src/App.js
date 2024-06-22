import React, { useState } from 'react';

const App = () => {
    const [contacts, setContacts] = useState([]);
    const [form, setForm] = useState({ name: '', email: '', number: '', image: '' });
    const [isEditing, setIsEditing] = useState(false);
    const [currentContactIndex, setCurrentContactIndex] = useState(null);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const handleAddContact = () => {
        if (isEditing) {
            const updatedContacts = contacts.map((contact, index) =>
                index === currentContactIndex ? form : contact
            );
            setContacts(updatedContacts);
            setIsEditing(false);
            setCurrentContactIndex(null);
        } else {
            setContacts([...contacts, form]);
        }
        setForm({ name: '', email: '', number: '', image: '' });
    };

    const handleEditContact = (index) => {
        setForm(contacts[index]);
        setIsEditing(true);
        setCurrentContactIndex(index);
    };

    const handleDeleteContact = (index) => {
        const updatedContacts = contacts.filter((contact, i) => i !== index);
        setContacts(updatedContacts);
    };

    return (
        <div className="container">
            <h1>Contact Web App</h1>
            <div className="form">
                <input type="text" name="name" placeholder="Name" value={form.name} onChange={handleInputChange} />
                <input type="email" name="email" placeholder="Email" value={form.email} onChange={handleInputChange} />
                <input type="tel" name="number" placeholder="Contact Number" value={form.number} onChange={handleInputChange} />
                <input type="text" name="image" placeholder="Image URL" value={form.image} onChange={handleInputChange} />
                <button onClick={handleAddContact}>{isEditing ? 'Update Contact' : 'Add Contact'}</button>
            </div>
            <div className="contact-list">
                {contacts.map((contact, index) => (
                    <div key={index} className="contact-card">
                        <img src={contact.image} alt={contact.name} />
                        <div className="contact-info">
                            <h2>{contact.name}</h2>
                            <p>{contact.email}</p>
                            <p>{contact.number}</p>
                            <button onClick={() => handleEditContact(index)}>Edit</button>
                            <button onClick={() => handleDeleteContact(index)}>Delete</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default App;
