'use client';
import React, { useState } from 'react';

type FormData = {
  name: string;
  email: string;
  message: string;
};

type FormStatus = 'idle' | 'sending' | 'success' | 'error';

const ContactForm = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    message: ''
  });

  const [errors, setErrors] = useState<FormData>({
    name: '',
    email: '',
    message: ''
  });

  const [touched, setTouched] = useState<Record<keyof FormData, boolean>>({
    name: false,
    email: false,
    message: false
  });

  const [status, setStatus] = useState<FormStatus>('idle');

  const validateField = (name: keyof FormData, value: string): string => {
    switch (name) {
      case 'name':
        if (!value.trim()) return 'Name is required';
        if (value.length < 2) return 'Name must be at least 2 characters';
        if (value.length > 50) return 'Name must be less than 50 characters';
        return '';
      
      case 'email':
        if (!value) return 'Email is required';
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) return 'Please enter a valid email address';
        return '';
      
      case 'message':
        if (!value.trim()) return 'Message is required';
        if (value.length < 10) return 'Message must be at least 10 characters';
        if (value.length > 1000) return 'Message must be less than 1000 characters';
        return '';
      
      default:
        return '';
    }
  };

  const handleBlur = (field: keyof FormData) => {
    setTouched(prev => ({
      ...prev,
      [field]: true
    }));
    
    const error = validateField(field, formData[field]);
    setErrors(prev => ({
      ...prev,
      [field]: error
    }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    if (touched[name as keyof FormData]) {
      const error = validateField(name as keyof FormData, value);
      setErrors(prev => ({
        ...prev,
        [name]: error
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    const newErrors = {
      name: validateField('name', formData.name),
      email: validateField('email', formData.email),
      message: validateField('message', formData.message)
    };

    setErrors(newErrors);
    setTouched({ name: true, email: true, message: true });

    if (Object.values(newErrors).some(error => error)) {
      return;
    }

    setStatus('sending');

    try {
      const response = await fetch('/api/email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to send email');
      }

      setStatus('success');
      setFormData({ name: '', email: '', message: '' });
      setTouched({ name: false, email: false, message: false });
      setErrors({ name: '', email: '', message: '' });
    } catch (error) {
      console.error('Error:', error);
      setStatus('error');
    }
  };

  // Instead of template literals, use concatenated strings for className
  const getInputClassName = (field: keyof FormData): string => {
    const baseClasses = 'w-full p-2 border rounded transition-all duration-200 focus:outline-none focus:ring-2';
    const errorClasses = touched[field] && errors[field] ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-blue-200';
    return `${baseClasses} ${errorClasses}`;
  };

  const errorClassName = 'text-red-500 text-sm mt-1 animate-[slideDown_0.2s_ease-in-out]';

  return (
    <div className="max-w-md mx-auto p-6">
      <style jsx>{`
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>

      <h1 className="text-black text-2xl font-bold mb-4">Contact Us</h1>
      
      <form onSubmit={handleSubmit} className="space-y-4 text-black">
        <div>
          <label className="block mb-1 font-medium">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            onBlur={() => handleBlur('name')}
            className={getInputClassName('name')}
            placeholder="Enter your name"
          />
          {touched.name && errors.name && (
            <p className={errorClassName}>{errors.name}</p>
          )}
        </div>

        <div>
          <label className="block mb-1 font-medium">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            onBlur={() => handleBlur('email')}
            className={getInputClassName('email')}
            placeholder="Enter your email"
          />
          {touched.email && errors.email && (
            <p className={errorClassName}>{errors.email}</p>
          )}
        </div>

        <div>
          <label className="block mb-1 font-medium">Message</label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            onBlur={() => handleBlur('message')}
            className={getInputClassName('message')}
            rows={4}
            placeholder="Enter your message"
          />
          {touched.message && errors.message && (
            <p className={errorClassName}>{errors.message}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={status === 'sending'}
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors duration-200"
        >
          {status === 'sending' ? 'Sending...' : 'Send Message'}
        </button>
        
        {status === 'success' && (
          <p className="text-green-500 text-center animate-[slideDown_0.2s_ease-in-out]">
            Message sent successfully!
          </p>
        )}
        {status === 'error' && (
          <p className="text-red-500 text-center animate-[slideDown_0.2s_ease-in-out]">
            Failed to send message. Please try again. 
          </p>
        )}
      </form>
    </div>
  );
};

export default ContactForm;