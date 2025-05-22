"use client"
import { useState, type FormEvent } from "react"
import type React from "react"

import "./styles/patientForm.css"

export default function PatientRegistrationForm() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    gender: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    insuranceProvider: "",
    policyNumber: "",
    emergencyContactName: "",
    emergencyContactPhone: "",
    allergies: "",
    medications: "",
    conditions: "",
  })

  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })

    // Clear error when field is edited
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      })
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    // Required fields
    const requiredFields = ["firstName", "lastName", "dateOfBirth", "gender", "email", "phone"]
    requiredFields.forEach((field) => {
      if (!formData[field as keyof typeof formData]) {
        newErrors[field] = "This field is required"
      }
    })

    // Email validation
    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address"
    }

    // Phone validation
    if (formData.phone && !/^\d{10}$/.test(formData.phone.replace(/\D/g, ""))) {
      newErrors.phone = "Please enter a valid 10-digit phone number"
    }

    // Zip code validation
    if (formData.zipCode && !/^\d{5}(-\d{4})?$/.test(formData.zipCode)) {
      newErrors.zipCode = "Please enter a valid ZIP code"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()

    if (validateForm()) {
      console.log("Form submitted:", formData)
      setIsSubmitted(true)
    } else {
      console.log("Form has errors")
    }
  }

  if (isSubmitted) {
    return (
      <div className="success-message">
        <h2>Registration Successful!</h2>
        <p>Thank you for registering, {formData.firstName}. Your information has been submitted successfully.</p>
        <button
          className="button"
          onClick={() => {
            setFormData({
              firstName: "",
              lastName: "",
              dateOfBirth: "",
              gender: "",
              email: "",
              phone: "",
              address: "",
              city: "",
              state: "",
              zipCode: "",
              insuranceProvider: "",
              policyNumber: "",
              emergencyContactName: "",
              emergencyContactPhone: "",
              allergies: "",
              medications: "",
              conditions: "",
            })
            setIsSubmitted(false)
          }}
        >
          Register Another Patient
        </button>
      </div>
    )
  }

  return (
    <form className="patient-form" onSubmit={handleSubmit}>
      <div className="form-section">
        <h2>Personal Information</h2>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="firstName">
              First Name <span className="required">*</span>
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className={errors.firstName ? "error" : ""}
            />
            {errors.firstName && <span className="error-message">{errors.firstName}</span>}
          </div>
          <div className="form-group">
            <label htmlFor="lastName">
              Last Name <span className="required">*</span>
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className={errors.lastName ? "error" : ""}
            />
            {errors.lastName && <span className="error-message">{errors.lastName}</span>}
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="dateOfBirth">
              Date of Birth <span className="required">*</span>
            </label>
            <input
              type="date"
              id="dateOfBirth"
              name="dateOfBirth"
              value={formData.dateOfBirth}
              onChange={handleChange}
              className={errors.dateOfBirth ? "error" : ""}
            />
            {errors.dateOfBirth && <span className="error-message">{errors.dateOfBirth}</span>}
          </div>
          <div className="form-group">
            <label htmlFor="gender">
              Gender <span className="required">*</span>
            </label>
            <select
              id="gender"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className={errors.gender ? "error" : ""}
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
              <option value="prefer-not-to-say">Prefer not to say</option>
            </select>
            {errors.gender && <span className="error-message">{errors.gender}</span>}
          </div>
        </div>
      </div>

      <div className="form-section">
        <h2>Contact Information</h2>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="email">
              Email <span className="required">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={errors.email ? "error" : ""}
            />
            {errors.email && <span className="error-message">{errors.email}</span>}
          </div>
          <div className="form-group">
            <label htmlFor="phone">
              Phone Number <span className="required">*</span>
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="(123) 456-7890"
              className={errors.phone ? "error" : ""}
            />
            {errors.phone && <span className="error-message">{errors.phone}</span>}
          </div>
        </div>

        <div className="form-group full-width">
          <label htmlFor="address">Address</label>
          <input type="text" id="address" name="address" value={formData.address} onChange={handleChange} />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="city">City</label>
            <input type="text" id="city" name="city" value={formData.city} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label htmlFor="state">State</label>
            <input type="text" id="state" name="state" value={formData.state} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label htmlFor="zipCode">ZIP Code</label>
            <input
              type="text"
              id="zipCode"
              name="zipCode"
              value={formData.zipCode}
              onChange={handleChange}
              className={errors.zipCode ? "error" : ""}
            />
            {errors.zipCode && <span className="error-message">{errors.zipCode}</span>}
          </div>
        </div>
      </div>

      <div className="form-section">
        <h2>Insurance Information</h2>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="insuranceProvider">Insurance Provider</label>
            <input
              type="text"
              id="insuranceProvider"
              name="insuranceProvider"
              value={formData.insuranceProvider}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="policyNumber">Policy Number</label>
            <input
              type="text"
              id="policyNumber"
              name="policyNumber"
              value={formData.policyNumber}
              onChange={handleChange}
            />
          </div>
        </div>
      </div>

      <div className="form-section">
        <h2>Emergency Contact</h2>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="emergencyContactName">Name</label>
            <input
              type="text"
              id="emergencyContactName"
              name="emergencyContactName"
              value={formData.emergencyContactName}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="emergencyContactPhone">Phone Number</label>
            <input
              type="tel"
              id="emergencyContactPhone"
              name="emergencyContactPhone"
              value={formData.emergencyContactPhone}
              onChange={handleChange}
              placeholder="(123) 456-7890"
            />
          </div>
        </div>
      </div>

      <div className="form-section">
        <h2>Medical Information</h2>
        <div className="form-group full-width">
          <label htmlFor="allergies">Allergies</label>
          <textarea
            id="allergies"
            name="allergies"
            value={formData.allergies}
            onChange={handleChange}
            placeholder="List any allergies..."
          />
        </div>
        <div className="form-group full-width">
          <label htmlFor="medications">Current Medications</label>
          <textarea
            id="medications"
            name="medications"
            value={formData.medications}
            onChange={handleChange}
            placeholder="List any medications you are currently taking..."
          />
        </div>
        <div className="form-group full-width">
          <label htmlFor="conditions">Medical Conditions</label>
          <textarea
            id="conditions"
            name="conditions"
            value={formData.conditions}
            onChange={handleChange}
            placeholder="List any medical conditions..."
          />
        </div>
      </div>

      <div className="form-section">
        <div className="form-group full-width">
          <div className="consent-checkbox">
            <input type="checkbox" id="consent" name="consent" required />
            <label htmlFor="consent">
              I consent to the collection and processing of my personal and medical information for healthcare purposes.
            </label>
          </div>
        </div>
      </div>

      <div className="form-actions">
        <button type="submit" className="button submit-button">
          Register
        </button>
        <button type="reset" className="button reset-button">
          Clear Form
        </button>
      </div>
    </form>
  )
}
