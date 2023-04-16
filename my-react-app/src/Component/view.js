import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import './view.css'
import axios from 'axios';

const ContactTable = () => {
    const [contacts, setContacts] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        axios.get('http://localhost/React_Assignment3/php/Read.php')
            .then((res) => {
                setContacts(res.data);
            })
            .catch((err) => {
                console.error(err);
                alert('Error fetching data');
            });
    }, []);

    const handleDelete = (id) => {
        const confirmed = window.confirm("Are you sure you want to delete this contact?");

        if (confirmed) {
            axios.post('http://localhost/React_Assignment3/php/Delete.php', { id })
                .then((res) => {
                    console.log(res.data);
                    alert(res.data);
                    setContacts((prevContacts) => prevContacts.filter((contact) => contact.id !== id));
                })
                .catch((err) => {
                    console.error(err);
                    alert('Error deleting data');
                });
        }
    };

    const handleEdit = (id) => {
        // Redirect to the ContactForm page with the contact id as a query parameter and isEdit set to true
        window.location.href = `/NewContact/${id}?isEdit=true`;
    };

    return (
        <>
            {contacts.length === 0 ?
                <p className="para">No data is present</p>
                :
                <table className="viewtable">
                    <thead >
                    <tr>
                        <th style={{ fontWeight: 'bold' }}>Name</th>
                        <th style={{ fontWeight: 'bold' }}>Phone</th>
                        <th style={{ fontWeight: 'bold' }}>Address</th>
                        <th style={{ fontWeight: 'bold' }}>Email</th>
                        <th style={{ fontWeight: 'bold' }}>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {contacts.map((contact) => (
                        <tr key={contact.id} style={{ backgroundColor: contact.id % 2 === 0 ? '#f2f2f2' : 'white' }}>
                            <td>{contact.name}</td>
                            <td>{contact.phone}</td>
                            <td>{contact.address}</td>
                            <td>{contact.email}</td>
                            <td>
                                <button onClick={() => handleDelete(contact.id)}>Delete</button>
                                <button onClick={() => handleEdit(contact.id)}>Edit</button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            }
        </>
    );
};



export default ContactTable;
