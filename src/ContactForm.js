import React, { useState } from 'react';
import axios from 'axios';
import './ContactForm.css';


function ContactForm() {
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [status, setStatus] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/api/contact', formData);
            setStatus('Message sent successfully');
            setFormData({ name: '', email: '', message: '' });
        } catch (error) {
            setStatus('Failed to send message');
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label>Name:</label>
                <input type="text" name="name" value={formData.name} onChange={handleChange} required />
                <label>Email:</label>
                <input type="email" name="email" value={formData.email} onChange={handleChange} required />
                <label>Message:</label>
                <textarea name="message" value={formData.message} onChange={handleChange} required />
                <button type="submit">Submit</button>
            </form>
            {status && <p>{status}</p>}
        </div>
    );
}

export default ContactForm;
